import type { Metadata } from "next";
import { Manrope, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Miss Wellness World 2026",
    template: "%s | Miss Wellness World 2026",
  },
  description:
    "The Official Stage for Miss Wellness World 2026. Redefining beauty through holistic health and inner balance.",
  keywords: [
    "Miss Wellness World",
    "beauty pageant",
    "wellness",
    "health",
    "2026",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${notoSansThai.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
