import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getWishlist, removeFromWishlist, addToCart } from '../../api/endpoints.js'

export default function WishlistPage() {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['wishlist'], queryFn: getWishlist })
  const list = data?.data?.data || []

  const remove = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wishlist'] })
  })
  const addCart = useMutation({
    mutationFn: addToCart,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] })
  })

  if (isLoading) return <div>Loading wishlist…</div>

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Wishlist</h1>
      <div className="space-y-3">
        {list.map((item) => (
          <div key={item._id} className="card flex items-center gap-3">
            <img src={item.imageCover} alt={item.title || item.name} className="w-20 h-20 object-cover rounded-xl" />
            <div className="flex-1">
              <h3 className="font-medium">{item.title || item.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.category?.name}</p>
              <div className="mt-3 flex items-center gap-2">
                <button className="btn" onClick={() => addCart.mutate(item._id)}>Add to cart</button>
                <button className="btn-outline" onClick={() => remove.mutate(item._id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
