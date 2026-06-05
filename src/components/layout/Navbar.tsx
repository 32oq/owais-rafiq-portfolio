"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Home, User2, Cpu, Briefcase, FolderOpen, BookOpen, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types";

interface NavbarProps {
  navigation: NavigationItem[];
  resumeUrl: string;
}

const navIconMap: Record<string, LucideIcon> = {
  Home, About: User2, Skills: Cpu, Experience: Briefcase, Projects: FolderOpen, Blog: BookOpen, Contact: Mail,
};

export function Navbar({ navigation, resumeUrl }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close bottom sheet whenever route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when sheet is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
          isScrolled
            ? "bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/5 shadow-sm shadow-slate-900/5"
            : "bg-transparent"
        )}
      >
        <nav className="container-section h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-center" aria-label="Home">
            <span
              className="font-tangerine font-bold text-[2.2rem] leading-none tracking-wide text-slate-800 dark:text-slate-100 group-hover:opacity-80 transition-opacity select-none"
              style={{ textShadow: "1px 1px 0 rgba(99,102,241,0.18)" }}
            >
              <span className="text-indigo-400 dark:text-indigo-400 font-normal text-[1.6rem]">&lt;</span>
              {" "}Owais Rafiq{" "}
              <span className="text-indigo-400 dark:text-indigo-400 font-normal text-[1.6rem]">/&gt;</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navigation.map((item) => {
              const isActive = item.href === pathname ||
                (item.href !== "/" && !item.href.startsWith("/#") && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5"
                  )}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LinkButton
              href={resumeUrl}
              external
              size="sm"
              variant="outline"
              leftIcon={<Download size={13} />}
              className="hidden sm:inline-flex border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700"
            >
              Resume
            </LinkButton>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "md:hidden h-9 w-9 rounded-lg flex items-center justify-center",
                "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100",
                "hover:bg-slate-100 dark:hover:bg-white/5",
                "border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all"
              )}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Bottom-sheet mobile navigation ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Bottom sheet */}
            <motion.div
              key="sheet"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 260, mass: 0.8 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            >
              <div className="bg-white dark:bg-[#111113] rounded-t-3xl border-t border-x border-slate-200 dark:border-white/10 shadow-2xl shadow-black/20 overflow-hidden">

                {/* Drag handle */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                </div>

                {/* Header row */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-white/5">
                  <div className="flex items-center">
                    <span className="font-tangerine font-bold text-[1.9rem] leading-none text-slate-800 dark:text-slate-100">
                      <span className="text-indigo-400 font-normal text-[1.4rem]">&lt;</span>
                      {" "}Owais Rafiq{" "}
                      <span className="text-indigo-400 font-normal text-[1.4rem]">/&gt;</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Nav grid */}
                <nav className="p-4 grid grid-cols-4 gap-2">
                  {navigation.map((item) => {
                    const IconComp = navIconMap[item.label];
                    const isActive = item.href === pathname;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl text-center transition-all duration-150 active:scale-95",
                          isActive
                            ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                            : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-slate-200"
                        )}
                      >
                        <span className={cn(
                          "h-9 w-9 rounded-xl flex items-center justify-center",
                          isActive
                            ? "bg-indigo-100 dark:bg-indigo-900/60"
                            : "bg-slate-100 dark:bg-white/5"
                        )}>
                          {IconComp
                            ? <IconComp size={17} />
                            : <span className="text-sm font-bold">{item.label[0]}</span>
                          }
                        </span>
                        <span className="text-[11px] font-semibold leading-none">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Resume button */}
                <div className="px-4 pb-6 pt-1">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-[0.98] transition-all"
                  >
                    <Download size={15} />
                    Download Resume
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
