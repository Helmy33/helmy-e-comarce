import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPassword } from '../../api/endpoints.js'
import { Link, useNavigate } from 'react-router-dom'

const schema = z.object({
  email: z.string().email()
})

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })
  const nav = useNavigate()

  async function onSubmit(values) {
    await forgotPassword(values)
    nav('/reset-password')
  }

  return (
    <div className="max-w-sm mx-auto card">
      <h1 className="text-xl font-semibold mb-4">Forgot password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Email</label>
          <input className="input" {...register('email')} />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <button className="btn w-full" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send reset code'}</button>
      </form>
      <div className="mt-3 text-sm">Remembered? <Link to="/login" className="link">Back to login</Link></div>
    </div>
  )
}
