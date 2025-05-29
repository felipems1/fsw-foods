import { Header } from '@/app/_components/header'
import { ProductItem } from '@/app/_components/product.item'
import { notFound } from 'next/navigation'
import { getCategoryById } from './_actions/get-category-by-id'

interface CategoriesProps {
  params: {
    id: string
  }
}

export default async function Categories({ params: { id } }: CategoriesProps) {
  const category = await getCategoryById(id)

  if (!category) {
    return notFound()
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6 lg:px-[128px]">
        <h2 className="mb-6 text-lg font-semibold">{category.name}</h2>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-6">
          {category?.products.map((product) => (
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
