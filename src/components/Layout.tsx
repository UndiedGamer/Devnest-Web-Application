import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Moon,
  Sun,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      setIsDark(true);
    }
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Blogs", href: "/blogs" },
    { label: "Highlights", href: "/highlights" },
    { label: "Team", href: "/team" },
    { label: "Hall of Fame", href: "/hall-of-fame" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 glass-effect border-b border-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <Image
                  src="/logo.png"
                  alt="DevNest Logo"
                  width={40}
                  height={40}
                  priority
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="font-poppins font-bold text-xl glow-text hidden sm:inline">
                  Devnest
                </span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>

                <Button
                  asChild
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground hidden sm:inline-flex gap-2"
                >
                  <Link href="/join">🚀 Join</Link>
                </Button>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-accent/10"
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
              <div className="md:hidden pb-4 pt-2 space-y-1 animate-in slide-in-from-top duration-200">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-primary/10 hover:text-primary transition-colors active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 py-3" asChild>
                    <Link href="/join">🚀 Join</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-muted/50 border-t border-border/40 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
              {/* Brand */}
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
                  <Image
                    src="/logo.png"
                    alt="DevNest Logo"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="font-poppins font-bold text-lg glow-text">
                    Devnest
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Build. Learn. Innovate.
                </p>
              </div>

              {/* Quick Links */}
              <div className="text-center sm:text-left">
                <h3 className="font-poppins font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community */}
              <div className="text-center sm:text-left">
                <h3 className="font-poppins font-semibold mb-4">Community</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/blogs"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Discord
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Forum
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="text-center sm:text-left">
                <h3 className="font-poppins font-semibold mb-4">
                  Stay Updated
                </h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 rounded-lg bg-input text-sm text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40">
              <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                © 2025 Devnest | Built with 💚 by Innovators
              </p>
              <div className="flex items-center gap-4 sm:gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-lg"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/devnestclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-lg"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/devnest_tech_club/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-lg"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="mailto:devnest.techclub@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-lg"
                  aria-label="Email"
                  title="Email"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
