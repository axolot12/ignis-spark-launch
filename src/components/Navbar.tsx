import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/ignis-logo-transparent.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { data } = await supabase
        .from("download_counter")
        .select("id, count")
        .limit(1)
        .single();
      if (data) {
        await supabase
          .from("download_counter")
          .update({ count: data.count + 1 })
          .eq("id", data.id);
      }
    } catch {}
    window.open("https://github.com/axolot12/traing/releases/download/v1.0/launcher.exe", "_blank");
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30 rounded-none animate-slide-down">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <img
            src={logo}
            alt="IgnisLauncher"
            className="w-9 h-9 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
            width={36}
            height={36}
          />
          <span className="font-heading text-lg font-bold text-foreground tracking-wider group-hover:text-gradient transition-all duration-300">
            IgnisLauncher
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#features" className="nav-link text-sm text-muted-foreground hover:text-foreground transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            Features
          </a>
          <a href="#screenshots" className="nav-link text-sm text-muted-foreground hover:text-foreground transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            Screenshots
          </a>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-heading text-sm font-bold hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 disabled:opacity-70"
          >
            <Download className="w-4 h-4" />
            {downloading ? "..." : "Download"}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pb-4 flex flex-col gap-3">
          <a href="#features" onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">Features</a>
          <a href="#screenshots" onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">Screenshots</a>
          <button
            onClick={() => { handleDownload(); setMenuOpen(false); }}
            disabled={downloading}
            className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-heading text-sm font-bold flex items-center gap-2 w-fit disabled:opacity-70"
          >
            <Download className="w-4 h-4" />
            {downloading ? "..." : "Download"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
