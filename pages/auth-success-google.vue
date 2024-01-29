<script setup>
const route = useRoute()
const router = useRouter()
const { setAuth } = useAuthStore()
const { loginWithGoogle } = useAuthApi()
const modalMessage = ref(false)
const buttonLogin = ref(null)
const isRequest = ref(false)

const config = useRuntimeConfig()
if (['0', 0, 'false', false].includes(config.public.enablePhase2)) throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })

const submitLoginWithGoogle = async () => {
    if (!isRequest.value) {
        isRequest.value = true
        try {
            const data = await loginWithGoogle(route?.query)
            if (data) {
                setAuth({
                    isLogin: true,
                    token: data?.meta?.access_token,
                    profile: data?.data,
                    total_points: data?.meta?.total_points
                })
        
                router.push({ path: '/', query: {} })
            }
        } catch (error) {
            console.log(error)

            if (error?.data?.phone_number) {
                setAuth({
                    profile: {
                        phone_number: error?.data?.phone_number
                    }
                })
                return router.push({ path: '/', query: { 'otp': 1, 'resend': 1 } })
            }

            if ([404, 400]?.includes(error?.meta?.code)) {
                return router.push({ path: '/', query: { 'register': 1 } })
            }
            
            modalMessage.value = error?.meta?.message || 'Opps! telah terjadi kesalahan'
        }
    }
}

const handleCloseModalMessage = () => {
    modalMessage.value = false
    router.push({ path: '/', query: {} })
}

onMounted(() => {
    setTimeout(() => {
        if (route?.query?.code && !isRequest.value) buttonLogin?.value?.click()
    }, 500);
})

</script>

<template>
    <button @click="submitLoginWithGoogle" ref="buttonLogin" class="text-white invisible">Sign In..</button>
    <ModalMessage v-if="modalMessage" :message="modalMessage" @onClose="handleCloseModalMessage" />
</template>