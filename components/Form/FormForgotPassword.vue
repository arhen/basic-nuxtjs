<script setup>
const route = useRoute()
const router = useRouter()
const { resetPassword, forgotPassword } = useAuthApi()

const formTrigger = ref(false)
const form = ref({ email: '', new_password: '', new_password_confirmation: '' })
const validation = ref({ email: true, new_password: true, new_password_confirmation: true })
const isValidForm = ref(true)
const showPasswordForm = ref(route?.query?.signature)
const showSuccessRequestForgotPassword = ref(false)
const isSuccess = ref(false)
const modalMessage = ref(false)
const isLoading = ref(false)

const handleSubmitChangePassword = async (e) => {
    e.preventDefault()
    isLoading.value = true
    try {
        const payload = {
            params: {
                email: route?.query?.email,
                expires: route?.query?.expires,
                signature: route?.query?.signature,
            },
            body: {
                new_password: form?.value?.new_password,
                new_password_confirmation: form?.value?.new_password_confirmation,
            }
        }

        await resetPassword(payload.params, payload.body);
        isSuccess.value = true
    } catch (error) {
        console.log(error)
        modalMessage.value = error?.meta?.message || 'Opps! telah terjadi kesalahan'
    } finally {
        isLoading.value = false
    }
}

const handleRequestForgotPassword = async (e) => {
    e.preventDefault()
    isLoading.value = true
    try {
        await forgotPassword({ email: form?.value?.email})
        showSuccessRequestForgotPassword.value = true
    } catch (error) {
        console.log(error)
        modalMessage.value = error?.meta?.message || 'Opps! telah terjadi kesalahan'
    } finally {
        isLoading.value = false
    }
}

const handleSignIn = () => router.push({ query: { 'sign-in': 1 } })

const handleClose = () => {
    form.value = { email: '', new_password: '', new_password_confirmation: '' }
    validation.value = { email: true, new_password: true, new_password_confirmation: true }
    isValidForm.value = true
    showPasswordForm.value = false
    isSuccess.value = false
    modalMessage.value = false
    router.push({ query: {} })
}

const handleCloseModalMessage = () => {
    modalMessage.value = false
}

watch(form.value, (newVal) => {
    if (formTrigger.value) {
        validation.value = {
            email: isEmail(newVal?.email),
            new_password: (newVal?.new_password?.length >= 8 && (isContainNumber(newVal?.new_password) || isContainSpecialChar(newVal?.new_password))),
            new_password_confirmation: (newVal?.new_password === newVal?.new_password_confirmation),
        }

        isValidForm.value = (isContainNumber(newVal?.new_password) || isContainSpecialChar(newVal?.new_password)) && newVal?.new_password?.length >= 8 && (newVal?.new_password === newVal?.new_password_confirmation)
    }
}, { immediate: true })


</script>

