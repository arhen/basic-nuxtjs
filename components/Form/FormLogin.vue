<script setup>
const router = useRouter()
const { setAuth } = useAuthStore()
const { checkEmail, login } = useAuthApi()
const config = useRuntimeConfig()

const formTrigger = ref(false)
const form = ref({ email: '', password: '' })
const validation = ref({ email: true, password: true })
const isValidForm = ref(true)
const showPasswordForm = ref(false)
const modalMessage = ref('')
const isLoading = ref(false)

const handleNormalLogin = async (e) => {
    e.preventDefault()
    isLoading.value = true
    try {
        const data = await login(form?.value)

        setAuth({
            isLogin: true,
            token: data?.meta?.access_token,
            profile: data?.data,
            total_points: data?.meta?.total_points
        })

        router.push({ query: {} })
        setTimeout(() => {
            reloadNuxtApp()
        }, 300);
    } catch (error) {
        console.log(error)
        
        validation.value = {
            email: true,
            password: false
        }

        if (error?.data?.phone_number) {
            setAuth({
                profile: {
                    phone_number: error?.data?.phone_number
                }
            })
            return router.push({ query: { 'otp': 1, 'resend': 1 } })
        }

        isValidForm.value = false
        modalMessage.value = error?.meta?.message || 'Opps! telah terjadi kesalahan'
    } finally {
        isLoading.value = false
    }
}

const handleCheckEmail = async (e) => {
    e.preventDefault()
    isLoading.value = true
    try {
        await checkEmail({ email: form.value.email })
        showPasswordForm.value = true
    } catch (error) {
        console.log(error)
        if (error?.meta?.code === 400) {
            return showPasswordForm.value = true
        }

        if (error?.meta?.code === 404) {
            setAuth({ profile: { email: form.value.email } })
            return router.push({ query: { 'register': 1 } })
        }

        modalMessage.value = error?.meta?.message || 'Opps! telah terjadi kesalahan'
    } finally {
        isLoading.value = false
    }
}

const handleResetPassword = () => {
    router.push({ query: { 'forgot-password': 1 } })
}

const handleClose = () => {
    form.value = { email: '', password: '' }
    validation.value = { email: true, password: true }
    isValidForm.value = true
    showPasswordForm.value = false
    router.push({ query: {} })
    modalMessage.value = false
}

const handleCloseModalMessage = () => {
    modalMessage.value = false
}

watch(form.value, (newVal) => {
    if (formTrigger.value) {
        validation.value = {
            email: isEmail(newVal?.email),
            password: newVal?.password?.length >= 8
        }

        isValidForm.value = isEmail(newVal?.email)
    }
}, { immediate: true })


</script>

