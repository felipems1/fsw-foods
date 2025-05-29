'use server'

import { db } from '@/app/_lib/prisma'
import { notFound } from 'next/navigation'

export async function getProductData(id: string) {
  const product = await db.product.findUnique({
    where: { id },
    include: { restaurant: true },
  })

  if (!product) {
    notFound()
  }

  const juices = await db.product.findMany({
    where: {
      category: { name: 'Sucos' },
      restaurant: { id: product.restaurant.id },
    },
    include: { restaurant: true },
  })

  return { product, juices }
}
