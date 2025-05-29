import { Header } from '@/app/_components/header'
import { ProductItem } from '@/app/_components/product.item'
import { getRecommendedProducts } from './_actions/get-recommended-products'

export default async function RecommendedProducts() {
  const products = await getRecommendedProducts()

  return (
    <>
      <Header />
      <div className="px-5 py-6 lg:px-[128px]">
        <h2 className="mb-6 text-lg font-semibold">Pedidos Recomendados</h2>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  )
}
