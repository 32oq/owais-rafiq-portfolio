import type { Metadata } from "next";
import settings from "@/data/settings.json";
import profile from "@/data/profile.json";

const BASE_URL = settings.siteUrl;

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
}): Metadata {
  const pageTitle = title
    ? `${title} — ${profile.name} (پیر زادہ)`
    : settings.siteTitle;

  const pageDescription = description ?? settings.siteDescription;
  const pageUrl = `${BASE_URL}${path}`;
  const pageImage = image ?? settings.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: settings.siteKeywords.join(", "),
    authors: [{ name: profile.name, url: settings.siteUrl }],
    creator: profile.name,
    publisher: profile.name,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: settings.siteTitle,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      creator: settings.twitterHandle,
      images: [pageImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: settings.siteUrl,
    sameAs: [
      "https://github.com/32oq",
      "https://linkedin.com/in/owais-rafiq-24b3a2146",
      "https://twitter.com/Owais__rafiq",
    ],
    jobTitle: profile.title,
    worksFor: {
      "@type": "Organization",
      name: "Justdial",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Srinagar",
      addressRegion: "Jammu & Kashmir",
      addressCountry: "IN",
    },
    email: `mailto:${profile.email}`,
    description: profile.shortBio,
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.siteTitle,
    url: settings.siteUrl,
    description: settings.siteDescription,
    author: {
      "@type": "Person",
      name: profile.name,
    },
  };
}
