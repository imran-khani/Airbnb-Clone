import primsa from '@/app/lib/prismadb'
import getCurrentUser from './getCurrentUser'


interface GetFavouriteProps {
    authorId: string
}

 export default async function getFavouriteListing(){
    try {
        const currentUser = await getCurrentUser()
        if(!currentUser) return []

        const favourites = await primsa.listing.findMany({
            where:{
                id:{
                    in:[...(currentUser.favouriteIds || [])]
                }
            }
        })

        const SafeFavourites = favourites.map((favourite) => ({
            ...favourite,
            createdAt: favourite.createdAt.toISOString(),
        }))

        return SafeFavourites

    } catch (error:any) {
        throw new Error(error)
    }
 }