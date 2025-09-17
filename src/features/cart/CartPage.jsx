import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { clearCart, getCart, removeFromCart, updateCartQty } from '../../api/endpoints.js'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['cart'], queryFn: getCart })
  const cart = data?.data?.data

  const remove = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] })
  })
  const update = useMutation({
    mutationFn: updateCartQty,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] })
  })
  const clear = useMutation({
    mutationFn: clearCart,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] })
  })

  if (isLoading) return <div>Loading cart…</div>
  if (!cart) return <div>Your cart is empty.</div>

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <div className="space-y-3">
        {cart.products?.map((line) => (
          <div key={line._id} className="card flex items-center gap-3">
            <img src={line.product.imageCover} alt={line.product.title} className="w-20 h-20 object-cover rounded-xl" />
            <div className="flex-1">
              <div className="font-medium">{line.product.title}</div>
              <div className="text-sm text-gray-500">Price: {line.price} E£</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-outline" onClick={() => update.mutate({ productId: line.product._id, count: line.count - 1 })}>-</button>
              <span>{line.count}</span>
              <button className="btn-outline" onClick={() => update.mutate({ productId: line.product._id, count: line.count + 1 })}>+</button>
              <button className="btn-outline" onClick={() => remove.mutate(line.product._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-lg font-semibold">Total: {cart.totalCartPrice} E£</div>
        <div className="flex gap-2">
          <button className="btn-outline" onClick={() => clear.mutate()}>Clear cart</button>
          <Link to="/checkout" className="btn">Checkout</Link>
        </div>
      </div>
    </section>
  )
}
