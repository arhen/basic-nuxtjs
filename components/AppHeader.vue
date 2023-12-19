<script setup>

const showMenu = ref(false)

function triggerOpenMenu(){
  if(!showMenu.value){
    showMenu.value = true
    document.querySelector('.header').classList.add('open-menu-mobile')
    document.querySelector('body').classList.add('overflow-hidden')
  }else{
    showMenu.value = false
    document.querySelector('.header').classList.remove('open-menu-mobile')
    document.querySelector('body').classList.remove('overflow-hidden')
  }
}

onMounted(() => {
  document.querySelector('body').classList.remove('overflow-hidden')
})
</script>

<template>
  <header class="header fixed top-0 left-0 w-full bg-black z-50 overflow-hidden">
    <div class="running-text relative bg-[#CDFF3E] py-2 laptop:py-2 overflow-hidden">
      <Vue3Marquee :pause-on-hover="true" :clone="true">
        <p class="text-body-16px-bold laptop:text-body-20px-bold text-black mr-4">Cobain filter #ULTRAoddinary Type sekarang!</p>
        <NuxtLink to="/oddinary/personality-quiz" class="flex flex-row justify-center items-center gap-2 px-4 laptop:px-6 py-2 laptop:py-0 laptop:h-10 rounded-full bg-white mr-4">
          <span class="text-body-12px-black laptop:text-body-16px-black font-black text-black text-center uppercase">COBAIN SEKARANG</span>
          <svg class="w-auto h-4 laptop:h-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </Vue3Marquee>
      <div class="running-text-bg-overlay w-14 laptop:w-28 left-0"></div>
      <div class="running-text-bg-overlay w-14 laptop:w-28 right-0 rotate-180"></div>
    </div>
    <div class="navbar relative flex flex-row justify-between items-center p-4 laptop:py-4 laptop:px-[120px]">
      <NuxtLink to="/oddinary" class="logo inline-block">
        <img src="/images/Logo-UM-X-SKZ@2x.webp" alt="UltraMilk X StrayKids" width="136" height="40" loading="lazy" class="w-auto h-10">
      </NuxtLink>
      <nav class="hidden laptop:flex flex-row justify-center items-center gap-8">
        <NuxtLink to="/oddinary/personality-quiz" class="flex flex-row justify-center items-center gap-2">
          <span class="text-body-16px-bold text-white text-center">#ULTRAoddinary Type</span>
          <svg class="w-5 h-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
        <NuxtLink to="/oddinary/about" class="flex flex-row justify-center items-center gap-2">
          <span class="text-body-16px-bold text-white text-center">About</span>
          <svg class="w-5 h-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </nav>
      <div class="inline-block laptop:hidden">
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
        <NuxtLink to="/oddinary/personality-quiz" class="nav-mobile-item flex flex-row justify-center items-center gap-2">
          <span class="text-body-24px-bold text-white text-center">#ULTRAoddinary Type</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
        <NuxtLink to="/oddinary/about" class="nav-mobile-item flex flex-row justify-center items-center gap-2">
          <span class="text-body-24px-bold text-white text-center">About</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
.running-text{
  &-bg-overlay{
    height: 100%;
    background: linear-gradient(270deg, rgba(205, 255, 62, 0.00) 0%, #CDFF3E 100%);
    position: absolute;
    top: 0;
    z-index: 10;
  }
}
.header{
  &.open-menu-mobile{
    .menu-mobile{
      height: calc(100vmax - 48px - 72px);
    }
  }
}
.menu-mobile{
  height: 0;
  overflow: hidden;
  transition: height .4s ease-in-out;
}
</style>