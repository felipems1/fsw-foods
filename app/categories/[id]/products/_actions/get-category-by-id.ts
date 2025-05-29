'use server'

import { db } from '@/app/_lib/prisma'

export async function getCategoryById(id: string) {
  return db.category.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          restaurant: {
            select: { name: true },
          },
        },
      },
    },
  })
}
