'use server'

import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'

export async function favoriteRestaurant(userId: string, restaurantId: string) {
  await db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  })

  revalidatePath('/')
}

export async function unFavoriteRestaurant(
  userId: string,
  restaurantId: string,
) {
  await db.userFavoriteRestaurant.delete({
    where: {
      userId_restaurantId: {
        userId,
        restaurantId,
      },
    },
  })

  revalidatePath('/')
}

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
