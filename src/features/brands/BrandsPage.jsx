import { useQuery } from '@tanstack/react-query'
import { getBrands } from '../../api/endpoints.js'

export default function BrandsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['brands'], queryFn: getBrands })
  if (isLoading) return <div>Loading brands…</div>
  const brands = data?.data?.data || []
  return (
    <section>
      <h1 className=" font-semibold mb-4 text-green-500 text-center p-4 text-4xl">All Brands</h1>
      <div className="grid-auto-fit">
        {brands.map((b) => (
          <div key={b._id} className="card text-center">
            <img src={b.image} alt={b.name} className="h-40 w-full object-contain bg-white rounded-xl" />
            <h3 className="mt-3 text-lg font-medium">{b.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
