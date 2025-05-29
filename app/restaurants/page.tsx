import { Suspense } from 'react'
import { getUserFavoriteRestaurants } from '../_actions/restaurant'
import { Restaurants } from './_components/restaurants'

export default async function RestaurantsPage() {
  const userFavoriteRestaurants = await getUserFavoriteRestaurants()

  return (
    <Suspense>
      <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />
    </Suspense>
  )
}
