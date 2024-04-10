"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    disabled?: boolean;
    onAction?: (id: string) => void;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    disabled,
    onAction,
    actionLabel,
    actionId = "",
    currentUser,
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (disabled) {
                return null;
            }
            onAction?.(actionId);
        },
        [disabled, actionId, onAction]
    );

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        return `${format(start, "PP")} - ${format(end, "PP")}`;
    }, [reservation]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    }, [data.price, reservation]);
    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                <Image
                    className="object-cover h-full w-full group-hover:scale-110 transition"
                    src={data.imageSrc}
                    alt={data.title}
                    placeholder="blur"
                    blurDataURL={data.imageSrc}
                    fill
                />

                <div className="absolute top-2 right-3">
                    <HeartButton
                        listingId={data.id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
            <div className="font-semibold text-lg">
                {location?.region}, {location?.label}
            </div>
            <div className="font-light text-neutral-500">
                {reservationDate || data.category}
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">$ {price}</div>
                {!reservation && <div className="font-light">Night</div>}
            </div>
            {onAction && actionLabel && (
                <Button
                    label={actionLabel}
                    onClick={handleCancel}
                    small
                    disabled={disabled}
                />
            )}
        </div>
    );
};

export default ListingCard;
