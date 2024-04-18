import { NextResponse } from "next/server";
import prisma from '@/app/lib/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(request: Request) {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.redirect('/login')
    }
    const body = await request.json()

    const {
        listingId,
        totalPrice,
        startDate,
        endDate
    } = body

    if (!listingId || !totalPrice || !startDate || !endDate) {
        return NextResponse.error()
    }

    const reservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id!,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })

    return NextResponse.json(reservation)

}