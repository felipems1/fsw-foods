import { db } from '@/app/_lib/prisma'

import { notFound } from 'next/navigation'
import { ProductImage } from './_components/product-image'

import { ProductInfo } from './_components/product-info'
import Image from 'next/image'
import { Header } from '@/app/_components/header'
import { ProductInfoDesktop } from './_components/product-info-desktop'
import { ProductList } from '@/app/_components/product-list'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function Product({ params: { id } }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  })

  if (!product) {
    return notFound()
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: 'Sucos',
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  })

  return (
    <>
      <div className="hidden lg:mb-10 lg:block">
        <Header />
      </div>

      <div className="lg:px-[128px]">
        <div className="hidden lg:block">
          <div className="lg:flex lg:items-center">
            <div className="relative hidden h-[500px] w-[600px] lg:block">
              <Image src={product.imageUrl} alt="" fill />
            </div>
            <div className="flex-1 px-10">
              <ProductInfoDesktop product={product} />
            </div>
          </div>

          <div className="mt-10 space-y-3">
            <h3 className="font-semibold">Sucos</h3>
            <ProductList products={juices} />
          </div>
        </div>

        <div className="block lg:hidden">
          <ProductImage product={product} />
        </div>

        <ProductInfo product={product} complementaryProducts={juices} />
      </div>
    </>
  )
}
