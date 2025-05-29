'use server'

import { db } from '@/app/_lib/prisma'

export async function getHomeData() {
  const [products, burgersCategory, pizzasCategory] = await Promise.all([
    db.product.findMany({
      where: { discountPercentage: { gt: 0 } },
      take: 10,
      include: { restaurant: { select: { name: true } } },
    }),
    db.category.findFirst({ where: { name: 'Hambúrgueres' } }),
    db.category.findFirst({ where: { name: 'Pizzas' } }),
  ])

  return { products, burgersCategory, pizzasCategory }
}
