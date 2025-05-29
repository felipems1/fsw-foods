import { RestaurantItem } from '../../_components/restaurant-item'
import { getRestaurants } from '../_actions/get-restaurants'
import { getUserFavoritesRestaurants } from '../_actions/get-user-favorites-restaurants'

export async function RestaurantList() {
  const restaurants = await getRestaurants()
  const userFavoritesRestaurants = await getUserFavoritesRestaurants()

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
