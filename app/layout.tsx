import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/Providers/ToasterProvider";

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
                <ClientOnly>
                    <ToasterProvider />
                    <RegisterModal />
                    <Navbar />
                </ClientOnly>
                {children}
            </body>
        </html>
    );
}
