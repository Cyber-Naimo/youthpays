import type { Metadata } from "next";
import { Poppins, Lora } from "next/font/google";
import { brand } from "@/config/brand";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline}`,
  description: `${brand.name} is Pakistan's first card and wallet built for teens. In your name. Backed by the State Bank of Pakistan.`,
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: `Pakistan's first teen card. In your name. ${brand.hook}`,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${lora.variable}`}
      style={{ ["--color-primary" as string]: brand.primaryColor }}
    >
      <body>{children}</body>
    </html>
  );
}
