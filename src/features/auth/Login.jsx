import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signin } from '../../api/endpoints.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { Link, useNavigate } from 'react-router-dom'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })
  const { setToken, setUser } = useAuth()
  const nav = useNavigate()

  async function onSubmit(values) {
    const res = await signin(values)
    const { token, user } = res.data
    setToken(token)
    setUser(user)
    nav('/')
  }

  return (
    <div className="max-w-sm mx-auto card">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Email</label>
          <input className="input" {...register('email')} />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" {...register('password')} />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>
        <button className="btn w-full" disabled={isSubmitting}>{isSubmitting ? 'Loading…' : 'Login'}</button>
      </form>
      <div className="mt-3 text-sm">
        <Link to="/forgot-password" className="link">Forgot password?</Link>
      </div>
      <div className="mt-3 text-sm">No account? <Link to="/register" className="link">Create one</Link></div>
    </div>
  )
}
