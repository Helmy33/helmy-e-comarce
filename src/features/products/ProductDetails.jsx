import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProduct, addToCart } from '../../api/endpoints.js';
import { Plus, ArrowLeft } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  });
  const product = data?.data?.data;

  const addCart = useMutation({
    mutationFn: addToCart,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }),
  });

  if (isLoading) return <div>Loading…</div>;
  if (isError || !product) return <div style={{color:'red'}}>Failed to load product</div>;

  return (
    <section className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <img src={product.imageCover} alt={product.title} className="w-full  object-cover rounded-xl" />
      </div>
      <div>
        <Link to="/" className="link inline-flex items-center gap-1">
          <ArrowLeft className="w-8 h-8" /> Back
        </Link>

        <h1 className="text-2xl font-semibold mt-2">{product.title}</h1>
        <p className="text-gray-700 mt-3">{product.description || 'No description'}</p>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-2xl font-bold">{product.price} E£</span>
          <button
            className="btn flex items-center gap-2"
            onClick={() => addCart.mutate(product._id)}
            disabled={addCart.isPending}
          >
            <Plus className="w-8 h-8 text-green-500" />
            {addCart.isPending ? 'Adding…' : 'Add to cart'}
          </button>
        </div>
      </div>
    </section>
  );
}
