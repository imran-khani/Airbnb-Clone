"use client";
import { SafeReservation, SafeUser } from "../types";
import axios from "axios";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import toast from "react-hot-toast";

interface ReservationClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
    reservations,
    currentUser,
}) => {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const router = useRouter();

    const onCancel = useCallback(
        (id: string) => {
            setDeletingId(id);

            axios
                .delete(`/api/reservations/${id}`)
                .then(() => {
                    toast.success("Reservation cancelled");
                    router.refresh();
                })
                .catch((error) => {
                    toast.error(
                        error?.response?.data?.message || "An error occurred"
                    );
                })
                .finally(() => {
                    setDeletingId(null);
                });
        },
        [router]
    );

    return (
        <Container>
            <Heading
                title="Your Reservations"
                subtitle="View and manage your reservations"
            />
            <hr className="my-5" />
            <div
                className=" 
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8
    "
            >
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                        disabled={deletingId === reservation.id}
                    />
                ))}
            </div>
        </Container>
    );
};

export default ReservationClient;
