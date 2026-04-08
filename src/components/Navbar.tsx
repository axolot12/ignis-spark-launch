import logo from "@/assets/ignis-logo.png";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30 rounded-none">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logo} alt="IgnisLauncher" className="w-9 h-9 rounded-lg" width={36} height={36} />
        <span className="font-heading text-lg font-bold text-foreground tracking-wider">IgnisLauncher</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
        <a href="#screenshots" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Screenshots</a>
        <a
          href="https://github.com/axolot12/traing/releases/download/v1.0/launcher.exe"
          className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-heading text-sm font-bold hover:brightness-110 transition-all"
        >
          Download
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
