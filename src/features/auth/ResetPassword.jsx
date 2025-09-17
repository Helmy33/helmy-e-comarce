import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPassword, verifyResetCode } from '../../api/endpoints.js'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  resetCode: z.string().min(4),
  email: z.string().email(),
  newPassword: z.string().min(6)
})

export default function ResetPassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })
  const nav = useNavigate()

  async function onSubmit(values) {
    await verifyResetCode({ resetCode: values.resetCode })
    await resetPassword({ email: values.email, newPassword: values.newPassword })
    nav('/login')
  }

  return (
    <div className="max-w-sm mx-auto card">
      <h1 className="text-xl font-semibold mb-4">Reset password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Reset code</label>
          <input className="input" placeholder="Check your email" {...register('resetCode')} />
          {errors.resetCode && <p className="text-red-600 text-sm">{errors.resetCode.message}</p>}
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" {...register('email')} />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label">New password</label>
          <input className="input" type="password" {...register('newPassword')} />
          {errors.newPassword && <p className="text-red-600 text-sm">{errors.newPassword.message}</p>}
        </div>
        <button className="btn w-full" disabled={isSubmitting}>{isSubmitting ? 'Updating…' : 'Update password'}</button>
      </form>
    </div>
  )
}
