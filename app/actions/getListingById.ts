import prisma from '@/app/lib/prismadb';

interface Listings {
    listingId?: string;
}

export default async function getListingById(params: Listings) {
    try {
        const { listingId } = params;
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true,
            },
        });

        if (!listing) return null;
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified:
                    listing.user.emailVerified?.toISOString() || null,
            }
        }
    } catch (error) {
        throw error; // Throw the caught error object directly
    }
}