'use server'

import { authOptions } from '@/app/_lib/auth'
import { db } from '@/app/_lib/prisma'
import { getServerSession } from 'next-auth'

export async function getUserFavoriteRestaurants() {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    return []
  }

  const favorites = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  })

  return favorites
}
