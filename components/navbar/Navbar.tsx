"use client";
import { Container, Logo, Search, UserMenu } from "..";
import { safeUser } from "@/types";

interface NavbarProps{
  currentUser?:safeUser | null;
}

const Navbar:React.FC<NavbarProps> = ({currentUser}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
