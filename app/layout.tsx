import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ||
    requestHeaders.get("host") ||
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ||
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "JS Cleaners | Dry Cleaning & Alterations in McDonough, GA",
    description:
      "Friendly local dry cleaning, shirt laundry, alterations, uniform care, and more at JS Cleaners on Highway 81 in McDonough.",
    alternates: { canonical: origin },
    icons: {
      icon: [{ url: "/js-cleaners-icon.png", type: "image/png" }],
      apple: "/js-cleaners-icon.png",
    },
    openGraph: {
      title: "JS Cleaners | McDonough, Georgia",
      description: "Local dry cleaning, alterations, and careful garment service on Highway 81.",
      type: "website",
      url: origin,
      images: [
        {
          url: `${origin}/og-v3.jpg`,
          width: 1536,
          height: 1024,
          alt: "JS Cleaners in McDonough, Georgia",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "JS Cleaners | McDonough, Georgia",
      description: "Local dry cleaning, alterations, and careful garment service on Highway 81.",
      images: [`${origin}/og-v3.jpg`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
