import prisma from '@/app/lib/prismadb'

interface Listings {
    listingId?: string
}


export default async function getListingById(params: Listings) {
    try {
        const { listingId } = params
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        })
        if (!listing) return null;

        return listing
    } catch (error: any) {
        throw new Error(error)
    }
}