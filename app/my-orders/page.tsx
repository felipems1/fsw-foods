import { Header } from '../_components/header'
import { getUserOrders } from './_actions/get-user-orders'
import { OrderItem } from './_components/order-item'

export default async function MyOrders() {
  const orders = await getUserOrders()

  return (
    <>
      <Header />

      <div className="px-5 py-6 lg:px-[128px]">
        <h2 className="pb-6 text-lg font-semibold">Meus Pedidos</h2>

        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  )
}
