import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Search,
  ShieldCheck,
  Ship,
  Key,
  Gauge,
  Cog,
  MapPin,
  ArrowRight,
  Star,
  Phone,
} from "lucide-react";
import heroImg from "@/assets/hero-jdm.jpg";
import auctionLane from "@/assets/auction-lane.jpg";
import SiteNav from "@/components/SiteNav";
import ContactForm from "@/components/ContactForm";
import FacebookIcon from "@/components/icons/FacebookIcon";
import { inventory, statusStyles } from "@/data/inventory";

const FACEBOOK_URL = "https://www.facebook.com/";

const steps = [
  {
    n: "01",
    icon: Search,
    title: "Tell us what you want",
    body: "Send your wish-list — chassis, year, budget. We confirm what's realistic and what to expect on the lanes.",
  },
  {
    n: "02",
    icon: ShieldCheck,
    title: "We bid at the auctions",
    body: "Our team is on the floor at USS, JU and TAA every week. Auction sheets translated, every car inspected in person.",
  },
  {
    n: "03",
    icon: Cog,
    title: "Compliance & prep",
    body: "Deregistration, export documents, JEVIC inspection, shipping — handled. You receive weekly photo updates.",
  },
  {
    n: "04",
    icon: Ship,
    title: "Delivered to your door",
    body: "RoRo or container to UK, Australia or your nearest port. We stay with the car until the keys are in your hand.",
  },
];

const featured = inventory.slice(0, 4);

