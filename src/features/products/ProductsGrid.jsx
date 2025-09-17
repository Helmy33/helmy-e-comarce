import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProducts,
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from '../../api/endpoints.js';
import { Link } from 'react-router-dom';
import { Plus, Heart } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProductsGrid() {
  const qc = useQueryClient();
  const { token } = useAuth();


  const [addingIds, setAddingIds] = useState(new Set());
  const [wishingIds, setWishingIds] = useState(new Set());
  const [wishIds, setWishIds] = useState(new Set());


  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts({}),
  });

  const addCart = useMutation({
    mutationFn: addToCart,
    onMutate: (id) => setAddingIds((prev) => new Set(prev).add(id)),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }),
    onSettled: (_data, _err, id) =>
      setAddingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      }),
    onError: (e) =>
      alert(e?.response?.data?.message || 'Failed to add to cart — تأكد إنك عامل Login'),
  });

  const addWish = useMutation({
    mutationFn: addToWishlist,
    onMutate: (id) => setWishingIds((prev) => new Set(prev).add(id)),
    onSuccess: (_res, id) => {
      setWishIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      qc.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onSettled: (_d, _e, id) =>
      setWishingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      }),
  });

  const removeWish = useMutation({
    mutationFn: removeFromWishlist,
    onMutate: (id) => setWishingIds((prev) => new Set(prev).add(id)),
    onSuccess: (_res, id) => {
      setWishIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      qc.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onSettled: (_d, _e, id) =>
      setWishingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      }),
  });

  const toggleWish = (id) => {
    if (!token) return alert('Please login first.');
    wishIds.has(id) ? removeWish.mutate(id) : addWish.mutate(id);
  };

  if (isLoading) return <div>Loading products…</div>;
  if (isError) return <div style={{ color: 'red' }}>Failed: {error?.message}</div>;

  const products = data?.data?.data || [];

  const filteredProducts = products.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.title?.toLowerCase().includes(term) ||
      p.category?.name?.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      {/* Search */}
      <form className="w-full flex justify-center p-5" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="default-search" className="sr-only">
          Search
        </label>
        <div className="relative w-3/4">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-2 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg 
                       bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search.."
          />
        </div>
      </form>

      {/* Grid */}
      <div className="grid-auto-fit mt-6">
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500">No products found.</p>
        )}

        {filteredProducts.map((p) => {
          const isAdding = addingIds.has(p._id);
          const isWishing = wishingIds.has(p._id);
          const isWished = wishIds.has(p._id);

          return (
            <article
              key={p._id}
              className="
                group relative bg-white rounded-2xl shadow-sm transition hover:shadow-lg
                ring-1 ring-gray-200 hover:ring-emerald-400 hover:ring-offset-2
                p-4 pb-16
              "
            >
              <div className="relative">

                <Link to={`/products/${p._id}`}>
                  <div className="w-full aspect-[4/3] bg-white">
                    <img
                      src={p.imageCover}
                      alt={p.title}
                      className=" object-contain select-none"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                </Link>


                <button
                  aria-label="wishlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleWish(p._id);
                  }}
                  disabled={isWishing}
                  aria-busy={isWishing}
                  className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow"
                  title="Toggle wishlist"
                >
                  <Heart
                    className={
                      'w-5 h-5 transition ' +
                      (isWished ? 'fill-red-500 stroke-red-500' : 'fill-black stroke-black')
                    }
                  />
                </button>
              </div>

              <div className="mt-3 flex-1">
                <Link to={`/products/${p._id}`} className="link">
                  <h3 className="font-medium line-clamp-2">{p.title}</h3>
                </Link>
                <p className="text-sm text-emerald-600 mt-1">{p.category?.name}</p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold">{p.price} E£</span>
                <span className="text-sm flex items-center gap-1">

                </span>
              </div>


              <button
                className="
                  absolute bottom-3 left-1/2 -translate-x-1/2
                  opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                  transition px-4 py-2 rounded-xl bg-emerald-600 text-white
                "
                onClick={() => addCart.mutate(p._id)}
                disabled={isAdding}
                aria-busy={isAdding}
              >
                {isAdding ? 'Adding…' : '+ Add'}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
