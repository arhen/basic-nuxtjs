
<script setup>
const router = useRouter()
const { register } = useAuthApi()
const { auth, setAuth } = useAuthStore()

const initialValidationMsg = {
    email: 'Alamat email tidak sesuai',
    name: 'Nama lengkap minimal 2 karakter',
    phone_number: 'Nomor telepon tidak sesuai',
    password: 'Masukkan minimal 8 karakter dan berisi 1 nomor atau simbol unik',
    password_confirmation: 'Konfirmasi password tidak sesuai',
    agreement: 'Kamu harus menyetujui Syarat dan Ketentuan dan Kebijakan Privasi yang berlaku',
}

const formTrigger = ref(false)
const form = ref({ email: auth?.value?.profile?.email, name: '', phone_number: '', password: '', password_confirmation: '', agreement: false })
const validation = ref({ email: true, name: true, phone_number: true, password: true, password_confirmation: true, agreement: true })
const validationMsg = ref(initialValidationMsg)
const isValidForm = ref(true)
const modalMessage = ref(false)
const isLoading = ref(false)

const handleRegister = async (e) => {
    e.preventDefault();
    isLoading.value = true
    try {
        const { password, password_confirmation, ...sliceExceptPassword } = form.value

        const payload = {
            ...sliceExceptPassword,
            phone_number: `62${form.value.phone_number}`
        }
        
        await register({...payload, password, password_confirmation })
        
        setAuth({ profile: payload })
        router.push({ query: { ['otp']: 1 } })
    } catch (error) {
        console.log(error);
        let msg = {}
        let err = {}
        Object.keys(error?.data || {})?.map((fieldName) => {
            msg[fieldName] = error?.data[fieldName]?.[0]
            err[fieldName] = false
        })

        validation.value = { ...validation.value, ...err }
        validationMsg.value = { ...validationMsg.value, ...msg }
        isValidForm.value = false

        if (!error?.data) {
            modalMessage.value = error?.meta?.message || 'Opps! telah terjadi kesalahan'
        }
    } finally {
        isLoading.value = false
    }
}

const handleClose = () => {
    validationMsg.value = initialValidationMsg
    modalMessage.value = false
    router.push({ query: {} })
}

const handleCloseModalMessage = () => {
    modalMessage.value = false
}

watch(form.value, (newVal) => {
    if (formTrigger.value) {

        validation.value = {
            name: newVal?.name?.length >= 2,
            email: isEmail(newVal?.email),
            phone_number: isPhoneNumber(newVal?.phone_number),
            password: (newVal?.password?.length >= 8 && isContainAlpha(newVal?.password) && (isContainNumber(newVal?.password) || isContainSpecialChar(newVal?.password))),
            password_confirmation: (newVal?.password === newVal?.password_confirmation),
            agreement: newVal?.agreement
        }

        validationMsg.value = initialValidationMsg

        const isValidPassword = (isContainNumber(newVal?.password) || isContainSpecialChar(newVal?.password)) && newVal?.password?.length >= 8 && isContainAlpha(newVal?.password) && (newVal?.password === newVal?.password_confirmation)
        isValidForm.value = newVal?.agreement && newVal?.name?.length >= 2 && isEmail(newVal?.email) && isPhoneNumber(newVal?.phone_number) && isValidPassword
    }
}, { immediate: true })
</script>

