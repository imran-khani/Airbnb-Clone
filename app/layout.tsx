import type { Metadata } from "next";
import {Nunito } from "next/font/google";
import "./globals.css";
import Navbar from '@/app/components/navbar/Navbar'
const nunito =Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Practicing Airbnb",
  description: "Practicing Airbnb with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
