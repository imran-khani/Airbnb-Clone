import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import { getListings } from "../actions/getListings";
import PropertyClient from "./PropertyClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();
    const listing = await getListings({ userId: currentUser?.id });

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login" />
            </ClientOnly>
        );
    }

    if (listing.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Properties Found"
                    subtitle="You have not listed any properties yet."
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <PropertyClient
                listing={listing}
                // @ts-ignore
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default PropertiesPage;
