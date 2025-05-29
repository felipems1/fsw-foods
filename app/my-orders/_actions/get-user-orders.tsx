'use server'

import { authOptions } from '@/app/_lib/auth'
import { db } from '@/app/_lib/prisma'
import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation'

export async function getUserOrders() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/')
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  })

  return orders
}
