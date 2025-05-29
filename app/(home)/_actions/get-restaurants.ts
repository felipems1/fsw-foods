'use server'

import { db } from '@/app/_lib/prisma'

export async function getRestaurants() {
  return db.restaurant.findMany({ take: 10 })
}
