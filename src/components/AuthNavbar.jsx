
import { Link } from 'react-router-dom';
import { ShoppingCart} from 'lucide-react'

export default function AuthNavbar() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
        <Link to="/logo" className="font-bold text-2xl flex items-center gap-2 ">
          <ShoppingCart className="w-7 h-7 text-green-600 " /> 
          fresh cart
        </Link>
        <nav className="text-sm">
          <Link to="/register" className="px-3 py-1.5 rounded-xl border hover:bg-gray-50">
            Create account
          </Link>
        </nav>
      </div>
    </header>
  );
}