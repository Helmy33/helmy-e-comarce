import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, LogIn, LogOut, Heart, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useQuery } from '@tanstack/react-query'
import { getCart } from '../api/endpoints.js'
import { useState } from 'react'

export default function Navbar() {
  const { token, logout } = useAuth()
  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: !!token
  })
  const count = cart?.data?.numOfCartItems ?? 0

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white/80 border-b sticky top-0 backdrop-blur z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between ">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl flex items-center gap-2 ">
          <ShoppingCart className="w-7 h-7 text-green-600 " /> 
          fresh cart
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/cart" className="inline-flex items-center gap-1">
            <ShoppingCart className="w-4 h-4" /> 
            <span>Cart{count ? ` (${count})` : ''}</span>
          </NavLink>
          <NavLink to="/wishlist" className="inline-flex items-center gap-1">
            <Heart className="w-4 h-4" /> Wishlist
          </NavLink>
          <NavLink to="/productss">Products</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/brands">Brands</NavLink>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {!token ? (
            <>
              <NavLink to="/login" className="btn-outline inline-flex items-center gap-2">
                <LogIn className="w-4 h-4" /> Login
              </NavLink>
              <NavLink to="/register" className="btn">Create account</NavLink>
            </>
          ) : (
            <button onClick={logout} className="btn-outline inline-flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center p-3 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <Menu className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col gap-3 p-4">
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
              <ShoppingCart className="w-4 h-4 inline" /> Cart{count ? ` (${count})` : ''}
            </NavLink>
            <NavLink to="/wishlist" onClick={() => setMenuOpen(false)}>
              <Heart className="w-4 h-4 inline" /> Wishlist
            </NavLink>
            <NavLink to="/productss" onClick={() => setMenuOpen(false)}>Products</NavLink>
            <NavLink to="/categories" onClick={() => setMenuOpen(false)}>Categories</NavLink>
            <NavLink to="/brands" onClick={() => setMenuOpen(false)}>Brands</NavLink>

            <div className="flex flex-col gap-2 mt-3">
              {!token ? (
                <>
                  <NavLink to="/login" onClick={() => setMenuOpen(false)} className="btn-outline inline-flex items-center gap-2">
                    <LogIn className="w-4 h-4" /> Login
                  </NavLink>
                  <NavLink to="/register" onClick={() => setMenuOpen(false)} className="btn">Create account</NavLink>
                </>
              ) : (
                <button onClick={() => { logout(); setMenuOpen(false) }} className="btn-outline inline-flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
