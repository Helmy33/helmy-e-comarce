# Route E‑Commerce Clone (React + Vite)

This project recreates the Route demo (https://routeegy.github.io/Ecommerce) in **React** (not Next.js), including:

- Categories component
- Brands component
- Wishlist heart icon color toggle + server sync
- Forgot / Reset password flow
- Cart with quantity update & remove
- Stripe checkout via Route E‑commerce API

## Quick Start

```bash
npm i
cp .env.example .env
npm run dev
```

## Env

- `VITE_API_BASE` (default: `https://ecommerce.routemisr.com/api/v1`)
- `VITE_FRONT_URL` (default: window.location.origin)

## Notes

- Use any email to register, then use **forgot password** to test the flow.
- You must be logged in to use wishlist/cart/checkout.
- Stripe checkout is created by the `/orders/checkout-session/:cartId` endpoint; you'll be redirected to Stripe.
"# ass-finish" 
"# final" 
