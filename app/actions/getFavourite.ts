import primsa from '@/app/lib/prismadb'
import getCurrentUser from './getCurrentUser'


interface GetFavouriteProps {
    authorId: string
}

export const getFavourite = async ({ authorId }: GetFavouriteProps) => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return null
    }

    const favourites = await primsa.listing.findMany({
        where: {
            id: authorId
        }
    })

    return favourites
}