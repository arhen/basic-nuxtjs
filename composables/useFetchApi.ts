import { useFetch, useRuntimeConfig } from "nuxt/app"
import { defu } from 'defu'

interface TypeCustomHeaders {
  Authorization?: string
}

export default function useFetchApi(url: string, options = {}) {
  const config = useRuntimeConfig()
  const { auth, setAuth } = useAuthStore()
  const customHeaders: TypeCustomHeaders = {}

  if (auth?.value?.token) {
    customHeaders.Authorization = `Bearer ${auth?.value?.token}`
  }

  const params = defu(options, {
    ...options,
    baseURL: String(config?.public?.apiURL) ?? '',
    headers: { ...customHeaders },
    onResponseError({ request, response, options } : any) {
      if (response?.status === 401) {
        setAuth({ isLogin: false, profile: null, token: '' })
        navigateTo('/')
      }
    }
  })

  return useFetch(url, params)
}