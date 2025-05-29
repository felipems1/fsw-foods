import { db } from '@/app/_lib/prisma'

export async function getCategories() {
  return db.category.findMany({})
}
