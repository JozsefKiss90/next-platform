import { signIn } from 'next-auth/react'
import { useFormik } from 'formik'
import login_validate from '../lib/validate'
import { useRouter } from 'next/router'
import { LoginHandlersProps } from '../types/types'

export default function LoginHandlers({
  setIsLoading,
  setErrorMessage,
  language,
  baseUrl,
}: LoginHandlersProps) {
  const router = useRouter()

  async function handleGoogleSignin() {
    setIsLoading(true)
    const result = await signIn('google', { callbackUrl: baseUrl })
    if (result?.error) {
      console.error('Error signing in:', result.error)
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: login_validate,
    onSubmit,
  })

  async function onSubmit(values: any) {
    setIsLoading(true)
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    })
    setIsLoading(false)

    if (result?.error) {
      console.error('Error signing in:', result.error)
      setErrorMessage(language ? 'Hibás jelszó vagy felhasználónév' : 'Invalid credentials. Please try again.')
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push('/')
    }
  }

  return {
    handleGoogleSignin,
    formik,
  }
}
