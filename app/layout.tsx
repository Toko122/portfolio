
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteConfig = {
  name: "Toko Migineishvili",
  title: "Toko Migineishvili | Full-Stack Developer",
  description:
    "Explore the portfolio of Toko Migineishvili, a Full-Stack Developer specializing in Next.js, React, TypeScript, Node.js, backend systems, DevOps, and modern web applications.",
  url: "https://toko122.github.io/portfolio/",
  image: "/me.png",
  github: "https://github.com/Toko122",
  locale: "en_US",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const metadataBase = new URL(siteConfig.url);

export const metadata: Metadata = {
  metadataBase,

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  applicationName: `${siteConfig.name} Portfolio`,

  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.github,
    },
  ],

  creator: siteConfig.name,
  publisher: siteConfig.name,

  keywords: [
    "Toko Migineishvili",
    "Toko Migineishvili Portfolio",
    "Full-Stack Developer",
    "Full-Stack Web Developer",
    "Software Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "JavaScript",
    "Node.js",
    "PostgreSQL",
    "REST API",
    "Backend Development",
    "Frontend Development",
    "DevOps",
    "Linux",
    "Web Application Development",
    "Responsive Web Design",
    "Batumi Georgia Developer",
  ],

  category: "technology",

  classification: "Developer Portfolio",

  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: siteConfig.url,
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Full-Stack Developer Portfolio`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.image],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050510",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
