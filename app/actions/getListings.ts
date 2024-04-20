import prisma from '@/app/lib/prismadb'

export interface IListingParams{
    userId?:string
}

export async function getListings(
    params:IListingParams
) {
    try {
        const {userId} = params
        const query:any ={}
        if(userId){
            query.userId = userId 
        }

        
        const listings = await prisma.listing.findMany({
            where:query,
            orderBy: {
                createdAt: 'desc'
            }
        })
        const safeListing = listings.map((listing)=>({
            ...listing,
            createdAt:listing.createdAt.toISOString(),
        }))

        return safeListing 
    } catch (error: any) {
        throw new Error(error);
    }
}