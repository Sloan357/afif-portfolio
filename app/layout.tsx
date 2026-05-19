import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { defaultSeoData } from "@/data/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://afifelcharif.com"),
  title: defaultSeoData.metaTitle,
  description: defaultSeoData.metaDescription,
  alternates: {
    canonical: defaultSeoData.canonicalUrl,
  },
  robots: {
    index: !defaultSeoData.noIndex,
    follow: !defaultSeoData.noIndex,
  },
  openGraph: {
    title: defaultSeoData.ogTitle,
    description: defaultSeoData.ogDescription,
    url: defaultSeoData.canonicalUrl,
    siteName: "Afif El Charif",
    type: "website",
    ...(defaultSeoData.ogImage
      ? {
          images: [
            {
              url: defaultSeoData.ogImage,
              alt: defaultSeoData.ogTitle,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeoData.twitterTitle,
    description: defaultSeoData.twitterDescription,
    ...(defaultSeoData.twitterImage
      ? {
          images: [defaultSeoData.twitterImage],
        }
      : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
