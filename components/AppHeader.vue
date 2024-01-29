<script setup>
const route = useRoute()
const router = useRouter()
const { auth, setAuth } = useAuthStore()
const { logout, profileLeaderboard } = useAuthApi()
const config = useRuntimeConfig()

const showMenu = ref(false)
const profileRef = ref(null)
const point = ref('')

const triggerOpenMenu =  () => {
  if (!showMenu.value) { 
    showMenu.value = true
    document.querySelector('body').classList.add('overflow-hidden')
  } else {
    showMenu.value = false
    document.querySelector('body').classList.remove('overflow-hidden')
  }
}

const triggerSignIn =  () => router.push({ query: { 'sign-in': 1 } })

const handleLogout = async () => {
  try {
    await logout()
    setAuth({ isLogin: false, profile: null, token: '', total_points: 0 })
    await navigateTo('/')
    reloadNuxtApp()
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => { document.querySelector('body').classList.remove('overflow-hidden') })
</script>

<template>
  <header :class="{ 'open-menu-mobile': showMenu }" class="header fixed top-0 left-0 w-full bg-black z-50">
    <div class="running-text relative bg-[#CDFF3E] py-2 laptop:py-2 overflow-hidden">
      <Vue3Marquee :pause-on-hover="true" :clone="true">
        <p class="text-body-16px-bold laptop:text-body-20px-bold text-black mr-4">AR Photocard Ultra Milk x Stray Kids</p>
        <NuxtLink to="/ar-photo-card" class="flex flex-row justify-center items-center gap-2 px-4 laptop:px-6 py-2 laptop:py-0 laptop:h-10 rounded-full bg-white mr-4">
          <span class="text-body-12px-black laptop:text-body-16px-black font-black text-black text-center uppercase">KUMPULIN SEKARANG</span>
          <svg class="w-auto h-4 laptop:h-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </Vue3Marquee>
      <div class="running-text-bg-overlay w-14 laptop:w-28 left-0"></div>
      <div class="running-text-bg-overlay w-14 laptop:w-28 right-0 rotate-180"></div>
    </div>
    <div class="navbar relative flex flex-row justify-between items-center p-4 laptop:py-4 laptop:px-[120px]">
      <NuxtLink to="/" class="logo inline-block">
        <img src="/images/Logo-UM-X-SKZ@2x.webp" alt="UltraMilk X StrayKids" width="136" height="40" loading="lazy" class="w-auto h-10">
      </NuxtLink>
      <nav class="hidden laptop:flex flex-row justify-center items-center gap-8">
        <NuxtLink to="/personality-quiz" class="flex flex-row justify-center items-center gap-2">
          <span class="text-body-16px-bold text-white text-center">#ULTRAoddinary Type</span>
          <svg class="w-5 h-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
        <NuxtLink to="/ar-photo-card" class="flex flex-row justify-center items-center gap-2">
          <span class="text-body-16px-bold text-white text-center">AR Photocard</span>
          <svg class="w-5 h-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
        <NuxtLink to="/about" class="flex flex-row justify-center items-center gap-2">
          <span class="text-body-16px-bold text-white text-center">About</span>
          <svg class="w-5 h-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
        <div v-if="!['0', 0, 'false', false].includes(config.public.enablePhase2)">
          <ClientOnly >
            <button v-if="!auth?.isLogin" @click="triggerSignIn" class="flex flex-row justify-center items-center gap-2 bg-[#333333] px-5 py-2.5 rounded-[48px]">
              <span class="text-body-16px-bold text-white text-center">
                Masuk/Daftar
              </span>
            </button>
            <div v-else class="relative group">
              <div role="button" class="flex items-center gap-2">
                <img :src="auth?.profile?.profile_photo || config?.public?.avatarURL + `images/user/profile_photo/icownic.png`" class="h-8 w-8 rounded-full aspect-square flex-none object-cover" width="32" height="32" alt="avatar" loading="lazy" />
                <div class="flex-auto text-white">
                  <span class="font-black text-base block">{{ auth?.profile?.name }}</span>
                  <span class="font-[500] text-xs block">{{ useThousandFormat(auth?.total_points || 0) }} pts</span>
                </div>
              </div>
  
              <div ref="profileRef" class="absolute top-full right-0 pt-2 transition-all ease-linear duration-100 transform -translate-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                <div class="p-4 bg-white min-w-[288px] rounded-3xl max-h-[calc(100vh-110px)] overflow-y-auto">
                  <img :src="auth?.profile?.profile_photo || config?.public?.avatarURL + `images/user/profile_photo/icownic.png`" class="h-[256px] w-[256px] aspect-square object-cover rounded-2xl mb-3" width="256" height="256" alt="avatar" loading="lazy" />
  
                  <p class="text-[#200AAE] font-black text-2xl">{{ auth?.profile?.name }}</p>
                  <p class="text-[#200AAE] text-base">{{ auth?.profile?.email }}</p>
  
                  <NuxtLink to="/points" class="bg-[#E6E2FD] px-4 py-3 rounded-xl flex items-center gap-2 my-3">
                    <svg class="flex-none" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 36.3334C28.573 36.3334 36.3334 28.573 36.3334 19C36.3334 9.42707 28.573 1.66667 19 1.66667C9.42707 1.66667 1.66667 9.42707 1.66667 19C1.66667 28.573 9.42707 36.3334 19 36.3334Z" fill="#9A8BF9" stroke="#705BF6" stroke-width="2.66667"/>
                      <path d="M18.423 9.32222C18.6802 8.88071 19.318 8.88071 19.5752 9.32222L22.2996 13.9997C22.3938 14.1615 22.5516 14.2762 22.7345 14.3158L28.025 15.4614C28.5244 15.5695 28.7215 16.1762 28.3811 16.5572L24.7744 20.5937C24.6496 20.7332 24.5894 20.9188 24.6082 21.105L25.1535 26.4906C25.205 26.9989 24.6889 27.3738 24.2214 27.1678L19.2679 24.985C19.0966 24.9095 18.9015 24.9095 18.7302 24.985L13.7768 27.1678C13.3092 27.3738 12.7932 26.9989 12.8447 26.4906L13.3899 21.105C13.4088 20.9188 13.3485 20.7332 13.2238 20.5937L9.6171 16.5572C9.27666 16.1762 9.47376 15.5695 9.97313 15.4614L15.2636 14.3158C15.4465 14.2762 15.6044 14.1615 15.6986 13.9997L18.423 9.32222Z" fill="#FBFAFF"/>
                    </svg>
  
                    <div class="flex-auto">
                      <p class="text-[#200AAE] font-black text-2xl">{{ useThousandFormat( auth?.total_points || 0) }}</p>
                      <p class="text-[#200AAE] text-xs">ULTRAoddinary Points</p>
                    </div>
  
                    <div class="flex-none">
                      <svg class="w-5 h-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </NuxtLink>
  
                  <nav class="text-black">
                    <NuxtLink to="/profile" class="flex flex-row items-center gap-2 py-2.5 w-full">
                      <svg class="flex-none" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99497 3.28333C8.06997 2.83167 8.46163 2.5 8.91997 2.5H11.0808C11.5391 2.5 11.9308 2.83167 12.0058 3.28333L12.1833 4.35083C12.2358 4.6625 12.4441 4.9225 12.7208 5.07583C12.7825 5.10917 12.8433 5.145 12.9041 5.18167C13.175 5.345 13.5041 5.39583 13.8 5.285L14.8141 4.905C15.022 4.82684 15.2508 4.82498 15.4599 4.89976C15.6689 4.97454 15.8447 5.1211 15.9558 5.31333L17.0358 7.18583C17.1467 7.37809 17.1858 7.60344 17.1461 7.8218C17.1064 8.04017 16.9906 8.23737 16.8191 8.37833L15.9833 9.0675C15.7391 9.26833 15.6183 9.57833 15.625 9.89417C15.6261 9.965 15.6261 10.0358 15.625 10.1067C15.6183 10.4217 15.7391 10.7317 15.9833 10.9325L16.82 11.6217C17.1733 11.9133 17.265 12.4175 17.0366 12.8133L15.955 14.6858C15.844 14.878 15.6685 15.0246 15.4596 15.0996C15.2507 15.1745 15.022 15.1729 14.8141 15.095L13.8 14.715C13.5041 14.6042 13.175 14.655 12.9033 14.8183C12.8429 14.8551 12.7818 14.8906 12.72 14.925C12.4441 15.0775 12.2358 15.3375 12.1833 15.6492L12.0058 16.7167C11.9308 17.1692 11.5391 17.5 11.0808 17.5H8.91913C8.4608 17.5 8.06997 17.1683 7.99413 16.7167L7.81663 15.6492C7.76497 15.3375 7.55663 15.0775 7.27997 14.9242C7.21818 14.8901 7.15705 14.8548 7.09663 14.8183C6.8258 14.655 6.49663 14.6042 6.19997 14.715L5.1858 15.095C4.97807 15.1729 4.74944 15.1747 4.54055 15.0999C4.33166 15.0251 4.15606 14.8787 4.04497 14.6867L2.96413 12.8142C2.85325 12.6219 2.81417 12.3966 2.85385 12.1782C2.89352 11.9598 3.00938 11.7626 3.1808 11.6217L4.01747 10.9325C4.2608 10.7325 4.38163 10.4217 4.3758 10.1067C4.3745 10.0358 4.3745 9.96499 4.3758 9.89417C4.38163 9.5775 4.2608 9.26833 4.01747 9.0675L3.1808 8.37833C3.00958 8.23741 2.89386 8.04036 2.85419 7.82219C2.81453 7.60401 2.85348 7.37884 2.96413 7.18667L4.04497 5.31417C4.15596 5.12178 4.33164 4.97505 4.54073 4.90011C4.74981 4.82518 4.97871 4.82691 5.18663 4.905L6.19997 5.285C6.49663 5.39583 6.8258 5.345 7.09663 5.18167C7.15663 5.145 7.2183 5.11 7.27997 5.075C7.55663 4.9225 7.76497 4.6625 7.81663 4.35083L7.99497 3.28333Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.663 7.5 11.2989 7.76339 11.7678 8.23223C12.2366 8.70107 12.5 9.33696 12.5 10Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span class="flex-auto text-body-16px-bold">Pengaturan</span>
                      <svg class="w-5 h-auto flex-none" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </NuxtLink>
  
                    <button @click="handleLogout" class="flex flex-row items-center justify-start gap-2 py-2.5 w-full">
                      <svg class="flex-none" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.875 7.5V4.375C6.875 3.87772 7.07254 3.40081 7.42417 3.04917C7.77581 2.69754 8.25272 2.5 8.75 2.5H13.75C14.2473 2.5 14.7242 2.69754 15.0758 3.04917C15.4275 3.40081 15.625 3.87772 15.625 4.375V15.625C15.625 16.1223 15.4275 16.5992 15.0758 16.9508C14.7242 17.3025 14.2473 17.5 13.75 17.5H8.75C8.25272 17.5 7.77581 17.3025 7.42417 16.9508C7.07254 16.5992 6.875 16.1223 6.875 15.625V12.5M4.375 12.5L1.875 10M1.875 10L4.375 7.5M1.875 10H12.5" stroke="#680D2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span class="flex-auto text-body-16px-bold text-left">Keluar</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </ClientOnly>
        </div>
      </nav>
      <div class="flex flex-row justify-center items-center laptop:hidden">
        <button @click="triggerOpenMenu" class="btn-open-menu">
          <svg :class="{ 'hidden' : showMenu }" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M3.75 6.75H20.25M3.75 12H20.25M3.75 17.25H20.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg :class="{ 'hidden' : !showMenu }" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6L18 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="menu-mobile relative laptop:hidden flex flex-col justify-center items-center overflow-hidden">
      <nav class="nav-mobile flex flex-col justify-center items-center gap-6">
        <NuxtLink to="/personality-quiz" class="nav-mobile-item flex flex-row justify-center items-center gap-2">
          <span class="text-body-24px-bold text-white text-center">#ULTRAoddinary Type</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
        <NuxtLink to="/ar-photo-card" class="nav-mobile-item flex flex-row justify-center items-center gap-2">
          <span class="text-body-24px-bold text-white text-center">AR Photocard</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
        <NuxtLink to="/about" class="nav-mobile-item flex flex-row justify-center items-center gap-2">
          <span class="text-body-24px-bold text-white text-center">About</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>

        <div v-if="!['0', 0, 'false', false].includes(config.public.enablePhase2)">
          <ClientOnly>
            <button v-if="!auth?.isLogin" @click="triggerSignIn" class="nav-mobile-item flex flex-row justify-center items-center gap-2 px-5 py-4 rounded-[48px] bg-[#333333]">
              <span class="text-body-24px-bold text-white text-center">Masuk/Daftar</span>
            </button>
            <div v-else class="menu-profile-mobile relative w-full">
              <div class="p-4 bg-[#FBFAFF] w-full rounded-3xl overflow-y-auto">
                <div class="flex flex-row justify-start items-center gap-4">
                  <img :src="auth?.profile?.profile_photo || config?.public?.avatarURL + `images/user/profile_photo/icownic.png`" class="h-[72px] w-[72px] aspect-square object-cover rounded-2xl" width="72" height="72" alt="avatar" loading="lazy" />
                  <div class="flex flex-auto flex-col gap-2">
                    <p class="text-[#200AAE] text-body-24px-black">{{ auth.profile?.name }}</p>
                    <p class="text-[#200AAE] text-body-16px">{{ auth.profile?.email }}</p>
                  </div>
                </div>
    
                <NuxtLink to="/points" class="bg-[#E6E2FD] px-4 py-3 rounded-xl flex items-center gap-3 my-4">
                  <svg class="flex-none" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 36.3334C28.573 36.3334 36.3334 28.573 36.3334 19C36.3334 9.42707 28.573 1.66667 19 1.66667C9.42707 1.66667 1.66667 9.42707 1.66667 19C1.66667 28.573 9.42707 36.3334 19 36.3334Z" fill="#9A8BF9" stroke="#705BF6" stroke-width="2.66667"/>
                    <path d="M18.423 9.32222C18.6802 8.88071 19.318 8.88071 19.5752 9.32222L22.2996 13.9997C22.3938 14.1615 22.5516 14.2762 22.7345 14.3158L28.025 15.4614C28.5244 15.5695 28.7215 16.1762 28.3811 16.5572L24.7744 20.5937C24.6496 20.7332 24.5894 20.9188 24.6082 21.105L25.1535 26.4906C25.205 26.9989 24.6889 27.3738 24.2214 27.1678L19.2679 24.985C19.0966 24.9095 18.9015 24.9095 18.7302 24.985L13.7768 27.1678C13.3092 27.3738 12.7932 26.9989 12.8447 26.4906L13.3899 21.105C13.4088 20.9188 13.3485 20.7332 13.2238 20.5937L9.6171 16.5572C9.27666 16.1762 9.47376 15.5695 9.97313 15.4614L15.2636 14.3158C15.4465 14.2762 15.6044 14.1615 15.6986 13.9997L18.423 9.32222Z" fill="#FBFAFF"/>
                  </svg>
    
                  <div class="flex-auto">
                    <p class="text-[#200AAE] text-body-24px-black mb-2">{{ useThousandFormat(auth?.total_points || 0) }}</p>
                    <p class="text-[#200AAE] text-body-12px-black font-bold">ULTRAoddinary Points</p>
                  </div>
    
                  <div class="flex-none">
                    <svg class="w-5 h-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </NuxtLink>
    
                <NuxtLink to="/profile" class="flex flex-row items-center gap-2 px-3 py-3.5">
                  <svg class="flex-none" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99497 3.28333C8.06997 2.83167 8.46163 2.5 8.91997 2.5H11.0808C11.5391 2.5 11.9308 2.83167 12.0058 3.28333L12.1833 4.35083C12.2358 4.6625 12.4441 4.9225 12.7208 5.07583C12.7825 5.10917 12.8433 5.145 12.9041 5.18167C13.175 5.345 13.5041 5.39583 13.8 5.285L14.8141 4.905C15.022 4.82684 15.2508 4.82498 15.4599 4.89976C15.6689 4.97454 15.8447 5.1211 15.9558 5.31333L17.0358 7.18583C17.1467 7.37809 17.1858 7.60344 17.1461 7.8218C17.1064 8.04017 16.9906 8.23737 16.8191 8.37833L15.9833 9.0675C15.7391 9.26833 15.6183 9.57833 15.625 9.89417C15.6261 9.965 15.6261 10.0358 15.625 10.1067C15.6183 10.4217 15.7391 10.7317 15.9833 10.9325L16.82 11.6217C17.1733 11.9133 17.265 12.4175 17.0366 12.8133L15.955 14.6858C15.844 14.878 15.6685 15.0246 15.4596 15.0996C15.2507 15.1745 15.022 15.1729 14.8141 15.095L13.8 14.715C13.5041 14.6042 13.175 14.655 12.9033 14.8183C12.8429 14.8551 12.7818 14.8906 12.72 14.925C12.4441 15.0775 12.2358 15.3375 12.1833 15.6492L12.0058 16.7167C11.9308 17.1692 11.5391 17.5 11.0808 17.5H8.91913C8.4608 17.5 8.06997 17.1683 7.99413 16.7167L7.81663 15.6492C7.76497 15.3375 7.55663 15.0775 7.27997 14.9242C7.21818 14.8901 7.15705 14.8548 7.09663 14.8183C6.8258 14.655 6.49663 14.6042 6.19997 14.715L5.1858 15.095C4.97807 15.1729 4.74944 15.1747 4.54055 15.0999C4.33166 15.0251 4.15606 14.8787 4.04497 14.6867L2.96413 12.8142C2.85325 12.6219 2.81417 12.3966 2.85385 12.1782C2.89352 11.9598 3.00938 11.7626 3.1808 11.6217L4.01747 10.9325C4.2608 10.7325 4.38163 10.4217 4.3758 10.1067C4.3745 10.0358 4.3745 9.96499 4.3758 9.89417C4.38163 9.5775 4.2608 9.26833 4.01747 9.0675L3.1808 8.37833C3.00958 8.23741 2.89386 8.04036 2.85419 7.82219C2.81453 7.60401 2.85348 7.37884 2.96413 7.18667L4.04497 5.31417C4.15596 5.12178 4.33164 4.97505 4.54073 4.90011C4.74981 4.82518 4.97871 4.82691 5.18663 4.905L6.19997 5.285C6.49663 5.39583 6.8258 5.345 7.09663 5.18167C7.15663 5.145 7.2183 5.11 7.27997 5.075C7.55663 4.9225 7.76497 4.6625 7.81663 4.35083L7.99497 3.28333Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.663 7.5 11.2989 7.76339 11.7678 8.23223C12.2366 8.70107 12.5 9.33696 12.5 10Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span class="flex-auto text-body-16px-black">Pengaturan Profil</span>
                  <svg class="w-5 h-auto flex-none" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </NuxtLink>
    
                <button @click="handleLogout" class="flex flex-row items-center gap-2 px-3 py-3.5 w-full">
                  <svg class="flex-none" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.875 7.5V4.375C6.875 3.87772 7.07254 3.40081 7.42417 3.04917C7.77581 2.69754 8.25272 2.5 8.75 2.5H13.75C14.2473 2.5 14.7242 2.69754 15.0758 3.04917C15.4275 3.40081 15.625 3.87772 15.625 4.375V15.625C15.625 16.1223 15.4275 16.5992 15.0758 16.9508C14.7242 17.3025 14.2473 17.5 13.75 17.5H8.75C8.25272 17.5 7.77581 17.3025 7.42417 16.9508C7.07254 16.5992 6.875 16.1223 6.875 15.625V12.5M4.375 12.5L1.875 10M1.875 10L4.375 7.5M1.875 10H12.5" stroke="#680D2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span class="flex-auto text-body-16px-black text-[#680D2D] text-left">Keluar</span>
                </button>
              </div>
            </div>
          </ClientOnly>
        </div>
      </nav>
    </div>

    <template v-if="!['0', 0, 'false', false].includes(config.public.enablePhase2)">
      <FormLogin v-if="route?.query?.['sign-in']" />
      <FormRegister v-if="route?.query?.['register']" />
      <FormOTP v-if="route?.query?.['otp']" />
      <FormForgotPassword v-if="route?.query?.['forgot-password']" />
      <FormChangePhoneNumber v-if="route?.query?.['change-phone-number']" />
    </template>
  </header>
</template>

<style lang="scss">
.running-text {
  &-bg-overlay {
    height: 100%;
    background: linear-gradient(270deg, rgba(205, 255, 62, 0.00) 0%, #CDFF3E 100%);
    position: absolute;
    top: 0;
    z-index: 10;
  }
}

.header {
  &.open-menu-mobile {
    .menu-mobile {
      height: calc(100vmax - 48px - 72px);
    }
  }
}

.menu-mobile {
  height: 0;
  overflow: hidden;
  transition: height .4s ease-in-out;
}
</style>