'use client'

import { Cart } from '@/app/_components/cart'
import { ProductList } from '@/app/_components/product-list'
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
import { Button } from '@/app/_components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet'

import { CartContext } from '@/app/_contexts/cart'
import { Prisma } from '@prisma/client'

import { useContext, useState } from 'react'
import { ProductQuantity } from './product-quantity'

interface ProductInfoProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>[]
}

export function ProductInfo({
  product,
  complementaryProducts,
}: ProductInfoProps) {
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
      <div className="relative z-50 mt-[-1.5rem] block rounded-tl-3xl rounded-tr-3xl bg-white py-5 lg:hidden">
        <ProductQuantity
          product={product}
          decreaseQuantityClick={handleDecreaseQuantityClick}
          increaseQuantityClick={handleIncreaseQuantityClick}
          quantity={quantity}
        />

        <div className="mt-6 space-y-3">
          <h3 className="px-5 font-semibold">Sucos</h3>
          <ProductList products={complementaryProducts} />
        </div>

        <div className="mt-6 px-5" onClick={handleAddToCartClick}>
          <Button className="w-full font-semibold">Adicionar à sacola</Button>
        </div>
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
