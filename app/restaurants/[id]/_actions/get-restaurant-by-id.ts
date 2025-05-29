'use server'

import { db } from '@/app/_lib/prisma'

export async function getRestaurantById(id: string) {
  return await db.restaurant.findUnique({
    where: { id },
    include: {
      categories: {
        orderBy: { createdAt: 'desc' },
        include: {
          products: {
            where: { restaurantId: id },
            include: { restaurant: { select: { name: true } } },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: { select: { name: true } },
        },
      },
    },
  })
}