<template>
    <div class="modal-container fixed top-0 left-0 bottom-0 right-0 w-screen h-screen px-6 laptop:px-0 overflow-hidden flex flex-row justify-center items-center backdrop-blur-sm bg-black/40 z-50">
        <div role="button" @click="handleClose" class="modal-outer w-full h-full absolute top-0 left-0 cursor-default"></div>
        <div class="modal-signin relative w-full laptop:w-auto bg-[#FBFAFF] rounded-[32px] z-20">
            <button type="button" @click="handleClose" class="absolute top-4 right-4 z-10">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="16" fill="#E6E2FD"/>
                    <path d="M11 21L21 11M11 11L21 21" stroke="#17077E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
    
            <div class="modal-signin-container w-full laptop:w-[400px] mx-auto relative flex flex-row justify-center items-center">
                <form v-show="!showPasswordForm" @submit="handleCheckEmail" class="modal-signin-wrap w-full mx-auto p-6 flex flex-col justify-center items-center gap-8" novalidate>
                    <div class="relative w-full">
                        <h1 class="text-gradient-saatnya font-plastic text-body-40px-black font-normal uppercase mb-8 pl-1">saatnya jadi</h1>
                        <img src="/images/text-ultraoddinary-signin.svg" alt="UltraOddinary" width="296" height="40" class="w-auto h-10 absolute bottom-0 left-0">
                    </div>
    
                    <div class="relative w-full">
                        <label for="email-signin" class="block text-body-12px-black font-bold text-[#17077E]">Alamat Email</label>
                        <div class="mt-2">
                            <input v-model="form.email" @blur="() => formTrigger = true" type="email" name="email" id="email-signin" autocomplete="off" placeholder="Masukkan alamat email" :class="{'input-text': true, 'is-error': !validation?.email}">
                            <small v-show="!validation?.email" class="text-body-12px-black font-medium text-[#680D2D] mt-2">Alamat email tidak sesuai</small>
                        </div>
                    </div>
    
                    <div class="relative w-full">
                        <button :disabled="!validation.email || isLoading" type="submit" class="w-full h-12 bg-[#705BF6] rounded-full flex flex-row justify-center items-center gap-2 mb-2 disabled:bg-[#E6E2FD]">
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.625 5.625V14.375C18.625 14.8723 18.4275 15.3492 18.0758 15.7008C17.7242 16.0525 17.2473 16.25 16.75 16.25H4.25C3.75272 16.25 3.27581 16.0525 2.92417 15.7008C2.57254 15.3492 2.375 14.8723 2.375 14.375V5.625M18.625 5.625C18.625 5.12772 18.4275 4.65081 18.0758 4.29917C17.7242 3.94754 17.2473 3.75 16.75 3.75H4.25C3.75272 3.75 3.27581 3.94754 2.92417 4.29917C2.57254 4.65081 2.375 5.12772 2.375 5.625M18.625 5.625V5.8275C18.625 6.14762 18.5431 6.46242 18.387 6.74191C18.2309 7.0214 18.0059 7.25628 17.7333 7.42417L11.4833 11.27C11.1877 11.4521 10.8472 11.5485 10.5 11.5485C10.1528 11.5485 9.81233 11.4521 9.51667 11.27L3.26667 7.425C2.9941 7.25711 2.76906 7.02224 2.61297 6.74275C2.45689 6.46325 2.37496 6.14845 2.375 5.82833V5.625" stroke="#FBFAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span class="text-body-16px-black leading-none text-center text-[#FBFAFF]">{{ !isLoading ? 'Masuk dengan Email' : 'Harap Tunggu..'}}</span>
                        </button>

                        <div class="py-6 pt-4 relative">
                            <hr />
                            <span class="bg-[#FBFAFF] px-3 absolute top-1 left-1/2 transform -translate-x-1/2 text-[#CCCCCC]">atau</span>
                        </div>

                        <NuxtLink :to="config?.public?.googleLoginURL" class="w-full h-12 bg-transparent border-2 border-[#17077E] rounded-full flex flex-row justify-center items-center gap-2">
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.05336 6.25764C4.42457 3.53412 7.24269 1.66669 10.5003 1.66669C12.7465 1.66669 14.6328 2.49248 16.0761 3.83715L13.6859 6.2273C12.8223 5.40156 11.7237 4.98108 10.5003 4.98108C8.32984 4.98108 6.49269 6.447 5.83745 8.41669C5.67074 8.91669 5.57604 9.45077 5.57604 10C5.57604 10.5493 5.67074 11.0834 5.83745 11.5834C6.49269 13.553 8.32984 15.0189 10.5003 15.0189C11.6215 15.0189 12.5761 14.7235 13.3223 14.2235C14.2048 13.6326 14.792 12.75 14.9852 11.7084H10.5003V8.48485H18.3487C18.4473 9.03027 18.5003 9.59852 18.5003 10.1894C18.5003 12.7273 17.5912 14.8636 16.0154 16.3144C14.6367 17.5872 12.7503 18.3334 10.5003 18.3334C7.24269 18.3334 4.42457 16.4659 3.05336 13.7424C2.48898 12.6174 2.16699 11.3447 2.16699 10C2.16699 8.65535 2.48898 7.38261 3.05336 6.25764Z" fill="#17077E"/>
                            </svg>
                            <span class="text-body-16px-black leading-none text-center text-[#17077E]">Continue with Google</span>
                        </NuxtLink>
                    </div>
                </form>

                <form v-show="showPasswordForm" @submit="handleNormalLogin" class="modal-signin-wrap w-full mx-auto p-6 flex flex-col justify-center items-center gap-8" novalidate>
                    <div class="relative w-full">
                        <h1 class="text-gradient-saatnya font-bold text-body-40px-black">Masukkan <br/> password kamu</h1>
                    </div>
    
                    <div class="relative w-full">
                        <label for="pass-signin" class="block text-body-12px-black font-bold text-[#17077E]">Password</label>
                        <div class="mt-2">
                            <input v-model="form.password" @blur="() => formTrigger = true" type="password" name="password" id="pass-signin" autocomplete="off" placeholder="Masukkan password" :class="{'input-text': true, 'is-error': !validation?.password}">
                            <small v-show="!validation?.password" class="text-body-12px-black font-medium text-[#680D2D] mt-2">Password tidak sesuai</small>
                        </div>
                    </div>
    
                    <div class="relative w-full">
                        <button :disabled="!validation.password || isLoading" type="submit" class="w-full h-12 bg-[#705BF6] text-[#FBFAFF] rounded-full flex flex-row justify-center items-center gap-2 mb-2 disabled:text-[#9A8BF9] disabled:bg-[#E6E2FD]">
                            <span class="text-body-16px-black leading-none text-center">{{ !isLoading ? 'Masuk' : 'Harap Tunggu..'}}</span>
                        </button>

                        <button type="button" @click="handleResetPassword" class="w-full h-12 bg-transparent border-2 border-[#17077E] rounded-full flex flex-row justify-center items-center gap-2 disabled:text-[#9A8BF9] disabled:bg-[#E6E2FD]">
                            <span class="text-body-16px-black leading-none text-center text-[#17077E]">Lupa Password</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <ModalMessage v-if="modalMessage" :message="modalMessage" @onClose="handleCloseModalMessage" />
</template>

<style lang="scss" scoped>
.text-gradient-saatnya {
  background: linear-gradient(274deg, #17077E 6.65%, #830A86 93.35%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.input-text {
    @apply block w-full rounded-xl bg-[#E6E2FD] text-body-16px text-[#17077E] py-[13px] px-3 placeholder:text-[#9A8BF9] border-2 border-transparent focus:border-[#17077E] focus-visible:outline-none;

    &.is-error {
        @apply text-[#680D2D];
    }
}
</style>