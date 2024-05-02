import { Header } from '@/app/_components/header'
import { RestaurantItem } from '../../_components/restaurant-item'
import { db } from '../../_lib/prisma'

export default async function RecommendedRestaurants() {
  const restaurants = await db.restaurant.findMany({})

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="flex flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-h-full min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  )
}
