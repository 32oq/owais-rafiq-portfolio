import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Tangerine } from "next/font/google";
import { Providers } from "@/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { BackToTop } from "@/components/shared/BackToTop";
import { buildMetadata, buildPersonSchema, buildWebsiteSchema } from "@/lib/metadata";
import { getSettings, getSocialLinks } from "@/services/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tangerine",
  display: "swap",
});

const settings = getSettings();
const socialLinks = getSocialLinks();
const resumeUrl = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume/Owais-Rafiq-Resume.pdf`;

export const metadata: Metadata = buildMetadata({});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([buildPersonSchema(), buildWebsiteSchema()]),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${tangerine.variable} font-sans antialiased bg-background text-text-primary`}
      >
        <Providers>
          <ScrollProgress />
          <Navbar navigation={settings.navigation} resumeUrl={resumeUrl} />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer
            socialLinks={socialLinks}
            footerLinks={settings.footerLinks}
            copyrightYear={settings.copyrightYear}
            name="Owais Rafiq"
          />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
