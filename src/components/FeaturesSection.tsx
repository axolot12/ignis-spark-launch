import { Layers, Package, Users, Shirt, Gamepad2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: Layers, title: "Multi Instances & Versions", desc: "Run multiple Minecraft instances simultaneously with any version you want." },
  { icon: Package, title: "Modrinth Mods", desc: "Browse, search, and install mods directly from Modrinth with one click." },
  { icon: Users, title: "Friends System", desc: "Add friends, see who's online, and join each other's games instantly." },
  { icon: Shirt, title: "Capes & Cosmetics", desc: "Collect and equip exclusive capes and cosmetics to customize your look." },
  { icon: Gamepad2, title: "Multiple Accounts", desc: "Manage Microsoft and offline accounts with easy switching." },
  { icon: Sparkles, title: "And Much More", desc: "Console, Fabric/Forge support, featured servers, and more features coming soon." },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`glass-card p-6 group cursor-default transition-all duration-700 hover:scale-[1.03] hover:border-primary/40 hover:shadow-[0_0_30px_hsl(265,80%,65%,0.15)] ${visible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-10 rotate-1"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-[0_0_20px_hsl(265,80%,65%,0.3)]">
        <feature.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
      </div>
      <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-gradient transition-all duration-300">{feature.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
    </div>
  );
};

const FeaturesSection = () => (
  <section id="features" className="relative py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-4">
          Packed With Features
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
          Everything you need for the ultimate Minecraft experience.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
