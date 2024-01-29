<script setup>
import { useRuntimeConfig } from "nuxt/app"

const config = useRuntimeConfig()
</script>

<template>
  <footer class="footer pt-20 laptop:pt-[120px] pb-4">
    <div class="container mx-auto px-6 laptop:px-0">
      <div class="footer-social flex flex-col laptop:flex-row laptop:flex-wrap justify-center items-center gap-8 laptop:gap-4 mb-20">
        <NuxtLink to="https://www.tiktok.com/@ultramym?lang=en" target="_blank" class="flex flex-row justify-center items-center gap-3 laptop:gap-4">
          <svg class="w-auto h-6 laptop:h-8" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 16.491V31.0002C32 38.18 26.1798 44.0002 19 44.0002C11.8203 44.0002 6 38.18 6 31.0002C6 23.8204 11.8203 18.0002 19 18.0002C20.0326 18.0002 21.037 18.1206 22 18.3481V24.6738C21.0908 24.2418 20.0736 24.0002 19 24.0002C15.134 24.0002 12 27.1342 12 31.0002C12 34.8662 15.134 38.0002 19 38.0002C22.866 38.0002 26 34.8662 26 31.0002V4.00024H32C32 9.52308 36.4772 14.0002 42 14.0002V20.0002C38.2162 20.0002 34.7392 18.6868 32 16.491Z" fill="white"/>
          </svg>
          <span class="text-body-20px-black laptop:text-body-24px-black text-white uppercase">Tiktok</span>
        </NuxtLink>
        <div class="hidden laptop:block">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="4" fill="white"/>
          </svg>
        </div>
        <NuxtLink to="https://www.instagram.com/ultra_mym/?hl=en" target="_blank" class="flex flex-row justify-center items-center gap-3 laptop:gap-4">
          <svg class="w-auto h-6 laptop:h-8" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.002 18.0002C20.6872 18.0002 18.002 20.6864 18.002 24.0002C18.002 27.3148 20.6882 30.0002 24.002 30.0002C27.3166 30.0002 30.002 27.314 30.002 24.0002C30.002 20.6856 27.3158 18.0002 24.002 18.0002ZM24.002 14.0002C29.5228 14.0002 34.002 18.4744 34.002 24.0002C34.002 29.5212 29.5278 34.0002 24.002 34.0002C18.481 34.0002 14.002 29.526 14.002 24.0002C14.002 18.4793 18.4762 14.0002 24.002 14.0002ZM37.002 13.4985C37.002 14.8788 35.8804 15.9986 34.502 15.9986C33.1218 15.9986 32.002 14.877 32.002 13.4985C32.002 12.12 33.1234 11.0002 34.502 11.0002C35.8786 10.9985 37.002 12.12 37.002 13.4985ZM24.002 8.00024C19.053 8.00024 18.2464 8.01334 15.9445 8.11584C14.3763 8.18946 13.3251 8.40038 12.3483 8.77958C11.4803 9.11622 10.8542 9.5182 10.187 10.1853C9.51733 10.855 9.11607 11.4795 8.78079 12.3479C8.40071 13.3269 8.18985 14.3765 8.11755 15.9425C8.01405 18.1506 8.00195 18.9223 8.00195 24.0002C8.00195 28.9492 8.01505 29.7558 8.11753 32.0574C8.19119 33.625 8.40239 34.6778 8.78067 35.6522C9.11819 36.5214 9.52099 37.149 10.1849 37.813C10.8573 38.4844 11.4836 38.887 12.3437 39.219C13.3324 39.6012 14.383 39.8124 15.9442 39.8846C18.1524 39.988 18.9241 40.0002 24.002 40.0002C28.951 40.0002 29.7576 39.987 32.0592 39.8846C33.6234 39.8112 34.677 39.5994 35.654 39.2214C36.5208 38.8848 37.1504 38.4806 37.8148 37.8172C38.4872 37.1438 38.889 36.519 39.2214 35.6568C39.6026 34.6718 39.8142 33.6198 39.8864 32.058C39.9898 29.8498 40.002 29.078 40.002 24.0002C40.002 19.0513 39.9888 18.2447 39.8864 15.943C39.8128 14.3784 39.601 13.3232 39.2226 12.3466C38.8868 11.481 38.4834 10.8529 37.8168 10.1853C37.146 9.51454 36.5232 9.1141 35.6542 8.77908C34.676 8.39932 33.6248 8.18816 32.0596 8.11586C29.8516 8.01234 29.0798 8.00024 24.002 8.00024ZM24.002 4.00024C29.4352 4.00024 30.1136 4.02024 32.247 4.12024C34.3752 4.21858 35.827 4.55524 37.102 5.05024C38.4202 5.55858 39.5336 6.24524 40.6452 7.3569C41.7552 8.46858 42.442 9.58524 42.952 10.9002C43.4452 12.1736 43.782 13.6269 43.882 15.7552C43.977 17.8886 44.002 18.5669 44.002 24.0002C44.002 29.4336 43.982 30.1118 43.882 32.2452C43.7836 34.3736 43.4452 35.8252 42.952 37.1002C42.4436 38.4186 41.7552 39.5318 40.6452 40.6436C39.5336 41.7536 38.4152 42.4402 37.102 42.9502C35.827 43.4436 34.3752 43.7802 32.247 43.8802C30.1136 43.9752 29.4352 44.0002 24.002 44.0002C18.5686 44.0002 17.8903 43.9802 15.757 43.8802C13.6286 43.7818 12.1786 43.4436 10.902 42.9502C9.58527 42.4418 8.47027 41.7536 7.35861 40.6436C6.24695 39.5318 5.56195 38.4136 5.05195 37.1002C4.55695 35.8252 4.22195 34.3736 4.12195 32.2452C4.02695 30.1118 4.00195 29.4336 4.00195 24.0002C4.00195 18.5669 4.02195 17.8886 4.12195 15.7552C4.22027 13.6252 4.55695 12.1752 5.05195 10.9002C5.56027 9.58358 6.24695 8.46858 7.35861 7.3569C8.47027 6.24524 9.58695 5.56024 10.902 5.05024C12.177 4.55524 13.627 4.22024 15.757 4.12024C17.8903 4.02524 18.5686 4.00024 24.002 4.00024Z" fill="white"/>
          </svg>
          <span class="text-body-20px-black laptop:text-body-24px-black text-white uppercase">Instagram</span>
        </NuxtLink>
        <div class="hidden laptop:block">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="4" fill="white"/>
          </svg>
        </div>
        <NuxtLink to="https://twitter.com/ultramym?lang=en" target="_blank" class="flex flex-row justify-center items-center gap-3 laptop:gap-4">
          <svg class="w-auto h-6 laptop:h-8" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.4077 4.5H43.0237L28.5697 21.02L45.5737 43.5H32.2597L21.8317 29.866L9.89973 43.5H3.27973L18.7397 25.83L2.42773 4.5H16.0797L25.5057 16.962L36.4077 4.5ZM34.0857 39.54H37.7517L14.0877 8.252H10.1537L34.0857 39.54Z" fill="white"/>
          </svg>
          <span class="text-body-20px-black laptop:text-body-24px-black text-white uppercase">X (TWITTER)</span>
        </NuxtLink>
        <div class="hidden laptop:block">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="4" fill="white"/>
          </svg>
        </div>
        <NuxtLink to="https://id-id.facebook.com/ultramym/" target="_blank" class="flex flex-row justify-center items-center gap-3 laptop:gap-4">
          <svg class="w-auto h-6 laptop:h-8" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.502 27.0002H33.502L35.502 19.0002H28.502V15.0002C28.502 12.9415 28.502 11.0002 32.502 11.0002H35.502V4.28044C34.8506 4.19394 32.388 4.00024 29.7878 4.00024C24.3588 4.00024 20.502 7.31396 20.502 13.3997V19.0002H14.502V27.0002H20.502V44.0002H28.502V27.0002Z" fill="white"/>
          </svg>
          <span class="text-body-20px-black laptop:text-body-24px-black text-white uppercase">Facebook</span>
        </NuxtLink>
        <div class="hidden laptop:block">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="4" fill="white"/>
          </svg>
        </div>
        <NuxtLink to="https://bit.ly/IcownicDiscord" target="_blank" class="flex flex-row justify-center items-center gap-3 laptop:gap-4">
          <svg class="w-auto h-6 laptop:h-8" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.1068 10.6741C36.3688 9.42182 33.461 8.50916 30.4258 7.99976C30.0438 8.65774 29.6192 9.54918 29.322 10.2496C26.0938 9.78264 22.8888 9.78264 19.7051 10.2496C19.4079 9.54918 18.9622 8.65774 18.6014 7.99976C15.545 8.50916 12.6372 9.42182 9.9183 10.6741C4.42106 18.782 2.93532 26.6988 3.6782 34.5096C7.32886 37.1628 10.8522 38.7758 14.314 39.8372C15.163 38.691 15.9271 37.4598 16.5851 36.1652C15.3328 35.6982 14.1442 35.1252 12.9981 34.446C13.2952 34.2338 13.5924 34.0004 13.8683 33.7668C20.7876 36.9294 28.2822 36.9294 35.1164 33.7668C35.4136 34.0004 35.6896 34.2338 35.9868 34.446C34.8406 35.1252 33.652 35.6982 32.3998 36.1652C33.0578 37.4598 33.8218 38.691 34.6708 39.8372C38.1304 38.7758 41.675 37.1628 45.3066 34.5096C46.2192 25.468 43.8612 17.6147 39.1068 10.6741ZM17.5402 29.6916C15.4601 29.6916 13.7621 27.8026 13.7621 25.4892C13.7621 23.1756 15.4177 21.2866 17.5402 21.2866C19.6414 21.2866 21.3606 23.1756 21.3182 25.4892C21.3182 27.8026 19.6414 29.6916 17.5402 29.6916ZM31.4872 29.6916C29.407 29.6916 27.7068 27.8026 27.7068 25.4892C27.7068 23.1756 29.3646 21.2866 31.4872 21.2866C33.5884 21.2866 35.3076 23.1756 35.265 25.4892C35.265 27.8026 33.6096 29.6916 31.4872 29.6916Z" fill="white"/>
          </svg>
          <span class="text-body-20px-black laptop:text-body-24px-black text-white uppercase">Discord</span>
        </NuxtLink>
      </div>
      <div class="footer-info flex flex-col justify-center items-center">
        <NuxtLink to="/" class="logo inline-block mb-8">
          <img src="/images/Logo-UM-X-SKZ@2x.webp" alt="UltraMilk X StrayKids" width="160" height="56" loading="lazy" class="w-auto h-14">
        </NuxtLink>
        <p class="text-body-12px-black font-medium laptop:text-body-16px text-white text-center mb-8">©2023 P.T. ULTRAJAYA MILK INDUSTRY & TRADING COMPANY, TBK. All rights reserved.</p>
        <p class="text-body-12px-black font-medium laptop:text-body-16px text-white text-center mb-8">© JYP ENTERTAINMENT Co., Ltd. All rights reserved.</p>
        <div class="flex flex-row justify-center items-center gap-4 mb-8">
          <NuxtLink v-show="config?.public?.enablePhase2 === '1'" to="/terms-and-conditions" class="text-body-12px-black laptop:text-body-16px-black text-white underline underline-offset-4">Terms</NuxtLink>
          <NuxtLink v-show="config?.public?.enablePhase2 === '1'" to="/privacy-policy" class="text-body-12px-black laptop:text-body-16px-black text-white underline underline-offset-4">Privacy</NuxtLink>
          <NuxtLink v-show="config?.public?.enablePhase2 === '1'" to="/faq" class="text-body-12px-black laptop:text-body-16px-black text-white underline underline-offset-4">FAQ</NuxtLink>
          <NuxtLink to="https://www.icownicpatch.com/home" target="_blank" class="text-body-12px-black laptop:text-body-16px-black text-white underline underline-offset-4">Kembali ke icownicpatch.com</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer{
  background: linear-gradient(180deg, rgba(205, 255, 62, 0.00) 0%, rgba(205, 255, 62, 0.20) 100%);
}
</style>