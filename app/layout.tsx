import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import RegisterModal from "@/app/components/Modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";

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
                <ToasterProvider />
                <RegisterModal />
                {children}
                <Footer />
            </body>
        </html>
    );
}
