"use client";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser,
}) => {
    const router = useRouter();
    const [deletingReservation, setDeletingReservation] = useState<
        string | null
    >(null);

    const onCancel = useCallback(
        (id: string) => {
            setDeletingReservation(id);
            axios
                .delete(`/api/reservations/${id}`)
                .then(() => {
                    toast.success("Reservation cancelled successfully");
                    router.refresh();
                })
                .catch((error) => {
                    toast.error(
                        error?.response?.data?.message || "An error occurred"
                    );
                })
                .finally(() => {
                    setDeletingReservation(null);
                });
        },
        [router]
    );

    return (
        <Container>
            <Heading
                title="Your Trips"
                subtitle="Manage your trips, view details, and cancel bookings."
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation) => (
                    <ListingCard
                        data={reservation.listing}
                        key={reservation.id}
                        reservation={reservation}
                        currentUser={currentUser}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingReservation === reservation.id}
                        actionLabel="Cancel"
                    />
                ))}
            </div>
        </Container>
    );
};

export default TripsClient;
