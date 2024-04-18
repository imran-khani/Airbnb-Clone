import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/lib/prismadb'

interface Reservation {
    reservationId?: string
}

export async function DELETE (req:Request,{params}: {params: Reservation}){
    try {
        const currentUser = await getCurrentUser()
        if(!currentUser){
            return NextResponse.error()
        }
        
        const {reservationId} = params

        if(!reservationId || typeof reservationId !== 'string'){
            throw new Error('Invalid reservationId') 
        }

        const reservation = await prisma.reservation.deleteMany({
            where:{
                id: reservationId,
                OR:[
                    {userId: currentUser.id},
                    {listing:{userId: currentUser.id}}
                ]
            }
        })
        return NextResponse.json(reservation) 
        
    } catch (error:any) { 
        throw new Error(error)
    }
}