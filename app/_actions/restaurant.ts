'use server'

import { revalidatePath } from 'next/cache'
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