<template>
    <div class="modal-container fixed top-0 left-0 bottom-0 right-0 w-screen h-screen px-6 laptop:px-0 overflow-hidden flex flex-row justify-center items-center backdrop-blur-sm bg-black/40 z-50">
        <div role="button" @click="handleClose" class="modal-outer w-full h-full absolute top-0 left-0 cursor-default"></div>
        <div v-if="!isSuccess && !showSuccessRequestForgotPassword" class="modal-signin relative w-full laptop:w-auto bg-[#FBFAFF] rounded-[32px] z-20">
            <button type="button" @click="handleClose" class="absolute top-4 right-4 z-10">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="16" fill="#E6E2FD"/>
                    <path d="M11 21L21 11M11 11L21 21" stroke="#17077E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
    
            <div class="modal-signin-container w-full laptop:w-[400px] mx-auto relative flex flex-row justify-center items-center">
                <form v-show="!showPasswordForm" @submit="handleRequestForgotPassword" class="modal-signin-wrap w-full mx-auto p-6 flex flex-col justify-center items-center gap-8" novalidate>
                    <div class="relative w-full">
                        <h1 class="text-gradient-saatnya font-bold text-body-40px-black mb-2">Lupa password</h1>
                        <p class="text-sm">Mohon masukkan alamat email kamu agar kami kirimkan instruksi untuk mengatur ulang password.</p>
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
                            <span class="text-body-16px-black leading-none text-center text-[#FBFAFF]">{{ isLoading ? 'Harap Tunggu..' : 'Atur Ulang Password' }}</span>
                        </button>
                    </div>
                </form>

                <form v-show="showPasswordForm" @submit="handleSubmitChangePassword" class="modal-signin-wrap w-full mx-auto p-6 flex flex-col justify-center items-center gap-8" novalidate>
                    <div class="relative w-full">
                        <h1 class="text-gradient-saatnya font-bold text-body-40px-black">Atur ulang password</h1>
                    </div>
    
                    <div class="relative w-full">
                        <label for="email-signin" class="block text-body-12px-black font-bold text-[#17077E]">Password Baru</label>
                        <div class="mt-2">
                            <input v-model="form.new_password" @blur="() => formTrigger = true" type="password" name="password" id="email-signin" autocomplete="off" placeholder="Masukkan password baru" :class="{'input-text': true, 'is-error': !validation?.new_password}">
                            <small :class="{'text-body-12px-black font-medium mt-2': true, 'text-[#C4BBFB]': validation?.new_password,  'text-[#680D2D]': !validation?.new_password}">Masukkan minimal 8 karakter dan berisi 1 nomor atau simbol unik</small>
                        </div>

                        <label for="email-signin" class="block text-body-12px-black font-bold text-[#17077E] mt-3">Konfirmasi Password Baru</label>
                        <div class="mt-2">
                            <input v-model="form.new_password_confirmation" @blur="() => formTrigger = true" type="password" name="password" id="email-signin" autocomplete="off" placeholder="Masukkan konfirmasi password baru" :class="{'input-text': true, 'is-error': !validation?.new_password_confirmation}">
                            <small v-show="!validation?.new_password_confirmation" class="text-body-12px-black font-medium text-[#680D2D] mt-2">Konfirmasi password tidak sesuai</small>
                        </div>
                    </div>
    
                    <div class="relative w-full">
                        <button :disabled="!isValidForm || isLoading" type="submit" class="w-full h-12 bg-[#705BF6] text-[#FBFAFF] rounded-full flex flex-row justify-center items-center gap-2 mb-2 disabled:text-[#9A8BF9] disabled:bg-[#E6E2FD]">
                            <span class="text-body-16px-black leading-none text-center">{{ isLoading ? 'Harap Tunggu..' : 'Buat Password Baru' }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="isSuccess" class="modal-success relative w-full laptop:w-auto bg-[#FBFAFF] rounded-[32px] z-10">
            <div class="modal-success-container w-full laptop:w-[400px] mx-auto relative flex flex-row justify-center items-center">
            <div class="modal-success-wrap w-full mx-auto p-6 flex flex-col justify-center items-center gap-4">
                <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M84 48C84 52.7276 83.0688 57.4089 81.2597 61.7766C79.4505 66.1443 76.7988 70.1129 73.4558 73.4558C70.1129 76.7988 66.1443 79.4505 61.7766 81.2597C57.4089 83.0688 52.7276 84 48 84C43.2724 84 38.5911 83.0688 34.2234 81.2597C29.8557 79.4505 25.8871 76.7988 22.5442 73.4558C19.2012 70.1129 16.5495 66.1443 14.7403 61.7766C12.9312 57.4089 12 52.7276 12 48C12 38.4522 15.7928 29.2955 22.5442 22.5442C29.2955 15.7928 38.4522 12 48 12C57.5478 12 66.7045 15.7928 73.4558 22.5442C80.2072 29.2955 84 38.4522 84 48Z" fill="url(#paint0_linear_2569_3585)"/>
                    <path d="M36 51L45 60L60 39" stroke="white" stroke-width="9.6" stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                        <linearGradient id="paint0_linear_2569_3585" x1="84" y1="11.9998" x2="17.4625" y2="7.26335" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#17077E"/>
                            <stop offset="1" stop-color="#830A86"/>
                        </linearGradient>
                    </defs>
                </svg>

                <h1 class="text-gradient-complete text-[32px] leading-[32px] tablet:text-body-40px-black font-bold text-center">Password baru kamu berhasil dibuat</h1>

                <button @click="handleSignIn" class="w-full h-10 bg-[#705BF6] rounded-full mt-4">
                    <span class="text-body-16px-black leading-none text-center text-[#FBFAFF]">Masuk ke Website</span>
                </button>
            </div>
            </div>
        </div>

        <div v-if="showSuccessRequestForgotPassword" class="modal-success relative w-full laptop:w-auto bg-[#FBFAFF] rounded-[32px] z-10">
            <div class="modal-success-container w-full laptop:w-[400px] mx-auto relative flex flex-row justify-center items-center">
            <div class="modal-success-wrap w-full mx-auto p-6 flex flex-col justify-center items-center gap-4">
                <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M84 48C84 52.7276 83.0688 57.4089 81.2597 61.7766C79.4505 66.1443 76.7988 70.1129 73.4558 73.4558C70.1129 76.7988 66.1443 79.4505 61.7766 81.2597C57.4089 83.0688 52.7276 84 48 84C43.2724 84 38.5911 83.0688 34.2234 81.2597C29.8557 79.4505 25.8871 76.7988 22.5442 73.4558C19.2012 70.1129 16.5495 66.1443 14.7403 61.7766C12.9312 57.4089 12 52.7276 12 48C12 38.4522 15.7928 29.2955 22.5442 22.5442C29.2955 15.7928 38.4522 12 48 12C57.5478 12 66.7045 15.7928 73.4558 22.5442C80.2072 29.2955 84 38.4522 84 48Z" fill="url(#paint0_linear_2569_3585)"/>
                    <path d="M36 51L45 60L60 39" stroke="white" stroke-width="9.6" stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                        <linearGradient id="paint0_linear_2569_3585" x1="84" y1="11.9998" x2="17.4625" y2="7.26335" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#17077E"/>
                            <stop offset="1" stop-color="#830A86"/>
                        </linearGradient>
                    </defs>
                </svg>

                <h1 class="text-gradient-complete text-[32px] leading-[32px] tablet:text-body-40px-black font-bold text-center">Check e-mail kamu untuk mengganti password</h1>

                <button @click="() => router.push('/')" class="w-full h-10 bg-[#705BF6] rounded-full mt-4">
                    <span class="text-body-16px-black leading-none text-center text-[#FBFAFF]">Oke</span>
                </button>
            </div>
            </div>
        </div>
    </div>

    <ModalMessage v-if="modalMessage" :message="modalMessage" @onClose="handleCloseModalMessage" />
</template>

<style lang="scss" scoped>
.text-gradient-saatnya{
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