import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/endpoints.js';

export default function CategoriesStripAPI() {
  const { data, isLoading } = useQuery({
    queryKey: ['categories-strip'],
    queryFn: () => getCategories({ limit: 20 }),
  });

  const cats = data?.data?.data || [];

  return (
    <section className="mt-6 p-5">
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
        {(isLoading ? Array.from({length:8}) : cats).map((c, i) => (
          <div key={c?._id || i} className="min-w-[160px] sm:min-w-[200px]">
            <div className="h-28 sm:h-32 rounded-2xl overflow-hidden bg-gray-100">
              {c?.image ? (
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full animate-pulse" />
              )}
            </div>
            <div className="mt-1 text-lg text-#212529 truncate">{c?.name || ' '}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
