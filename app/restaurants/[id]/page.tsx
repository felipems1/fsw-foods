import { db } from '@/app/_lib/prisma'
import { notFound } from 'next/navigation'
import { RestaurantImage } from './_components/restaurant-image'
import Image from 'next/image'
import { ProductList } from '@/app/_components/product-list'
import { CartBanner } from './_components/cart-banner'
import { authOptions } from '@/app/_lib/auth'
import { getServerSession } from 'next-auth'
import { RestaurantInfo } from './_components/restaurant-info'
import { Header } from '@/app/_components/header'

interface RestaurantsProps {
  params: {
    id: string
  }
}

export default async function Restaurant({ params: { id } }: RestaurantsProps) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!restaurant) {
    return notFound()
  }

  const session = await getServerSession(authOptions)

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  })

  return (
    <>
      <div className="hidden lg:mb-10 lg:block">
        <Header />
      </div>

      <div className="lg:px-[128px]">
        <div className="block lg:hidden">
          <RestaurantImage
            restaurant={restaurant}
            userFavoriteRestaurants={userFavoriteRestaurants}
          />
        </div>

        <div className="hidden lg:flex lg:items-start">
          <div className="relative h-[380px] w-[750px]">
            <Image
              src={restaurant.imageUrl}
              alt=""
              fill
              className="rounded-lg"
            />
          </div>
          <div className="flex-1">
            <RestaurantInfo restaurant={restaurant} />

            <div className="mt-6 space-y-3 px-5">
              <h3 className="font-semibold">Sobre</h3>
              <p className="text-sm text-muted-foreground">
                O SushiDojo é uma joia gastronômica que transporta seus clientes
                para o coração do Japão, com sua atmosfera serena, design
                minimalista e um balcão de sushi onde mestres habilidosos
                preparam pratos autênticos com ingredientes frescos e
                selecionados, garantindo uma experiência culinária excepcional e
                memorável.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h2 className="px-5 font-semibold lg:px-0">Mais Pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-6 space-y-4" key={category.id}>
            <h2 className="px-5 font-semibold lg:px-0">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}

        <CartBanner restaurant={restaurant} />
      </div>
    </>
  )
}
