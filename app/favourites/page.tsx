import getFavouriteListing from "../actions/getFavourite";
import getCurrentUser from "../actions/getCurrentUser";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import FavouriteClient from "./FavouriteClient";

const Favourites = async () => {
    const currentUser = await getCurrentUser();
    const favourites = await getFavouriteListing();

    if (favourites.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Favourites"
                    subtitle="You have not favourited any listings yet."
                />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <FavouriteClient
                listing={favourites}
                //  @ts-ignore
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default Favourites;
