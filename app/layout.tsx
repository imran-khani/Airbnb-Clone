import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Modal from "@/components/Modals/Modal";

const font = Nunito({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Airbnb",
    description: "Airbnb clone built with Next.js and Tailwind CSS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={font.className}>
                <Navbar />
                <Modal isOpen />
                {children}
                <Footer />
            </body>
        </html>
    );
}
