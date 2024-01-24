import Image from "next/image";
import React from "react";

const Logo = () => {
    return (
        <Image
            className="hidden md:block cursor-pointer"
            src={"/logo.png"}
            alt="logo of airbnb"
            width={100}
            height={100}
        />
    );
};

export default Logo;
