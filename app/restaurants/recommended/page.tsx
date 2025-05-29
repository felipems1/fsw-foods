import { Header } from '@/app/_components/header'
import { RestaurantItem } from '@/app/_components/restaurant-item'
import { getRecommendedRestaurants } from './_actions/get-recommended-restaurants'
import { getUserFavoriteRestaurants } from './_actions/get-user-favorite-restaurants'

export default async function RecommendedRestaurants() {
  const [restaurants, userFavoritesRestaurants] = await Promise.all([
    getRecommendedRestaurants(),
    getUserFavoriteRestaurants(),
  ])

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
              userFavoritesRestaurants={userFavoritesRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  )
}
