
interface CheckEmailPayloadTypes {
    email: string
}

interface SignatureParamsTypes {
    email: string
    expires: string
    signature: string
}
interface ResetPasswordPayloadTypes {
    new_password: string
    new_password_confirmation: string
}

interface PhoneNumberPayloadTypes {
    phone_number: string
}

interface RegisterPayloadTypes {
    name: string
    email: string
    password: string
    confirm_password: string
    phone_number: string
}

interface LoginPayloadTypes {
    email: string
    password: string
}

interface LoginWithGoogleParamsTypes {
    code: string
    scope: string
    authuser: string
    prompt: string
}

interface VerifyOTPPayloadTypes {
    phone_number: string
    otp: string
}

interface ResendOTPPayloadTypes {
    phone_number: string
}

interface CityTypes {
    province_id: number
}

interface UpdateProfilePayloadTypes {
    name: string
    instagram: string
    tiktok: string
    discord: string
    address: string
    address_2: string
    province: number
    city: number
    zip_code: number
    profile_photo: null
}

async function checkEmail(payloads: CheckEmailPayloadTypes): Promise<any> {
    const { data, error } = await useFetchApi('/api/auth/check-email', {
        method: 'POST',
        body: JSON.stringify(payloads),
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function register(payloads: RegisterPayloadTypes): Promise<any> {
    const { data, error } = await useFetchApi('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(payloads),
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function login(payloads: LoginPayloadTypes): Promise<any> {
    const { data, error } = await useFetchApi('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(payloads),
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function logout(): Promise<any> {
    const { data, error } = await useFetchApi('/api/auth/logout', {
        method: 'POST',
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function loginWithGoogle(params: LoginWithGoogleParamsTypes): Promise<any> {
    const { data, error } = await useFetchApi('/api/auth/login/google', {
        method: 'POST',
        params
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function verifyOTP(payloads: VerifyOTPPayloadTypes): Promise<any> {
    const { data, error } = await useFetchApi('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify(payloads),
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function resendOTP(payloads: ResendOTPPayloadTypes): Promise<any> {
    const { data, error } = await useFetchApi('/api/auth/resend-otp', {
        method: 'POST',
        body: JSON.stringify(payloads),
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function resetPassword(params: SignatureParamsTypes, payloads: ResetPasswordPayloadTypes): Promise<any> {
    const { data, error } = await useFetchApi('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(payloads),
        params
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function forgotPassword(payloads: CheckEmailPayloadTypes): Promise<any> {
    const { data, error } = await useFetchApi('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify(payloads),
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function requestChangePhoneNumber(payloads: CheckEmailPayloadTypes): Promise<any> {
    const { data, error } = await useFetchApi('/api/auth/change-phone-number', {
        method: 'POST',
        body: JSON.stringify(payloads),
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function changePhoneNumber(params: SignatureParamsTypes, payloads: PhoneNumberPayloadTypes): Promise<any> {
    const { data, error } = await useFetchApi('/api/auth/change-phone-number', {
        method: 'POST',
        body: JSON.stringify(payloads),
        params
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function getProvince() {
    const { data, error } = await useFetchApi('/api/provinces', {
        method: 'GET',
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function getCity(payloads: CityTypes): Promise<any> {
    const { data, error } = await useFetchApi(`/api/provinces/${payloads}/cities`, {
        method: 'GET',
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function updateProfile(payloads: UpdateProfilePayloadTypes): Promise<any> {
    const { data, error } = await useFetchApi('/api/profile?_method=PUT', {
        method: 'POST',
        body: payloads,
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

async function profileLeaderboard() {
    const { data, error } = await useFetchApi('/api/leaderboard', {
        method: 'GET',
    })

    if (error?.value) throw error?.value?.data

    return data?.value;
}

export default function useAuthApi() {
    return {
        checkEmail,
        register,
        login,
        logout,
        verifyOTP,
        resendOTP,
        loginWithGoogle,
        resetPassword,
        forgotPassword,
        getProvince,
        getCity,
        updateProfile,
        profileLeaderboard,
        requestChangePhoneNumber,
        changePhoneNumber
    }
}