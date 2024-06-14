import { CategoryList } from '../_components/category-list'
import { Header } from '../_components/header'
import { Search } from '../_components/search'
import { ProductList } from '../_components/product-list'
import { Button } from '../_components/ui/button'
import { ChevronRightIcon } from 'lucide-react'
import { db } from '../_lib/prisma'
import { PromoBanner } from '../_components/promo-banner'
import { RestaurantList } from '../_components/restaurant-list'
import Link from 'next/link'
import Image from 'next/image'

const fetch = async () => {
  const getProducts = db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  const getBurgersCategory = db.category.findFirst({
    where: {
      name: 'Hamburguer',
    },
  })

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: 'Pizzas',
    },
  })

  const [products, burgersCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurgersCategory,
    getPizzasCategory,
  ])

  return { products, burgersCategory, pizzasCategory }
}

export default async function Home() {
  const { products, burgersCategory, pizzasCategory } = await fetch()
  return (
    <>
      <Header />

      <div className="hidden h-[500px] items-end justify-between bg-red-600 px-5 lg:flex lg:px-[128px]">
        <div className="my-auto flex flex-col gap-5">
          <h1 className="text-5xl font-bold text-white">Está com fome?</h1>
          <p className="text-lg text-white">
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </p>

          <div>
            <Search />
          </div>
        </div>

        <div className="relative h-[400px] w-[400px]">
          <Image src="/banner-desktop-01.png" alt="" fill />
        </div>
      </div>

      <div className="px-5 pt-6 lg:hidden">
        <Search />
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
