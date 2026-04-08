import { useState, useEffect } from "react";
import { Download, Server, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/ignis-logo.png";
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
    // Increment count
    if (downloads !== null) {
      const newCount = downloads + 1;
      await supabase
        .from("download_counter")
        .update({ count: newCount })
        .eq("id", (await supabase.from("download_counter").select("id").limit(1).single()).data?.id!);
      setDownloads(newCount);
    }
    // Trigger download
    window.open("https://github.com/axolot12/traing/releases/download/v1.0/launcher.exe", "_blank");
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
        {/* Title */}
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-gradient animate-slide-up tracking-wider">
          IGNIS
        </h1>
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-gradient animate-slide-up-delay-1 mb-4 tracking-[0.3em]">
          LAUNCHER
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground animate-slide-up-delay-2 mb-4 max-w-2xl mx-auto">
          A modern Minecraft launcher with multi-instance support, Modrinth mod installation, friends system, capes & more.
        </p>

        {/* Download count as button */}
        {downloads !== null && (
          <div className="animate-slide-up-delay-2 mb-8">
            <button className="px-6 py-3 rounded-xl border-2 border-primary/50 bg-primary/10 font-heading text-base font-bold text-primary hover:bg-primary/20 transition-all duration-300 cursor-default tracking-wide">
              🔥 {formatCount(downloads)} Downloads
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up-delay-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="group relative px-8 py-4 rounded-xl font-heading font-bold text-accent-foreground bg-accent hover:brightness-110 transition-all duration-300 glow-accent flex items-center gap-3 text-lg disabled:opacity-70"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            {downloading ? "Downloading..." : "Download Now"}
          </button>

          <a
            href="https://store.ignismc.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 rounded-xl font-heading font-bold glass-card hover-lift flex items-center gap-3 text-lg text-foreground border-primary/30 hover:border-primary/60 transition-all"
          >
            <Server className="w-5 h-5 text-primary" />
            Minecraft Server
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary/60" />
      </div>
    </section>
  );
};

export default HeroSection;
