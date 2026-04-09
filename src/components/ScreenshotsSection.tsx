import { useState, useRef, useEffect } from "react";
import screenshotHome from "@/assets/screenshot-home.png";
import screenshotMods from "@/assets/screenshot-mods.png";
import screenshotFriends from "@/assets/screenshot-friends.png";
import screenshotAccounts from "@/assets/screenshot-accounts.png";
import screenshotCapes from "@/assets/screenshot-capes.png";

const tabs = [
  { label: "Home", img: screenshotHome },
  { label: "Mod Manager", img: screenshotMods },
  { label: "Friends", img: screenshotFriends },
  { label: "Accounts", img: screenshotAccounts },
  { label: "Capes", img: screenshotCapes },
];

const ScreenshotsSection = () => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setImgLoaded(false);
  }, [active]);

  return (
    <section ref={ref} id="screenshots" className="relative py-24 px-4">
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-4">
            See It In Action
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">Explore the launcher's sleek interface.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              className={`px-4 sm:px-5 py-2 rounded-lg font-heading text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                active === i
                  ? "bg-primary text-primary-foreground glow-primary scale-105"
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Screenshot */}
        <div className="glass-card p-2 glow-primary overflow-hidden hover:shadow-[0_0_50px_hsl(265,80%,65%,0.3)] transition-shadow duration-500">
          <img
            src={tabs[active].img}
            alt={tabs[active].label}
            className={`w-full rounded-lg transition-all duration-500 ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;
