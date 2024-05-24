import { toast } from 'sonner'
import {
  favoriteRestaurant,
  unFavoriteRestaurant,
} from '../_actions/restaurant'
import { useRouter } from 'next/navigation'

interface UseToggleFavoriteRestaurantProps {
  userId?: string
  restaurantId: string
  restaurantIsFavorited?: boolean
}

export function useToggleFavoriteRestaurant({
  userId,
  restaurantId,
  restaurantIsFavorited,
}: UseToggleFavoriteRestaurantProps) {
  const router = useRouter()

  const handleFavoriteClick = async () => {
    if (!userId) return

    try {
      if (restaurantIsFavorited) {
        await unFavoriteRestaurant(userId, restaurantId)
        return toast.success('Restaurante removido dos favoritos.')
      }

      await favoriteRestaurant(userId, restaurantId)
      toast('Restaurante favoritado!', {
        action: {
          label: 'Ver Favoritos',
          onClick: () => router.push('/my-favorite-restaurants'),
        },
      })
    } catch (error) {
      toast.error('Erro ao favoritar restaurante.')
    }
  }

  return { handleFavoriteClick }
}
