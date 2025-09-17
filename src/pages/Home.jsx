import CategoriesStripAPI from '../components/CategoriesStripAPI.jsx'
import HeroFromAPI from '../components/HeroFromAPI.jsx'
import ProductsGrid from '../features/products/ProductsGrid.jsx'

export default function Home() {
  return (
    <section>
         <HeroFromAPI />
         <CategoriesStripAPI />
      <ProductsGrid />
     
    </section>
  )
}
