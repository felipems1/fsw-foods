'use client'

import { Prisma } from '@prisma/client'
import { ProductQuantity } from './product-quantity'
import { useContext, useState } from 'react'
import { Button } from '@/app/_components/ui/button'
import { CartContext } from '@/app/_contexts/cart'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/_components/ui/alert-dialog'
import { Cart } from '@/app/_components/cart'

interface ProductInfoDesktopProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>
}

export function ProductInfoDesktop({ product }: ProductInfoDesktopProps) {
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false)

  const { addProductToCart, products } = useContext(CartContext)

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product: { ...product, quantity }, emptyCart })
    setIsCartOpen(true)
  }

  const handleAddToCartClick = () => {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    )

    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true)
    }

    addToCart({ emptyCart: false })
  }
  const handleIncreaseQuantityClick = () => setQuantity((prev) => prev + 1)
  const handleDecreaseQuantityClick = () =>
    setQuantity((prev) => {
      if (prev === 1) return 1

      return prev - 1
    })

  return (
    <>
      <ProductQuantity
        product={product}
        decreaseQuantityClick={handleDecreaseQuantityClick}
        increaseQuantityClick={handleIncreaseQuantityClick}
        quantity={quantity}
      />
      <div className="mt-6 px-5" onClick={handleAddToCartClick}>
        <Button className="w-full font-semibold">Adicionar à sacola</Button>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você só pode adicionar itens de um restaurante por vez.
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo adicionar esse produto? Isso limpará sua sacola
              atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
