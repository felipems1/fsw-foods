import { db } from '@/app/_lib/prisma'

export async function getUserFavoritesRestaurants(userId: string | undefined) {
  if (!userId) return []

  return db.userFavoriteRestaurant.findMany({
    where: { userId },
  })
}
