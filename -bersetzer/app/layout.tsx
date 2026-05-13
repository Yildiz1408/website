import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { LangProvider } from "@/components/lang-context";
import { SiteChrome } from "@/components/SiteChrome";
import { METADATA_BASE, OG_IMAGE_ALT, SEO, SITE_NAME } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default: SEO.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: SEO.home.description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: METADATA_BASE.toString() }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Dolmetschen",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE_NAME,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2EDE2" },
    { media: "(prefers-color-scheme: dark)", color: "#0E2238" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable}`}>
        <LangProvider>
          <SiteChrome>{children}</SiteChrome>
        </LangProvider>
      </body>
    </html>
  );
}
