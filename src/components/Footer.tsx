const Footer = () => (
  <footer className="bg-espresso border-t border-gold/10 py-8 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-display text-cream text-lg font-semibold">Imani Studio</p>
      <p className="font-body text-cream/40 text-xs">
        © {new Date().getFullYear()} Imani Studio. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
