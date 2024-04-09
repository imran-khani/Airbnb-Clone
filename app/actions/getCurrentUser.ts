import prisma from '@/app/lib/prismadb'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'


export async function getSession() {
    return await getServerSession(authOptions)
}


export default async function getCurrentUser() {
    try {
        const session = await getSession()
        if (!session?.user?.email) {
            return null
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })
        return user
    } catch (error: any) {
        throw new Error(error)
    }
}

