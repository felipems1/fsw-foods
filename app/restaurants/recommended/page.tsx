import { Header } from '@/app/_components/header'
import { RestaurantItem } from '../../_components/restaurant-item'
import { db } from '../../_lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/_lib/auth'

export default async function RecommendedRestaurants() {
  const restaurants = await db.restaurant.findMany({})
  const session = await getServerSession(authOptions)
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  })

  return (
    <>
      <Header />
      <div className="px-5 py-6 lg:px-[128px]">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-h-full min-w-full"
              userFavoritesRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  )
}
