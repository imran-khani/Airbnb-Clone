import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/lib/prismadb'

interface Favourite {
    listingId: string;
}

export async function POST(request: Request,
    { params }: { params: Favourite }
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }
 
    const { listingId } = params

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid listingId')
    }

    let favouriteId = [...(currentUser.favouriteIds || [])]

    favouriteId.push(listingId)

    const user = prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favouriteIds: favouriteId
        }
    })

    return NextResponse.json(user)
}


export async function DELETE(request: Request, { params }: { params: Favourite }) {

    const currentUser = await getCurrentUser()
    if (!currentUser) {
        NextResponse.error()
    }

    const { listingId } = params
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid id')
    }

    let favouriteId = [...(currentUser?.favouriteIds || [])]

    favouriteId.filter((id) => id !== listingId)

    const user = prisma.user.update({
        where: {
            id: currentUser?.id
        },
        data: {
            favouriteIds: favouriteId
        }
    })
    NextResponse.json(user)
}
