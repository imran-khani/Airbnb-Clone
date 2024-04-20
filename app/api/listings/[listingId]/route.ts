import { NextResponse } from "next/server";
import prisma from '@/app/lib/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";



interface ListingIdProps {
    listingId?: string;
}

export async function DELETE(req: Request, { params }: { params: ListingIdProps }) {

    const currentUser = await getCurrentUser()

    if (!currentUser) NextResponse.error();

    const { listingId } = params
    if (!listingId || typeof listingId !== 'string') throw new Error('Invalid listing id');

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser?.id
        }
    })

    return NextResponse.json(listing)
}






