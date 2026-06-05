"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Download, MapPin, Sparkles, Github, Linkedin, Twitter, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { cn, getLinkProps } from "@/lib/utils";
import type { Profile, SocialLink } from "@/types";

interface HeroProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

const socialIconMap: Record<string, LucideIcon> = {
  Github, Linkedin, Twitter, Mail,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ profile, socialLinks }: HeroProps) {
  const featuredLinks = socialLinks.filter((s) => s.featured);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/70 to-violet-50/90 dark:from-[#09090b] dark:via-[#0d0d1f] dark:to-[#09090b]" />

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-indigo-300/25 via-violet-200/15 to-transparent dark:from-indigo-800/20 dark:via-violet-900/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-40 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-tl from-cyan-300/20 via-indigo-200/15 to-transparent dark:from-cyan-800/15 dark:via-indigo-900/10 blur-3xl"
        />
      </div>

      {/* Fine dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04]"
        style={{ backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`, backgroundSize: "30px 30px" }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div className="container-section relative z-10 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* ── Left: Text Column ── */}
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">

            {/* Availability */}
            <motion.div variants={itemVariants}>
              {profile.availableForWork && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium border border-green-200 bg-green-50/80 text-green-700 dark:border-green-800/60 dark:bg-green-950/30 dark:text-green-400 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  {profile.availabilityNote}
                </div>
              )}
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-indigo-500 dark:text-indigo-400 font-mono">
                Hi, I&apos;m
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-black tracking-tight leading-[1.0]">
                <span className="text-slate-900 dark:text-white">Owais</span>
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Rafiq
                </span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-sm">
                <span className="text-xl">⚡</span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{profile.title}</span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {profile.tagline}
            </motion.p>

            {/* Location / Experience */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-sm text-slate-500 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-indigo-400" />
                {profile.location}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-violet-400" />
                {profile.yearsOfExperience}+ years experience
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <LinkButton href="/#projects" size="lg" rightIcon={<ArrowRight size={15} />}
                className="shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 transition-all duration-200">
                View My Work
              </LinkButton>
              <LinkButton href={profile.resumeUrl} external size="lg" variant="secondary" leftIcon={<Download size={14} />}
                className="bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-200">
                Resume
              </LinkButton>
            </motion.div>

            {/* Social */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 justify-center lg:justify-start">
              {featuredLinks.map((social) => {
                const Icon = socialIconMap[social.icon];
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    {...getLinkProps(social.url)}
                    aria-label={social.platform}
                    className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center",
                      "text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400",
                      "bg-white/70 dark:bg-white/5 backdrop-blur-sm",
                      "border border-slate-200 dark:border-white/10",
                      "hover:border-indigo-300 dark:hover:border-indigo-700",
                      "hover:-translate-y-0.5 hover:shadow-md hover:shadow-indigo-100 dark:hover:shadow-indigo-950/50",
                      "transition-all duration-200"
                    )}
                  >
                    {Icon && <Icon size={16} />}
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* ── Right: Creative Avatar Column ── */}
          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 relative flex items-center justify-center"
            style={{ minHeight: "380px" }}
          >

            {/* ── Layer 1: Morphing gradient blob (background) ── */}
            <motion.div
              aria-hidden="true"
              animate={{
                borderRadius: [
                  "60% 40% 55% 45% / 55% 45% 60% 40%",
                  "40% 60% 45% 55% / 45% 60% 35% 65%",
                  "55% 45% 35% 65% / 60% 40% 55% 45%",
                  "60% 40% 55% 45% / 55% 45% 60% 40%",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 m-auto w-72 h-72 opacity-30 dark:opacity-20 blur-3xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, #818cf8 0%, #c084fc 35%, #38bdf8 70%, #818cf8 100%)",
              }}
            />

            {/* ── Layer 2: Slow-spin outer dashed ring with compass emojis ── */}
            <motion.div
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute w-[340px] h-[340px] rounded-full pointer-events-none"
              style={{
                border: "1.5px dashed rgba(129,140,248,0.35)",
              }}
            >
              {/* Orbital dots at N / E / S / W */}
              {[0, 90, 180, 270].map((deg) => (
                <span
                  key={deg}
                  className="absolute h-2 w-2 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${deg}deg) translateX(168px) translateY(-50%)`,
                  }}
                />
              ))}
            </motion.div>

            {/* ── Layer 3: Counter-spin inner ring ── */}
            <motion.div
              aria-hidden="true"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[270px] h-[270px] rounded-full pointer-events-none"
              style={{
                border: "1px solid rgba(192,132,252,0.25)",
              }}
            />

            {/* ── Layer 4: Floating code symbols ── */}
            {[
              { symbol: "</>", deg: 40, r: 148, delay: 0, fontSize: "11px" },
              { symbol: "{ }", deg: 155, r: 145, delay: 1.5, fontSize: "11px" },
              { symbol: "()", deg: 270, r: 142, delay: 0.8, fontSize: "10px" },
            ].map(({ symbol, deg, r, delay, fontSize }) => (
              <motion.span
                key={symbol}
                aria-hidden="true"
                animate={{ y: [0, -5, 0, 4, 0] }}
                transition={{
                  duration: 4 + delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
                className="absolute font-mono font-bold text-indigo-400/60 dark:text-indigo-500/50 pointer-events-none select-none z-10"
                style={{
                  top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * r}px)`,
                  left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * r}px)`,
                  transform: "translate(-50%, -50%)",
                  fontSize,
                }}
              >
                {symbol}
              </motion.span>
            ))}

            {/* ── Layer 5: Avatar with wave entrance ── */}
            <motion.div
              className="relative z-20"
              initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: [-20, 12, -8, 6, -3, 2, 0],
              }}
              transition={{
                scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.5 },
                rotate: { duration: 1.1, ease: "easeOut", delay: 0.1 },
              }}
            >
              {/* Soft inner glow behind the frame */}
              <div
                aria-hidden="true"
                className="absolute -inset-5 rounded-full blur-2xl opacity-40 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse, #818cf8 0%, #c084fc 40%, transparent 70%)",
                }}
              />

              {/* ── Photo frame — circular ── */}
              <div
                className="relative w-[220px] h-[220px] sm:w-[256px] sm:h-[256px] rounded-full overflow-hidden shadow-2xl shadow-indigo-500/25 dark:shadow-violet-900/50"
                style={{
                  background:
                    "conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #f0abfc, #6366f1)",
                  padding: "3px",
                }}
              >
                <div className="relative h-full w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <Image
                    src="/images/owais.jpg"
                    alt={`${profile.name} waving hello`}
                    fill
                    sizes="(max-width: 640px) 220px, 256px"
                    className="object-cover object-top"
                    priority
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* ── 👋 Waving badge ── */}
              <motion.div
                initial={{ scale: 0, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  delay: 0.9,
                  type: "spring",
                  damping: 8,
                  stiffness: 200,
                }}
                className="absolute -top-4 -right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/60 dark:shadow-black/50 select-none"
              >
                {/* The waving hand — animates ONCE on load */}
                <motion.span
                  animate={{
                    rotate: [0, 22, -12, 22, -8, 16, 0],
                  }}
                  transition={{
                    delay: 1.4,
                    duration: 1.8,
                    ease: "easeInOut",
                    times: [0, 0.12, 0.28, 0.42, 0.58, 0.74, 1],
                    repeat: 0,
                  }}
                  style={{
                    display: "inline-block",
                    transformOrigin: "70% 80%",
                    fontSize: "18px",
                    lineHeight: 1,
                  }}
                >
                  👋
                </motion.span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                  Hello!
                </span>
              </motion.div>

              {/* ── Available for work pill ── */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-green-200 dark:border-green-800/60 shadow-md select-none whitespace-nowrap"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-[11px] font-bold text-green-600 dark:text-green-400">
                  Open to work
                </span>
              </motion.div>
            </motion.div>

            {/* ── Floating tech chips ── */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-4 left-0 z-30 flex items-center gap-2 px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/60 dark:shadow-black/50"
            >
              <span className="text-base">⚡</span>
              <div>
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-100 leading-none">Node.js</p>
                <p className="text-[9px] text-indigo-500 leading-none mt-0.5 font-semibold">Expert · {profile.yearsOfExperience} yrs</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-4 right-0 z-30 flex items-center gap-2 px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/60 dark:shadow-black/50"
            >
              <span className="text-base">⚛️</span>
              <div>
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-100 leading-none">React</p>
                <p className="text-[9px] text-violet-500 leading-none mt-0.5 font-semibold">Advanced</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute bottom-16 right-0 z-30 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-md"
            >
              <span className="text-sm">🍃</span>
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200">MongoDB</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="hidden sm:flex flex-col items-center gap-2 mt-16 text-slate-400 dark:text-slate-600"
        >
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.3, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent dark:from-slate-600"
          />
        </motion.div>
      </div>
    </section>
  );
}
