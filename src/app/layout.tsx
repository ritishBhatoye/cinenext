import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/global/NavbarWrapper";
import ReduxProvider from "@/providers/ReduxProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "CineNext - Stream Movies & TV Shows",
  description:
    "Watch unlimited movies, TV shows, and entertainment content. Stream your favorite shows anytime, anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased `}
      >
        <AuthProvider>
          <ReduxProvider>
            <NavbarWrapper />
            {children}
            <Toaster position="top-right" richColors />
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
