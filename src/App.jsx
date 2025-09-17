
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CategoriesPage from './features/categories/CategoriesPage.jsx'
import BrandsPage from './features/brands/BrandsPage.jsx'
import WishlistPage from './features/wishlist/WishlistPage.jsx'
import CartPage from './features/cart/CartPage.jsx'
import Login from './features/auth/Login.jsx'
import Register from './features/auth/Register.jsx'
import ForgotPassword from './features/auth/ForgotPassword.jsx'
import ResetPassword from './features/auth/ResetPassword.jsx'
import Checkout from './features/cart/Checkout.jsx'
import ProductDetails from './features/products/ProductDetails.jsx'
import { useAuth } from './context/AuthContext.jsx'
import Productss from './pages/Productss.jsx'
import RootLayout from './layout/RootLayout.jsx'
import AuthLayout from './layout/AuthLayout.jsx'

function Protected({ children }) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      
      <Route element={<RootLayout />}>
        <Route path="/" element={<Protected><Home /></Protected>} />
        <Route path="/Productss" element={<Protected><Productss /></Protected>} />
        <Route path="/products/:id" element={<Protected><ProductDetails /></Protected>} />
        <Route path="/categories" element={<Protected><CategoriesPage /></Protected>} />
        <Route path="/brands" element={<Protected><BrandsPage /></Protected>} />
        <Route path="/wishlist" element={<Protected><WishlistPage /></Protected>} />
        <Route path="/cart" element={<Protected><CartPage /></Protected>} />
        <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
      </Route>

      
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
