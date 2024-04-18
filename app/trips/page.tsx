import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();
    const reservations = await getReservations({ userId: currentUser?.id });

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
                    title="No Trips Found"
                    subtitle="You have not booked any trips yet."
                />
            </ClientOnly> 
        );
    }

    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default TripsPage;
