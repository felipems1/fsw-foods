import { Header } from '@/app/_components/header'
import { ProductList } from '@/app/_components/product-list'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getRestaurantById } from './_actions/get-restaurant-by-id'
import { getUserFavoriteRestaurants } from './_actions/get-user-favorite-restaurants'
import { CartBanner } from './_components/cart-banner'
import { RestaurantImage } from './_components/restaurant-image'
import { RestaurantInfo } from './_components/restaurant-info'

interface RestaurantsProps {
  params: {
    id: string
  }
}

export default async function Restaurant({ params: { id } }: RestaurantsProps) {
  const [restaurant, userFavoriteRestaurants] = await Promise.all([
    getRestaurantById(id),
    getUserFavoriteRestaurants(),
  ])

  if (!restaurant) {
    return notFound()
  }

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

        <div className="hidden lg:flex lg:items-center">
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
          <div className="mb-10 mt-6 space-y-4" key={category.id}>
            <h2 className="px-5 font-semibold lg:px-0">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}

        <CartBanner restaurant={restaurant} />
      </div>
    </>
  )
}
