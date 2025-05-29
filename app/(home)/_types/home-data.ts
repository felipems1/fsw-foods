import { Category, Product } from '@prisma/client'

export interface HomeData {
  products: (Product & {
    restaurant: { name: string }
  })[]
  burgersCategory: Category | null
  pizzasCategory: Category | null
}
