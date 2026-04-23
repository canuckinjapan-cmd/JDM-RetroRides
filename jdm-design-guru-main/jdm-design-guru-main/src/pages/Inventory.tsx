import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cog, Gauge, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import SiteNav from "@/components/SiteNav";
import { inventory, statusStyles } from "@/data/inventory";

type YearSort = "featured" | "newest" | "oldest";
type PriceSort = "" | "high-low" | "low-high";
type DispSort = "" | "high-low" | "low-high";

const Inventory = () => {
  const [yearSort, setYearSort] = useState<YearSort>("featured");
  const [priceSort, setPriceSort] = useState<PriceSort>("");
  const [dispSort, setDispSort] = useState<DispSort>("");
  const [stockOnly, setStockOnly] = useState(false);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    let list = [...inventory];
    if (stockOnly) list = list.filter((v) => v.status === "AVAILABLE");
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.chassis.toLowerCase().includes(q),
      );
    }

    list.sort((a, b) => {
      // Year takes precedence first, then price, then displacement
      if (yearSort === "newest") return b.year - a.year;
      if (yearSort === "oldest") return a.year - b.year;
      // featured: featured first
      const fa = a.featured ? 1 : 0;
      const fb = b.featured ? 1 : 0;
      if (fa !== fb) return fb - fa;
      return 0;
    });
    if (priceSort === "high-low")
      list.sort((a, b) => b.priceGBP - a.priceGBP);
    if (priceSort === "low-high")
      list.sort((a, b) => a.priceGBP - b.priceGBP);
    if (dispSort === "high-low")
      list.sort((a, b) => b.displacementCc - a.displacementCc);
    if (dispSort === "low-high")
      list.sort((a, b) => a.displacementCc - b.displacementCc);

    return list;
  }, [yearSort, priceSort, dispSort, stockOnly, query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Header */}
      <section className="pt-32 pb-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-bronze" />
            <span className="mono text-xs uppercase tracking-[0.3em] text-bronze">
              Vehicles
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-none mb-4">
            Current & Past <span className="text-bronze">Inventory</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Hand-picked from USS, JU and TAA auctions across Japan. Every
            vehicle inspected on the lane. Translated auction sheets available
            on request.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="py-8 bg-secondary/30 border-b border-border sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mr-2">
            Filter by:
          </div>

          <div className="flex flex-wrap gap-3 flex-1">
            <Select
              value={yearSort}
              onValueChange={(v) => setYearSort(v as YearSort)}
            >
              <SelectTrigger className="w-[180px] rounded-sm bg-background border-border">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Year (Newest)</SelectItem>
                <SelectItem value="oldest">Year (Oldest)</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={priceSort || "any"}
              onValueChange={(v) =>
                setPriceSort(v === "any" ? "" : (v as PriceSort))
              }
            >
              <SelectTrigger className="w-[200px] rounded-sm bg-background border-border">
                <SelectValue placeholder="Price (Sort)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Price (Sort)</SelectItem>
                <SelectItem value="high-low">Price (High to Low)</SelectItem>
                <SelectItem value="low-high">Price (Low to High)</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={dispSort || "any"}
              onValueChange={(v) =>
                setDispSort(v === "any" ? "" : (v as DispSort))
              }
            >
              <SelectTrigger className="w-[240px] rounded-sm bg-background border-border">
                <SelectValue placeholder="Displacement (Sort)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Displacement (Sort)</SelectItem>
                <SelectItem value="high-low">
                  Displacement (High to Low)
                </SelectItem>
                <SelectItem value="low-high">
                  Displacement (Low to High)
                </SelectItem>
              </SelectContent>
            </Select>

            <label className="flex items-center gap-2 text-sm px-3 py-2 border border-border rounded-sm bg-background cursor-pointer">
              <Checkbox
                checked={stockOnly}
                onCheckedChange={(c) => setStockOnly(Boolean(c))}
              />
              <span>In stock only</span>
            </label>
          </div>

          <div className="relative w-full lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chassis or model..."
              maxLength={60}
              className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-bronze"
            />
          </div>
        </div>
      </section>

      {/* Count */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-6 mono text-xs text-muted-foreground tracking-wider uppercase">
          Showing <span className="text-foreground font-bold">{visible.length}</span> vehicles
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {visible.length === 0 ? (
            <div className="py-24 text-center text-muted-foreground">
              No vehicles match your filters.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visible.map((c) => (
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
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                        c.status === "SOLD" ? "grayscale opacity-60" : ""
                      }`}
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
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
                        <div className="mono text-xs text-bronze tracking-wider mb-1">
                          {c.year}
                        </div>
                        <h3 className="font-display text-2xl leading-none">
                          {c.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Price
                        </div>
                        <div className="font-display text-xl text-bronze">
                          {c.priceLabel}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm mb-6 pt-5 border-t border-border">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Gauge className="w-4 h-4 text-bronze" /> {c.mileage}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Cog className="w-4 h-4 text-bronze" /> {c.transmission}
                      </div>
                      <div className="col-span-2 mono text-[11px] text-muted-foreground tracking-wider uppercase">
                        {c.displacementLabel}
                      </div>
                    </div>

                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-between rounded-sm border border-border hover:border-bronze hover:bg-bronze/10 hover:text-bronze h-11"
                      disabled={c.status === "SOLD"}
                    >
                      <Link to={`/#contact`}>
                        {c.status === "SOLD"
                          ? "Sold — enquire about similar"
                          : "Enquire about this car"}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
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
          <div className="text-xs text-muted-foreground">
            © 2026 JDM Retro Rides
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inventory;
