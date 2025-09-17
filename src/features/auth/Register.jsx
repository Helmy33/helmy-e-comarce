import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signup } from '../../api/endpoints.js'
import { Link, useNavigate } from 'react-router-dom'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  rePassword: z.string().min(6)
}).refine((d) => d.password === d.rePassword, { message: "Passwords must match", path: ["rePassword"] })

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(schema) })
  const nav = useNavigate()

  async function onSubmit(values) {
    await signup(values)
    reset()
    nav('/login')
  }

  return (
    <div className="max-w-sm mx-auto card">
      <h1 className="text-xl font-semibold mb-4">Create account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Name</label>
          <input className="input" {...register('name')} />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>
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
        <div>
          <label className="label">Re-enter Password</label>
          <input className="input" type="password" {...register('rePassword')} />
          {errors.rePassword && <p className="text-red-600 text-sm">{errors.rePassword.message}</p>}
        </div>
        <button className="btn w-full" disabled={isSubmitting}>{isSubmitting ? 'Loading…' : 'Create account'}</button>
      </form>
      <div className="mt-3 text-sm">Already have an account? <Link to="/login" className="link">Login</Link></div>
    </div>
  )
}
