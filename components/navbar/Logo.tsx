"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="logo"
        width={100}
        height={100}
        className="hidden md:block cursor-pointer"
      />
    </Link>
  );
};

export default Logo;
