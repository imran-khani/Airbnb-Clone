import "./globals.css";

import { Nunito } from "next/font/google";

import SearchModal from "./components/modals/SearchModal";
import LoginModal from "@/app/components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import RegisterModal from "@/app/components/modals/RegisterModal";

import Navbar from "@/app/components/navbar/Navbar";
import getCurrentUser from "./actions/getCurrentUser";

import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./components/ToasterProvider";

export const metadata = {
    title: "Airbnb",
    description: "Airbnb Clone",
};

const font = Nunito({
    subsets: ["latin"],
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className={font.className}>
                <ClientOnly>
                    <ToasterProvider />
                    <SearchModal />
                    <RentModal />
                    <LoginModal />
                    <RegisterModal />
                    {/* @ts-ignore */}
                    <Navbar currentUser={currentUser} />
                </ClientOnly>
                <div className="pb-20 pt-28">{children}</div>
            </body>
        </html>
    );
}
