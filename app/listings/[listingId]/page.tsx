import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import Image from "next/image";

interface IParams {
    listingId?: string;
}
const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <div>
            {listing?.title}
            <Image
                placeholder="blur"
                blurDataURL={listing?.imageSrc}
                src={listing?.imageSrc ?? ""}
                alt={listing?.title ?? ""}
                width={400}
                height={400}
            />
        </div>
    );
};

export default ListingPage;
