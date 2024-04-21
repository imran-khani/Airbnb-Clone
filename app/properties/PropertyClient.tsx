"use client";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertyClientProps {
    listing: SafeListing[];
    currentUser?: SafeUser | null;
}

const PropertyClient: React.FC<PropertyClientProps> = ({
    listing,
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
                .delete(`/api/listings/${id}`)
                .then(() => {
                    toast.success("Listing removed");
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
                title="Properties"
                subtitle="You have listed the following properties."
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listing.map((listing) => (
                    <ListingCard
                        data={listing}
                        key={listing.id}
                        currentUser={currentUser}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingReservation === listing.id}
                        actionLabel="Delete"
                    />
                ))}
            </div>
        </Container>
    );
};

export default PropertyClient;
