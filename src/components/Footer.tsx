import logo from "@/assets/ignis-logo.png";

const Footer = () => (
  <footer className="relative py-12 px-4 border-t border-border/30">
    <div className="max-w-4xl mx-auto text-center">
      <img src={logo} alt="IgnisLauncher" className="w-10 h-10 mx-auto mb-4 opacity-60" width={40} height={40} />
      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} IgnisLauncher. Not affiliated with Mojang or Microsoft.
      </p>
    </div>
  </footer>
);

export default Footer;
