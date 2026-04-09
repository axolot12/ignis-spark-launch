import { useState, useEffect } from "react";
import { Download, Server, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg.jpg";

const formatCount = (n: number): string => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
};

const HeroSection = () => {
  const [downloads, setDownloads] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      const { data } = await supabase
        .from("download_counter")
        .select("count")
        .limit(1)
        .single();
      if (data) setDownloads(data.count);
    };
    fetchCount();
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    if (downloads !== null) {
      const newCount = downloads + 1;
      const { data } = await supabase.from("download_counter").select("id").limit(1).single();
      if (data) {
        await supabase.from("download_counter").update({ count: newCount }).eq("id", data.id);
      }
      setDownloads(newCount);
    }
    window.open("https://github.com/axolot12/traing/releases/download/v1.0/launcher.exe", "_blank");
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover animate-slow-zoom" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
        {/* Title */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold text-gradient animate-slide-up tracking-wider hover:tracking-[0.2em] transition-all duration-700 cursor-default">
          IGNIS
        </h1>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-gradient animate-slide-up-delay-1 mb-6 tracking-[0.3em] hover:tracking-[0.5em] transition-all duration-700 cursor-default">
          LAUNCHER
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground animate-slide-up-delay-2 mb-6 max-w-2xl mx-auto">
          A modern Minecraft launcher with multi-instance support, Modrinth mod installation, friends system, capes & more.
        </p>

        {/* Downloaders count badge */}
        {downloads !== null && (
          <div className="animate-slide-up-delay-2 mb-10">
            <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border-2 border-primary/40 bg-primary/5 backdrop-blur-md animate-pulse-glow cursor-default hover:border-primary/70 hover:scale-105 transition-all duration-500">
              <span className="text-xl sm:text-2xl animate-wiggle">🔥</span>
              <span className="font-heading text-2xl sm:text-3xl font-black text-gradient">{formatCount(downloads)}</span>
              <span className="font-heading text-base sm:text-lg font-bold text-primary/80 tracking-wider">Downloaders</span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up-delay-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-heading font-bold text-accent-foreground bg-accent hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300 glow-accent flex items-center gap-3 text-base sm:text-lg disabled:opacity-70"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            {downloading ? "Downloading..." : "Download Now"}
            <span className="absolute inset-0 rounded-xl bg-accent/20 animate-ping-slow opacity-0 group-hover:opacity-100" />
          </button>

          <a
            href="https://store.ignismc.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-heading font-bold glass-card hover-lift flex items-center gap-3 text-base sm:text-lg text-foreground border-primary/30 hover:border-primary/60 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Server className="w-5 h-5 text-primary group-hover:animate-spin-slow" />
            Minecraft Server
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:text-primary transition-colors">
        <ChevronDown className="w-8 h-8 text-primary/60" />
      </div>
    </section>
  );
};

export default HeroSection;
