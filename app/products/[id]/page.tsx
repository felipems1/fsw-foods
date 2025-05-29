import { Header } from '@/app/_components/header'
import { ProductList } from '@/app/_components/product-list'
import Image from 'next/image'
import { getProductById } from './_actions/get-product-by-id'
import { ProductImage } from './_components/product-image'
import { ProductInfoDesktop } from './_components/product-info-desktop'
import { ProductInfoMobile } from './_components/product-info-mobile'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function Product({ params: { id } }: ProductPageProps) {
  const { product, juices } = await getProductById(id)

  return (
    <>
      <div className="hidden lg:mb-10 lg:block">
        <Header />
      </div>

      <div className="lg:px-[128px]">
        <div className="hidden lg:block">
          <div className="lg:flex lg:items-center">
            <div className="relative hidden h-[500px] w-[600px] lg:block">
              <Image
                src={product.imageUrl}
                alt=""
                fill
                className="rounded-lg"
              />
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

        <ProductInfoMobile product={product} complementaryProducts={juices} />
      </div>
    </>
  )
}
