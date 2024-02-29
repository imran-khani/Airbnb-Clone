import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { RegisterModal } from "@/components";
import ToastProvider from "@/providers/ToastProvider";
import LoginModal from "@/components/modal/LoginModal";

const font = Nunito({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "A clone of Airbnb's website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
