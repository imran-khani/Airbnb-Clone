import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
    return (
        <Link href={"/"}>
            <Image
                className="hidden md:block cursor-pointer"
                src={"/logo.png"}
                alt="logo of airbnb"
                width={100}
                height={100}
            />
        </Link>
    );
};

export default Logo;
