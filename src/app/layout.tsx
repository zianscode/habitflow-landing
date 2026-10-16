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
    "Track your daily routines, stay consistent, and achieve your goals with ease. HabitFlow is the premium habit tracking dashboard for serious goal-setters.",
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
      "Track your daily routines, stay consistent, and achieve your goals with ease.",
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
