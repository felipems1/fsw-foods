import { notFound } from 'next/navigation'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'
import { getServerSession } from 'next-auth'
import { Header } from '../_components/header'
import { RestaurantItem } from '../_components/restaurant-item'

export default async function MyFavoriteRestaurants() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return notFound()
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  })

  return (
    <>
      <Header />
      <div className="px-5 py-6 lg:px-[128px]">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-h-full min-w-full"
                userFavoritesRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <h3 className="text-nowrap font-medium">
              Você ainda não marcou nenhum restaurante como favorito.
            </h3>
          )}
        </div>
      </div>
    </>
  )
}