const Index = () => {
  const heroImgRef = useRef<HTMLImageElement | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Subtle parallax on the hero background image
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden grain">
        <img
          ref={heroImgRef}
          src={heroImg}
          alt="Vintage Nissan Skyline GT-R parked in a Japanese warehouse at night"
          className="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
          style={{
            transform: `translate3d(0, ${scrollY * 0.3}px, 0) scale(1.05)`,
          }}
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-background/30" />

        <div className="relative max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-bronze" />
              <span className="mono text-xs uppercase tracking-[0.3em] text-bronze">
                Since 1994 · Nagoya, Japan
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.9] mb-6">
              30 Years Inside <br />
              Japan's Auctions. <br />
              <span className="text-bronze">Shipped to your driveway.</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-xl mb-10">
              British-run, Japan-based. We hand-source legendary JDM classics from USS, JU and
              TAA — translated, inspected and exported to the UK, Australia and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-bronze hover:bg-primary/90 text-primary-foreground font-medium rounded-sm gap-2 h-12 px-8"
              >
                <Link to="/inventory">
                  Browse Inventory <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-foreground/30 hover:bg-foreground/5 rounded-sm h-12 px-8 gap-2"
              >
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                  <FacebookIcon className="w-4 h-4" /> Facebook
                </a>
              </Button>
            </div>

            {/* Trust strip */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              {[
                ["30+", "Years exporting"],
                ["1,200+", "Cars delivered"],
                ["USS / JU", "Auction access"],
                ["UK · AU", "Primary markets"],
              ].map(([k, v]) => (
                <div key={v} className="border-l border-bronze/40 pl-3">
                  <div className="font-display text-3xl text-bronze">{k}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span>Scroll</span>
          <span className="h-px w-12 bg-muted-foreground/50" />
        </div>
      </section>

      {/* INVENTORY */}
      <section id="inventory" className="py-24 sm:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-bronze" />
                <span className="mono text-xs uppercase tracking-[0.3em] text-bronze">
                  Current Inventory
                </span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl leading-none">
                On the floor <br />
                <span className="text-muted-foreground">in Nagoya.</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              A live, hand-picked selection. Every car personally inspected, with full auction
              sheets and translated reports available on request.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {featured.map((c) => (
              <article
                key={c.id}
                className="group gradient-card border border-border rounded-sm overflow-hidden shadow-deep hover:border-bronze/50 transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <img
                    src={c.img}
                    alt={`${c.year} ${c.name}`}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${c.status === "SOLD" ? "grayscale opacity-60" : ""
                      }`}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge
                      variant="outline"
                      className={`rounded-sm uppercase tracking-wider text-[10px] font-mono ${statusStyles[c.status]}`}
                    >
                      {c.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="rounded-sm uppercase tracking-wider text-[10px] font-mono bg-background/60 backdrop-blur-sm border-border text-foreground/80"
                    >
                      {c.grade}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 mono text-xs px-2 py-1 bg-background/70 backdrop-blur-sm border border-border rounded-sm">
                    {c.chassis}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <div className="mono text-xs text-bronze tracking-wider mb-1">{c.year}</div>
                      <h3 className="font-display text-3xl leading-none">{c.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Price
                      </div>
                      <div className="font-display text-2xl text-bronze">{c.priceLabel}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm mb-6 pt-5 border-t border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Gauge className="w-4 h-4 text-bronze" /> {c.mileage}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Cog className="w-4 h-4 text-bronze" /> {c.transmission}
                    </div>
                  </div>

                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-between rounded-sm border border-border hover:border-bronze hover:bg-bronze/10 hover:text-bronze h-11"
                    disabled={c.status === "SOLD"}
                  >
                    <Link to="/inventory">
                      {c.status === "SOLD" ? "Sold — view similar" : "View details & auction sheet"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-sm border-bronze text-bronze hover:bg-bronze hover:text-primary-foreground gap-2 h-12 px-8"
            >
              <Link to="/inventory">
                See all vehicles <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="process" className="py-24 sm:py-32 bg-secondary/30 relative overflow-hidden grain">
        <div className="absolute inset-0 opacity-10">
          <img src={auctionLane} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-bronze" />
              <span className="mono text-xs uppercase tracking-[0.3em] text-bronze">
                The Process
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl leading-none mb-6">
              From a Tokyo lane <br />
              <span className="text-bronze">to your garage.</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              You're not buying off a forecourt. You're hiring 30 years of Japanese-market
              expertise to find, vet and ship the right car — without the guesswork.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden border border-border">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.n}
                  className="bg-background p-8 group hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display text-5xl text-bronze/30 group-hover:text-bronze transition-colors">
                      {s.n}
                    </span>
                    <div className="w-12 h-12 rounded-sm border border-bronze/40 flex items-center justify-center text-bronze">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl mb-3 leading-tight">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                t: "On the ground in Japan",
                b: "Office in Nagoya. We attend auctions in person — no remote middlemen.",
              },
              {
                icon: ShieldCheck,
                t: "Translated auction sheets",
                b: "Every grade, every note. You see what we see, in plain English.",
              },
              {
                icon: Key,
                t: "Door-to-door logistics",
                b: "Compliance, shipping and delivery handled end-to-end.",
              },
            ].map(({ icon: Icon, t, b }) => (
              <div key={t} className="flex gap-4 p-6 border border-border rounded-sm bg-background/60">
                <Icon className="w-6 h-6 text-bronze shrink-0 mt-1" />
                <div>
                  <div className="font-medium mb-1">{t}</div>
                  <div className="text-sm text-muted-foreground">{b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-1 mb-8 text-bronze">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <p className="font-display text-3xl md:text-4xl leading-tight mb-8">
            "Found me a grade 4.5 R32 in three weeks. Translated the sheet, sent walk-around
            video from the auction, sorted shipping to Southampton. Painless."
          </p>
          <div className="mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            James H. · Surrey, UK · 2024 Skyline GT-R import
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-secondary/40 border-y border-border scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-bronze" />
              <span className="mono text-xs uppercase tracking-[0.3em] text-bronze">
                Contact Us
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl leading-none mb-6">
              Got a car <br />
              <span className="text-bronze">in mind?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Tell us the chassis code and your budget. We'll come back within 24 hours with
              what's on the lanes this week.
            </p>

            <div className="space-y-4">
              <a
                href="tel:+8152XXXXXXX"
                className="flex items-center gap-3 text-foreground/90 hover:text-bronze transition-colors"
              >
                <Phone className="w-5 h-5 text-bronze" />
                <span className="mono text-sm">+81 (0) 52-XXX-XXXX</span>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/90 hover:text-bronze transition-colors"
              >
                <FacebookIcon className="w-5 h-5" />
                <span className="text-sm">Follow us on Facebook</span>
              </a>
              <div className="mono text-xs text-muted-foreground pt-2">
                JST 09:00 — 18:00 · Replies in English
              </div>
            </div>
          </div>

          <div className="border border-border rounded-sm bg-background/60 p-6 md:p-8 shadow-deep">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-sm gradient-bronze flex items-center justify-center font-display text-primary-foreground text-sm">
              JR
            </div>
            <span className="font-display tracking-wider">JDM RETRO RIDES</span>
          </div>
          <div className="mono text-xs uppercase tracking-[0.3em] text-muted-foreground text-center">
            Nagoya · Japan · British-Owned · Est. 1994
          </div>
          <div className="text-xs text-muted-foreground">© 2026 JDM Retro Rides</div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-4 inset-x-4 z-40 flex gap-2">
        <Button
          asChild
          className="flex-1 bg-bronze text-primary-foreground rounded-sm h-12 gap-2 shadow-bronze"
        >
          <a href="#contact">
            <Mail className="w-4 h-4" /> Enquire
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="flex-1 rounded-sm h-12 gap-2 bg-background border-bronze text-bronze"
        >
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
            <FacebookIcon className="w-4 h-4" /> Facebook
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Index;
