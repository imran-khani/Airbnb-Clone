import { NextResponse } from "next/server";

import prisma from '@/app/lib/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.redirect('/login')
    }
    const body = await request.json();

    const {
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price,
        title,
        description,
    } = body
    Object.keys(body).forEach((item) => {
        if (!body[item]) {
            NextResponse.error()
        }
    })

    const listing = await prisma.listing.create({
        // @ts-ignore
        data: {
            category,
            locationValue: location.value,
            guestCount,
            roomCount,
            bathroomCount,
            imageSrc,
            price: parseInt(price, 10),
            title,
            description,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)

}