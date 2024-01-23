import Image from "next/image";
import Container from "@/components/Container";

const Navbar = () => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                   <div 
                   className="flex flex-row items-center gap-3 md:gap-0"
                   >
                    <Image className="hidden md:block cursor-pointer" src={'/logo.png'} alt="logo of airbnb" width={100} height={100} />
                   </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;
