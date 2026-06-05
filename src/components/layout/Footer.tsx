import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Heart, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SocialLink, NavigationItem } from "@/types";

interface FooterProps {
  socialLinks: SocialLink[];
  footerLinks: NavigationItem[];
  copyrightYear: number;
  name: string;
}

const socialIconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
};

export function Footer({ socialLinks, footerLinks, copyrightYear, name }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const yearRange =
    copyrightYear < currentYear ? `${copyrightYear}–${currentYear}` : `${currentYear}`;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-section py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Code2 size={13} className="text-accent" />
              </div>
              <span className="font-semibold text-text-primary text-sm">{name}</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              Full Stack Engineer building great products with clean code and modern architecture.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-sm text-text-muted hover:text-text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest">
              Connect
            </h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.filter((s) => s.featured).map((social) => {
                const Icon = socialIconMap[social.icon];
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-text-muted hover:text-text-primary bg-surface-2 hover:bg-border border border-border transition-all duration-150"
                    aria-label={social.platform}
                  >
                    {Icon && <Icon size={13} />}
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted flex items-center gap-1.5">
            © {yearRange} {name}. Built with
            <Heart size={11} className="text-red-500 fill-current" />
            in Kashmir.
          </p>
          <p className="text-xs text-text-muted">
          </p>
        </div>
      </div>
    </footer>
  );
}
