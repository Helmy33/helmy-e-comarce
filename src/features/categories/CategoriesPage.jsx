import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../api/endpoints.js'

export default function CategoriesPage() {
  const { data, isLoading } = useQuery({ queryKey: ['categories'], queryFn: getCategories })
  if (isLoading) return <div>Loading categories…</div>
  const cats = data?.data?.data || []
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>
      <div className="grid-auto-fit">
        {cats.map((c) => (
          <div key={c._id} className="card text-center">
            <img src={c.image} alt={c.name} className="h-40 w-full object-cover rounded-xl" />
            <h3 className="mt-3 text-lg font-medium">{c.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
