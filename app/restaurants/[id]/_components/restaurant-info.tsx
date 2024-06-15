import { DeliveryInfo } from '@/app/_components/delivery-info'
import { Decimal } from '@prisma/client/runtime/library'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'

interface RestaurantInfoProps {
  restaurant: {
    id: string
    name: string
    imageUrl: string
    deliveryFee: Decimal
    deliveryTimeMinutes: number
    categories: {
      id: string
      name: string
    }[]
  }
}

export function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              sizes="100%"
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] rounded-lg bg-[#f4f4f4] text-center"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}
