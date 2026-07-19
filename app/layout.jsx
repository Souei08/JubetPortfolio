import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const siteName = "Jubet Aceberos";
const siteTitle = "Jubet Aceberos | Web Developer";
const siteDescription =
  "Web developer from Davao City, Philippines. I design and build clear, reliable web experiences — from SaaS and commerce to brand sites.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  keywords: [
    "Jubet Aceberos",
    "Web Developer",
    "Frontend Developer",
    "Davao City",
    "Philippines",
    "Next.js",
    "React",
    "Portfolio",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/backgrounds/Jubet.JPG",
        width: 3601,
        height: 3870,
        alt: "Portrait of Jubet Aceberos, web developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/backgrounds/Jubet.JPG"],
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  jobTitle: "Web Developer",
  description: siteDescription,
  url: siteUrl,
  image: `${siteUrl}/images/backgrounds/Jubet.JPG`,
  email: "mailto:jubet.sode.5@gmail.com",
  telephone: "+639518013795",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Davao City",
    addressCountry: "PH",
  },
  sameAs: ["https://github.com/Souei08"],
};

const themeInitScript = `
(function () {
  try {
    var key = "jubet-theme";
    var stored = localStorage.getItem(key);
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
