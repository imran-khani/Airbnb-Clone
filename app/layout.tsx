import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./components/ToasterProvider";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
const nunito = Nunito({ subsets: ["latin"] });


export const metadata: Metadata = {
    title: "Practicing Airbnb",
    description: "Practicing Airbnb with Next.js",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser()
    return (
        <html lang="en">
            <body className={nunito.className}>
                <ClientOnly>
                    <ToasterProvider />
                    <LoginModal />
                    <RegisterModal />
                    <Navbar currentUser ={user} />
                </ClientOnly>
                {children}
            </body>
        </html>
    );
}
