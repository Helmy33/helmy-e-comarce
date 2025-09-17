import { api } from './client.js'

// Auth
export const signup = (data) => api.post('/auth/signup', data)
export const signin = (data) => api.post('/auth/signin', data)
export const forgotPassword = (data) => api.post('/auth/forgotPasswords', data)
export const verifyResetCode = (data) => api.post('/auth/verifyResetCode', data)
export const resetPassword = (data) => api.put('/auth/resetPassword', data)


// Products & Taxonomy
export const getProducts = (params) => api.get('/products', { params })
export const getProduct = (id) => api.get(`/products/${id}`)
export const getCategories = () => api.get('/categories')
export const getBrands = () => api.get('/brands')


// Wishlist
export const addToWishlist = (productId) => api.post('/wishlist', { productId })
export const getWishlist = () => api.get('/wishlist')
export const removeFromWishlist = (productId) => api.delete(`/wishlist/${productId}`)


// Cart
export const addToCart = (productId) => api.post('/cart', { productId })
export const getCart = () => api.get('/cart')
export const removeFromCart = (productId) => api.delete(`/cart/${productId}`)
export const updateCartQty = ({ productId, count }) => api.put(`/cart/${productId}`, { count })
export const clearCart = () => api.delete('/cart')

// Checkout / Payment
export const checkoutSession = ({ cartId, url }) =>
  api.post(`/orders/checkout-session/${cartId}?url=${encodeURIComponent(url)}`, {
    shippingAddress: { details: 'Demo address', phone: '01000000000', city: 'Cairo' }
  })
