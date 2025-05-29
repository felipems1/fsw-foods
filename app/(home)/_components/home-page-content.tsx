import { PromoBanner } from '@/app/(home)/_components/promo-banner'
import { RestaurantList } from '@/app/(home)/_components/restaurant-list'
import { ProductList } from '@/app/_components/product-list'
import { Button } from '@/app/_components/ui/button'
import { Category, Product } from '@prisma/client'
import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CategoryList } from './category-list'
import { RestaurantSearch } from './restaurant-search'

interface HomeData {
  products: (Product & {
    restaurant: { name: string }
  })[]
  burgersCategory: Category | null
  pizzasCategory: Category | null
}

type Props = {
  data: HomeData
}

export function HomePageContent({ data }: Props) {
  const { products, burgersCategory, pizzasCategory } = data

  return (
    <>
      <div className="hidden h-[400px] items-end justify-between bg-red-600 px-5 lg:flex lg:px-[128px]">
        <div className="my-auto flex flex-col gap-5">
          <h1 className="text-5xl font-bold text-white">Está com fome?</h1>
          <p className="text-lg text-white">
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </p>
          <div>
            <RestaurantSearch />
          </div>
        </div>
        <div className="relative h-[400px] w-[400px]">
          <Image src="/banner-desktop-01.png" alt="" fill />
        </div>
      </div>

      <div className="px-5 pt-6 lg:hidden">
        <RestaurantSearch />
      </div>

      <div className="px-5 pt-6 lg:px-[128px]">
        <CategoryList />
      </div>

      <div className="px-5 pt-6 lg:hidden">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <PromoBanner
            src="/banner-mobile-01.png"
            alt="Até 30% de desconto em pizzas!"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6 lg:px-[128px]">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="products/recommended">
              Ver todos <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="hidden gap-8 px-[128px] py-5 lg:flex">
        <Link href={`categories/${burgersCategory?.id}/products`}>
          <PromoBanner
            src="/banner-mobile-02.png"
            alt="A partir de R$17,90 em lanches"
          />
        </Link>
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <PromoBanner
            src="/banner-mobile-01.png"
            alt="Até 30% de desconto em pizzas!"
          />
        </Link>
      </div>

      <div className="px-5 pt-6 lg:hidden">
        <Link href={`categories/${burgersCategory?.id}/products`}>
          <PromoBanner
            src="/banner-mobile-02.png"
            alt="A partir de R$17,90 em lanches"
          />
        </Link>
      </div>

      <div className="space-y-4 py-6 lg:px-[128px]">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="restaurants/recommended">
              Ver todos <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  )
}
