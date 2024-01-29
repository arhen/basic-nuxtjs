import { createGlobalState, useStorage } from '@vueuse/core'
import { useDecrypt, useEncrypt } from './useCrypto'

interface addressTypes {
    address_1?: string
    address_2?: string
    country?: string | number
    province?: string | number
    city?: string | number
    region?: string | number
    zip_code?: string | number
}

interface profileTypes {
    id?: string
    name?: string
    email?: string
    instagram?: string
    tiktok?: string
    discord?: string
    referral_code?: string
    phone_number?: string
    role?: string
    address?: addressTypes
    profile_photo?: string
}

interface authTypes {
    token?: ''
    isLogin?: boolean
    profile?: profileTypes | null
    total_points?: number
}

export function useAuthStore() {
    const initialState: authTypes = {
        token: '',
        isLogin: false,
        profile: null,
        total_points: 0
    }

    const useState = createGlobalState(() => useStorage<authTypes>('um-x-skz--auth', initialState, undefined,
        {
            serializer: {
                read: (v: any) => (v ? JSON.parse(useDecrypt(v)) : null),
                write: (v: any) => useEncrypt(JSON.stringify(v)),
            }
        }
    ))

    const auth = useState()

    const setAuth = (payloads: authTypes) => {
        auth.value = { ...auth?.value, ...payloads }
    }

    return { auth, setAuth }
}