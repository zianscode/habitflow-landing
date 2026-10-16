import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./lib/gsap-register";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";
import Protection from "./components/Protection";
import logoIcon from "../../public/images/icon.png";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-brand",
});

export const metadata: Metadata = {
  title: "HabitFlow",
  description:
    "A simple habit tracker. Check in each day, keep your streaks, and see which habits actually stick.",
  icons: {
    icon: logoIcon.src,
  },
  keywords: [
    "habit tracker",
    "productivity",
    "goal setting",
    "daily routines",
    "streak tracker",
  ],
  openGraph: {
    title: "HabitFlow",
    description:
      "A simple habit tracker. Check in each day and see which habits actually stick.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${spaceGrotesk.variable}`}>
      <body className={`${poppins.className} min-h-screen antialiased`}>
        <Protection />
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
