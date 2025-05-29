'use server'

import { db } from '@/app/_lib/prisma'

export async function getRecommendedProducts() {
  return db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })
}
