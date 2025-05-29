import { Suspense } from 'react'
import { getUserFavoriteRestaurants } from './_actions/get-user-favorites-restaurants'
import { Restaurants } from './_components/restaurants'

export default async function RestaurantsPage() {
  const userFavoriteRestaurants = await getUserFavoriteRestaurants()

  return (
    <Suspense>
      <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />
    </Suspense>
  )
}
