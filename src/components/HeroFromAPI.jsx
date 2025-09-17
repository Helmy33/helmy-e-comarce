import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/endpoints.js';
import Dots from './Dots.jsx';
import { useState } from 'react';

export default function HeroFromAPI() {
  const { data, isLoading } = useQuery({
    queryKey: ['hero-products'],
    queryFn: () => getProducts({ limit: 3, sort: '-sold' }),
  });

  if (isLoading) {
    return <div className="mt-4 h-48 md:h-72 bg-gray-100 animate-pulse rounded-2xl" />;
  }

  const items = data?.data?.data || [];
  const main      = items[0]?.imageCover;
  const sideTop   = items[1]?.imageCover || main;
  const sideBottom= items[2]?.imageCover || sideTop;

  return (
    <section className="mt-4">
      <div className="grid gap-3 md:gap-4 md:grid-cols-3">
        <div className="relative md:col-span-2 rounded-2xl overflow-hidden aspect-[16/9]">
          {main && <img src={main} alt="" className="w-full h-full object-cover" />}
        </div>
        
        <div className="grid gap-3">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
            {sideTop && <img src={sideTop} alt="" className="w-full h-full object-cover" />}
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
            {sideBottom && <img src={sideBottom} alt="" className="w-full h-full object-cover" />}
          </div>
        </div>
      </div>
              
      
    </section>
  );
}
