import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://waqasali.dev"),
  title: {
    default: "Waqas Ali | Senior DevOps & Multi-Cloud Engineer",
    template: "%s | Waqas Ali"
  },
  description:
    "Premium DevOps portfolio for Waqas Ali, Senior DevOps and Multi-Cloud Engineer specializing in AWS, Azure, GCP, Kubernetes, platform engineering, CI/CD, observability, and cloud security.",
  keywords: [
    "Senior DevOps Engineer",
    "Cloud Engineer",
    "AWS Engineer",
    "Azure Engineer",
    "GCP Engineer",
    "Kubernetes Engineer",
    "Platform Engineer",
    "DevOps Consultant",
    "Site Reliability Engineer",
    "Multi-Cloud Architect"
  ],
  authors: [{ name: "Waqas Ali" }],
  creator: "Waqas Ali",
  openGraph: {
    title: "Waqas Ali | Senior DevOps & Multi-Cloud Engineer",
    description:
      "Designing, automating, securing, and scaling modern cloud platforms across AWS, Azure, and Google Cloud.",
    url: "https://waqasali.dev",
    siteName: "Waqas Ali Portfolio",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Waqas Ali | Senior DevOps & Multi-Cloud Engineer",
    description:
      "Enterprise-grade DevOps, Kubernetes, platform engineering, and multi-cloud architecture portfolio."
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020A1F",
  colorScheme: "dark"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} bg-ink text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
