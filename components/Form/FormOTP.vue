<script setup>
const router = useRouter()
const route = useRoute()
const { resendOTP, verifyOTP } = useAuthApi()
const { auth } = useAuthStore()

const form = ref(['', '', '', '', '' , ''])
const inputRefs = ref(null)
const isValidForm = ref(true)
const isSuccess = ref(false)
const modalMessage = ref(false)
const isLoading = ref(false)
const isRequestOTP = ref(false)
const buttonResendOTP = ref(null)

const { secs, startCounting } = useCountDown({ seconds: 59 });

const handleVerifyOTP = async (e) => {
    e.preventDefault();
    isLoading.value = true
    try {
        await verifyOTP({ phone_number: auth?.value?.profile?.phone_number, otp: form.value.join('') })
        isSuccess.value = true
    } catch (error) {
        console.log(error)
        modalMessage.value = error?.meta?.message || 'Opps! telah terjadi kesalahan'
    } finally {
        isLoading.value = false
    }
}

const handleResendOTP = async () => {
    isLoading.value = true

    if (!isRequestOTP?.value) {
        isRequestOTP.value = true
        
        try {
            startCounting()
            await resendOTP({ phone_number: auth?.value?.profile?.phone_number })
        } catch (error) {
            console.log(error)
            modalMessage.value = error?.meta?.message || 'Opps! telah terjadi kesalahan'
        } finally {
            isLoading.value = false
            isRequestOTP.value = false
        }
    }
}

const handleInput = (e, key) => {
    const inputs = inputRefs.value?.map((i) => i)
    if (inputs[key + 1] && e.data) inputs[key + 1].focus()
    if (inputs[key - 1] && !e.data) inputs[key - 1].focus()
}

const handleKeyDown = (e, key) => {
    if (e.key === 'Backspace') {
        const inputs = inputRefs.value?.map((i) => i)
        if (inputs[key - 1] && !e.target.value) inputs[key - 1].focus()
    }
}

const handleSignIn = () => router.push({ query: { 'sign-in': 1 } })

const handleClose = () => {
    modalMessage.value = false
    router.push({ query: {} })
}

const handleCloseModalMessage = () => {
    modalMessage.value = false
}

watch(form.value, (newVal, oldVal) => {
    isValidForm.value = !!(newVal?.[0] && newVal?.[1] && newVal?.[2] && newVal?.[3] && newVal?.[4] && newVal?.[5])
}, { immediate: true, deep: true })

onMounted(() => {
    if (route?.query?.resend && !isRequestOTP?.value) {
        setTimeout(() => {
            buttonResendOTP?.value?.click()
        }, 500);
    } else {
        startCounting()
    }
})
</script>

<template>
    <div class="modal-container fixed top-0 left-0 bottom-0 right-0 w-screen h-screen px-6 laptop:px-0 overflow-hidden flex flex-row justify-center items-center backdrop-blur-sm bg-black/40 z-50">
        <div role="button" @click="handleClose" class="modal-outer w-full h-full absolute top-0 left-0 cursor-default"></div>
        <div v-show="!isSuccess" class="modal-complete-otp relative w-full laptop:w-auto bg-[#FBFAFF] rounded-[32px] z-10">
            <button type="button" @click="handleClose" class="absolute top-4 right-4 z-10">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="16" fill="#E6E2FD"/>
                    <path d="M11 21L21 11M11 11L21 21" stroke="#17077E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <div class="modal-signin-container w-full laptop:w-[400px] mx-auto relative flex flex-row justify-center items-center">
                <div class="modal-signin-wrap w-full mx-auto p-6 flex flex-col justify-center items-center gap-8">
                    <div class="relative w-full">
                        <h1 class="text-gradient-complete text-[32px] leading-[32px] tablet:text-body-40px-black font-bold">Verifikasi nomor kamu</h1>
                    </div>

                    <form id="completeOTP" @submit="handleVerifyOTP" novalidate class="w-full relative flex flex-col gap-8">
                        <div>
                            <p class="text-body-14px text-[#333333] mb-2">Mohon masukkan 6 digit kode verifikasi yang baru saja dikirimkan ke nomor <span class="font-bold">+{{ auth?.profile?.phone_number }}</span></p>
                            <NuxtLink to="/?change-phone-number=1" class="text-[#705BF6] text-sm font-bold">Ganti Nomor HP</NuxtLink>
                        </div>
                        <div class="relative w-full">
                            <div class="flex flex-row justify-between">
                                <input 
                                    v-for="(item, key) in form"
                                    ref="inputRefs"
                                    :disabled="isLoading"
                                    v-bind:key="key" 
                                    v-model="form[key]" 
                                    type="text"
                                    autocomplete="off"
                                    maxlength="1"
                                    @input="(e) => handleInput(e, key)"
                                    @keydown="(e) => handleKeyDown(e, key)"
                                    class="rounded-xl text-center bg-[#E6E2FD] text-body-16px text-[#17077E] w-12 px-4 py-3 placeholder:text-[#9A8BF9] border-2 border-transparent focus:border-[#17077E] focus-visible:outline-none"
                                />
                            </div>
                            <p v-show="secs" class="text-body-14px text-center pt-3 text-[#333333] mt-2">Kirim ulang kode setelah <span class="font-bold">{{ secs }} detik</span></p>
                            <a ref="buttonResendOTP" role="button" @click="() => handleResendOTP()" v-show="!secs" class="text-body-14px pt-3 text-[#333333] mt-2 block underline text-center">Kirim ulang kode</a>
                        </div>

                        <button :disabled="!isValidForm || isLoading" type="submit" class="w-full h-12 bg-[#705BF6] text-[#FBFAFF] rounded-full flex flex-row justify-center items-center gap-2 mb-2 disabled:text-[#9A8BF9] disabled:bg-[#E6E2FD]">
                            <span class="text-body-16px-black leading-none text-center">{{ !isLoading ? 'Verifikasi' : 'Harap Tunggu..'}}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <div v-show="isSuccess" class="modal-success relative w-full laptop:w-auto bg-[#FBFAFF] rounded-[32px] z-10">
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

                <h1 class="text-gradient-complete text-[32px] leading-[32px] tablet:text-body-40px-black font-bold text-center">Akun kamu berhasil dibuat</h1>

                <button @click="handleSignIn" class="w-full h-10 bg-[#705BF6] rounded-full mt-4">
                    <span class="text-body-16px-black leading-none text-center text-[#FBFAFF]">Masuk ke Website</span>
                </button>
            </div>
            </div>
        </div>
    </div>

    <ModalMessage v-if="modalMessage" :message="modalMessage" @onClose="handleCloseModalMessage" />
</template>

<style lang="scss" scoped>
.text-gradient-complete {
  background: linear-gradient(274deg, #17077E 6.65%, #830A86 93.35%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>