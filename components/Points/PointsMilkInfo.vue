<script setup>
const props = defineProps(['closeInfo'])
</script>

<template>
  <div class="modal-container fixed top-0 left-0 bottom-0 right-0 w-screen h-screen px-6 laptop:px-0 overflow-hidden flex flex-row justify-center items-center backdrop-blur-sm bg-black/40 z-50">
    <div role="button" @click="$props.closeInfo" class="modal-outer w-full h-full absolute top-0 left-0 cursor-default"></div>
    <div class="modal-milkinfo relative w-full laptop:w-auto bg-[#CDFF3E] rounded-[32px] z-10 overflow-hidden">
      <button @click="$props.closeInfo" class="absolute top-6 right-6 z-10">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="16" fill="white"/>
          <path d="M10.667 21.3334L21.3337 10.6667M10.667 10.6667L21.3337 21.3334" stroke="black" stroke-width="1.77778" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="modal-milkinfo-container w-full laptop:w-[820px] mx-auto relative flex flex-row justify-center items-center">
        <div class="modal-milkinfo-wrap w-full flex flex-col laptop:flex-row justify-center items-center">
          <img src="/images/mistery-4.png" alt="Mistery" width="296" height="374" loading="lazy" class="w-full h-[170px] laptop:w-[296px] laptop:h-full object-cover">
          <div class="flex-1 p-5 laptop:p-6">
            <div class="relative w-full mb-5 laptop:mb-8">
              <p class="text-[20px] leading-[22px] laptop:text-[32px] laptop:leading-[43px] font-black text-black mb-3 laptop:mb-4">What is Milk Token?</p>
              <p class="text-body-16px text-[#333333]">Convertion point merupakan sistem di mana pengguna dapat mengkonversi ULTRAODDinary point menjadi ULTRAMILK point, Pengguna perlu bergabung dalam aktivitas untuk mendapatkan oddinary point, dan setiap oddinary point dapat dikonversi menjadi Ultramilk point.</p>
            </div>
            <div class="relative w-full">
              <p class="text-[20px] leading-[22px] laptop:text-[32px] laptop:leading-[43px] font-black text-black mb-3 laptop:mb-4">Point Information</p>
              <ul class="text-body-16px text-[#333333] list-disc pl-4">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>