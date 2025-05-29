'use server'

import { db } from '@/app/_lib/prisma'

export async function getRecommendedRestaurants() {
  return await db.restaurant.findMany({})
}
