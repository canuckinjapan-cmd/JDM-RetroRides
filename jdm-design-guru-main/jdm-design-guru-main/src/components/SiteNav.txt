import { Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SiteNav = () => {
  const location = useLocation();
  const onHome = location.pathname === "/";
  const home = (hash: string) => (onHome ? hash : `/${hash}`);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm gradient-bronze flex items-center justify-center font-display text-primary-foreground text-lg">
            JR
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg tracking-wider">JDM RETRO RIDES</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Est. Japan · British-Owned
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/inventory" className="hover:text-bronze transition-colors">
            Inventory
          </Link>
          <a href={home("#process")} className="hover:text-bronze transition-colors">
            How It Works
          </a>
          <a href={home("#about")} className="hover:text-bronze transition-colors">
            About
          </a>
          <a href={home("#contact")} className="hover:text-bronze transition-colors">
            Contact
          </a>
        </nav>
        <Button
          asChild
          className="bg-bronze hover:bg-primary/90 text-primary-foreground font-medium rounded-sm gap-2"
        >
          <a href={home("#contact")}>
            <Mail className="w-4 h-4" /> Get a Quote
          </a>
        </Button>
      </div>
    </header>
  );
};

export default SiteNav;
