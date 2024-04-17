"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    id: string;
    imageSrc: string;
    currentUser?: SafeUser | null;
}
const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    id,
    imageSrc,
    currentUser,
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton currentUser={currentUser} listingId={id} />
                </div>
            </div>
        </>
    );
};

export default ListingHead;
