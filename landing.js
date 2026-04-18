import { initialVehicles } from './initialData.js';
import { db, handleFirestoreError, doc, getDoc, getDocs, collection } from './firebase.js';

async function initLanding() {
  const loader = document.getElementById('featured-loader');
  const mainContainer = document.getElementById('main-featured-container');
  const secondaryContainer = document.getElementById('secondary-featured-container');

  const renderInitialLanding = () => {
    // Use global fallback if import fails or is empty (for file:// protocol support)
    const sourceData = (window.initialVehicles && window.initialVehicles.length > 0) 
      ? window.initialVehicles 
      : initialVehicles;

    if (!sourceData || sourceData.length === 0) return;
    
    // Layout: Main = Fairlady [0], Secondary Grid = [1, 2, 3] (Skyline, MR2, Supra)
    const vMain = sourceData[0];
    const vSecondary = sourceData.slice(1, 4);

    // Render Main (Fairlady Z)
    const img = document.getElementById('main-featured-img');
    const title = document.getElementById('main-featured-title');
    const titleMobile = document.getElementById('main-featured-title-mobile');
    const desc = document.getElementById('main-featured-desc-text');
    const linkMobile = document.getElementById('main-featured-link-mobile');

    if (img) {
      img.src = vMain.images[0];
      img.referrerPolicy = "no-referrer";
    }
    if (title) title.textContent = vMain.title;
    if (titleMobile) titleMobile.textContent = vMain.title;
    if (desc) {
      desc.innerHTML = `A beautifully preserved 1971 S30 Fairlady Z - <a id="main-featured-link" class="text-white no-underline hover:underline decoration-2 font-bold" href="inventory.html#${vMain.stockNumber}">Details</a>`;
      desc.classList.remove('font-light', 'text-white/70');
      desc.classList.add('font-medium', 'text-white');
    }
    if (linkMobile) linkMobile.href = `inventory.html#${vMain.stockNumber}`;

    if (mainContainer) {
      mainContainer.classList.remove('opacity-0');
      mainContainer.classList.add('active');
    }

    // Render Secondary Grid
    if (secondaryContainer) {
      secondaryContainer.innerHTML = '';
      vSecondary.forEach(v => {
        const thumb = v.images[0] || 'https://placehold.co/800x600/1e293b/white?text=PHOTO+COMING+COON';
        const slot = document.createElement('div');
        slot.className = 'md:col-span-4 reveal active';
        slot.innerHTML = `
          <div class="group relative aspect-video overflow-hidden rounded-xl shadow-sm mb-3">
            <img alt="${v.title}" referrerpolicy="no-referrer" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${thumb}">
          </div>
          <p class="text-on-surface font-bold text-lg">${v.title} - <a class="text-secondary hover:underline decoration-2 font-bold" href="inventory.html#${v.stockNumber}">Details</a></p>
        `;
        secondaryContainer.appendChild(slot);
      });
    }
  };

  const showContent = () => {
    if (loader) loader.classList.add('opacity-0');
    setTimeout(() => {
      if (loader) loader.remove();
      if (mainContainer) {
        mainContainer.dataset.loaded = "true";
        mainContainer.classList.remove('opacity-0');
        mainContainer.classList.add('active');
      }
      if (secondaryContainer) {
        secondaryContainer.dataset.loaded = "true";
        secondaryContainer.classList.remove('opacity-0');
        secondaryContainer.classList.add('active');
      }
      window.dispatchEvent(new Event('scroll'));
    }, 500);
  };

  renderInitialLanding();
  showContent();

  try {
    const configSnap = await getDoc(doc(db, 'settings', 'landingPage'));
    if (!configSnap.exists()) return;

    const config = configSnap.data();
    const vehicleIds = [];
    if (config.mainFeatured?.vehicleId) vehicleIds.push(config.mainFeatured.vehicleId);
    if (config.secondaryFeatured) {
      config.secondaryFeatured.forEach(item => { if (item.vehicleId) vehicleIds.push(item.vehicleId); });
    }

    if (vehicleIds.length === 0) return;

    const vehiclesData = {};
    const vehicleSnaps = await Promise.all(vehicleIds.map(id => getDoc(doc(db, 'vehicles', id))));
    vehicleSnaps.forEach(snap => { if (snap.exists()) vehiclesData[snap.id] = snap.data(); });

    if (config.mainFeatured?.vehicleId && vehiclesData[config.mainFeatured.vehicleId]) {
      const v = vehiclesData[config.mainFeatured.vehicleId];
      const img = document.getElementById('main-featured-img');
      const title = document.getElementById('main-featured-title');
      const desc = document.getElementById('main-featured-desc-text');

      if (img) img.src = config.mainFeatured.photoUrl || v.images[0];
      if (title) title.textContent = v.title;
      if (desc) {
        desc.innerHTML = `${config.mainFeatured.description || v.description} <a class="text-white no-underline hover:underline decoration-2 font-bold" href="inventory.html#${v.stockNumber}">Details</a>`;
      }
    }

    if (secondaryContainer && config.secondaryFeatured?.length > 0) {
      secondaryContainer.innerHTML = '';
      config.secondaryFeatured.forEach(item => {
        const v = vehiclesData[item.vehicleId];
        if (!v) return;
        const thumb = item.photoUrl || v.images[0];
        const slot = document.createElement('div');
        slot.className = 'md:col-span-4 reveal active';
        slot.innerHTML = `
          <div class="group relative aspect-video overflow-hidden rounded-xl shadow-sm mb-3">
            <img alt="${v.title}" referrerpolicy="no-referrer" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${thumb}">
          </div>
          <p class="text-on-surface font-bold text-lg">${v.title} - <a class="text-secondary hover:underline decoration-2 font-bold" href="inventory.html#${v.stockNumber}">Details</a></p>
        `;
        secondaryContainer.appendChild(slot);
      });
    }
  } catch (err) {
    console.warn("Firestore sync unavailable:", err);
  }
}

initLanding();
