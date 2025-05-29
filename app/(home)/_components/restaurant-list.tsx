import { getUserFavoriteRestaurants } from '@/app/_actions/restaurant'
import { RestaurantItem } from '../../_components/restaurant-item'
import { getRestaurants } from '../_actions/get-restaurants'

export async function RestaurantList() {
  const restaurants = await getRestaurants()
  const userFavoritesRestaurants = await getUserFavoriteRestaurants()

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden ">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          userFavoritesRestaurants={userFavoritesRestaurants}
        />
      ))}
    </div>
  )
}
