import { useQuery } from '@tanstack/react-query'
import { checkoutSession, getCart } from '../../api/endpoints.js'

export default function Checkout() {
  const { data } = useQuery({ queryKey: ['cart'], queryFn: getCart })
  const cartId = data?.data?.data?._id

  const handlePay = async () => {
    if (!cartId) return
    const front = import.meta.env.VITE_FRONT_URL || window.location.origin
    const res = await checkoutSession({ cartId, url: front + '/cart' })
    const url = res?.data?.session?.url || res?.data?.data?.url
    if (url) {
      window.location.href = url
    } else {
      alert('Could not start checkout session.')
    }
  }

  return (
    <section className="max-w-md mx-auto card">
      <h1 className="text-2xl font-semibold mb-4">Payment</h1>
      <p className="mb-4 text-sm text-gray-600">
        We use Stripe checkout via the Route E‑commerce API. Shipping address is sent as demo data.
      </p>
      <button className="btn w-full" onClick={handlePay}>Pay with Stripe</button>
    </section>
  )
}
