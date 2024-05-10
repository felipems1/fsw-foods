'use server'

import { Prisma } from '@prisma/client'
import { db } from '../_lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createOrder(data: Prisma.OrderCreateInput) {
  await db.order.create({ data })
  revalidatePath('/my-orders')
}