<template>
    <div class="modal-container max-h-screen overflow-y-auto py-10 fixed top-0 left-0 bottom-0 right-0 w-screen h-screen px-6 laptop:px-0 overflow-hidden backdrop-blur-sm bg-black/40 z-50">
        <div role="button" @click="handleClose" class="modal-outer w-full h-full absolute top-0 left-0 cursor-default"></div>
        <div class="modal-complete-manual relative w-full laptop:w-auto bg-[#FBFAFF] rounded-[32px] z-10 my-5 max-w-[400px] mx-auto">
            <button type="button" @click="handleClose" class="absolute top-4 right-4 z-10">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="16" fill="#E6E2FD"/>
                    <path d="M11 21L21 11M11 11L21 21" stroke="#17077E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <div class="modal-signin-container w-full laptop:w-[400px] mx-auto relative flex flex-row justify-center items-center">
                <div class="modal-signin-wrap w-full mx-auto p-6 flex flex-col justify-center items-center gap-8">
                    <div class="relative w-full">
                        <h1 class="text-gradient-complete text-[32px] leading-[32px] tablet:text-body-40px-black font-bold">Yuk lengkapin informasi kamu</h1>
                    </div>
                    
                    <form id="completeManual" @submit="handleRegister" novalidate class="w-full relative flex flex-col gap-4">
                        <div class="relative w-full">
                            <label for="name-manual" class="block text-body-12px-black font-bold text-[#17077E]">Nama Lengkap</label>
                            <div class="mt-2">
                                <input v-model="form.name" @blur="() => formTrigger = true" type="text" name="name-manual" id="name-manual" autocomplete="off" placeholder="Masukkan nama kamu" :class="{'input-text': true, 'is-error' : !validation?.name}">
                            </div>
                            <small v-show="!validation?.name" class="text-body-12px-black font-medium text-[#680D2D] mt-2">{{ validationMsg?.name }}</small>
                        </div>

                        <div class="relative w-full">
                            <label for="email-manual" class="block text-body-12px-black font-bold text-[#17077E]">Alamat Email</label>
                            <div class="mt-2">
                                <input v-model="form.email" @blur="() => formTrigger = true" type="email" name="email-manual" id="email-manual" autocomplete="off" placeholder="Masukkan alamat email" :class="{'input-text': true, 'is-error' : !validation?.email}">
                            </div>
                            <small v-show="!validation?.email" class="text-body-12px-black font-medium text-[#680D2D] mt-2">{{  validationMsg?.email }}</small>
                        </div>

                        <div class="relative w-full">
                            <label for="phone-manual" class="block text-body-12px-black font-bold text-[#17077E]">Nomor Telepon</label>
                            <div class="flex flex-row gap-2 mt-2">
                                <span class="rounded-xl bg-[#E6E2FD] text-body-16px text-[#9A8BF9] py-[13px] px-3">+62</span>
                                <input v-model="form.phone_number" @blur="() => formTrigger = true" type="text" name="phone-manual" id="phone-manual" autocomplete="off" placeholder="Masukkan nomor telepon" :class="{'input-text': true, 'is-error' : !validation?.phone_number}">
                            </div>
                            <small v-show="!validation?.phone_number" class="text-body-12px-black font-medium text-[#680D2D] mt-2">{{ validationMsg?.phone_number }}</small>
                        </div>

                        <div class="relative w-full">
                            <label for="password" class="block text-body-12px-black font-bold text-[#17077E]">Password</label>
                            <div class="mt-2">
                                <input v-model="form.password" @blur="() => formTrigger = true" type="password" name="password" id="password" autocomplete="off" placeholder="Masukkan password" :class="{'input-text': true, 'is-error' : !validation?.password}">
                            </div>
                            <small :class="{'text-body-12px-black font-medium mt-2': true, 'text-[#C4BBFB]': validation?.password,  'text-[#680D2D]': !validation?.password}">{{ validationMsg?.password }}</small>
                        </div>

                        <div class="relative w-full">
                            <label for="confirmpassword" class="block text-body-12px-black font-bold text-[#17077E]">Konfirmasi password</label>
                            <div class="mt-2">
                                <input v-model="form.password_confirmation" @blur="() => formTrigger = true" type="password" name="confirmpassword" id="confirmpassword" autocomplete="off" placeholder="Konfirmasi password" :class="{'input-text': true, 'is-error' : !validation?.password_confirmation}">
                            </div>
                            <small v-show="!validation?.password_confirmation" class="text-body-12px-black font-medium text-[#680D2D] mt-2">{{ validationMsg?.password_confirmation }}</small>
                        </div>

                        <label for="agreement" class="flex items-start text-[#17077E] gap-2 cursor-pointer">
                            <span :class="{'flex-none h-5 w-5 flex items-center justify-center rounded-[4px] mt-1': true, 'bg-[#705BF6]': form?.agreement, 'border-2 border-[#705BF6]': !form?.agreement }">
                                <input id="agreement" type="checkbox" class="invisible absolute" v-model="form.agreement" @change="() => formTrigger = true" />
                                <span v-show="form.agreement">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </span>

                            <span :class="{'flex-auto text-xs': true, 'text-[#680D2D]': !validation?.agreement}">
                                Saya menyetujui Syarat dan Ketentuan dan Kebijakan Privasi yang berlaku
                            </span>
                        </label>

                        <button :disabled="!isValidForm || isLoading" type="submit" class="w-full h-12 bg-[#705BF6] text-[#FBFAFF] rounded-full flex flex-row justify-center items-center gap-2 mt-4 mb-2 disabled:text-[#9A8BF9] disabled:bg-[#E6E2FD]">
                            <span class="text-body-16px-black leading-none text-center">{{ !isLoading ? 'Lanjut' : 'Harap Tunggu..' }}</span>
                        </button>
                    </form>
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

.input-text {
    @apply block w-full rounded-xl bg-[#E6E2FD] text-body-16px text-[#17077E] py-[13px] px-3 placeholder:text-[#9A8BF9] border-2 border-transparent focus:border-[#17077E] focus-visible:outline-none;

    &.is-error {
        @apply text-[#680D2D];
    }
}
</style>