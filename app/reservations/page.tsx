
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Button from "../components/Button";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationClient from "./ReservationClient";

const Reservations = async () => {
    const currentUser = await getCurrentUser();
    const reservations = await getReservations({ authorId: currentUser?.id });

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login" />
            </ClientOnly>
        );
    }

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Reservations Found"
                    subtitle="You have not made any reservations yet."
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ReservationClient
                reservations={reservations}
                // @ts-ignore
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default Reservations;
