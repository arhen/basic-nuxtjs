<script setup>
import MilkInfo from "./PointsMilkInfo.vue";

const router = useRouter()
const { auth } = useAuthStore()
const profile = ref('')
const historys = ref('')
const isMilkInfo = ref(false)
const isConvertReady = ref(false)
const currentPage = ref(1)

const pageCount = computed(() => {
  return Math.ceil(historys.value.total / historys.value.per_page)
})

const pages = computed(() => {
  return Array.from({ length: pageCount.value }, (_, i) => i + 1);
});

const resHistory = await useFetchApi('/api/profile/history-points', {
  method: 'GET',
  lazy: true,
  server: false
})

watch(resHistory.status, async () => {
  if (resHistory.status.value === 'success') {
    historys.value = resHistory.data.value.data
  }
}, {immediate: true});

async function changePage(pageNumber) {
  currentPage.value = pageNumber;
  const response = await useFetchApi(`/api/profile/history-points?page=${currentPage.value}`)
  historys.value = response.data.value.data
}

async function prev(){
  currentPage.value = currentPage.value - 1
  const response = await useFetchApi(`/api/profile/history-points?page=${currentPage.value}`)
  historys.value = response.data.value.data
}

async function next(){
  currentPage.value = currentPage.value + 1
  const response = await useFetchApi(`/api/profile/history-points?page=${currentPage.value}`)
  historys.value = response.data.value.data
}

function showMilkInfo(){
  isMilkInfo.value = true
}

function closeMilkInfo(){
  isMilkInfo.value = false
}

if(!auth.value?.isLogin){
  router.push({ path: "/" })
}

const resLeaderboard = await useFetchApi('/api/leaderboard?limit=3', {
  method: 'GET',
  lazy: true,
  server: false
})

watch(resLeaderboard.status, async () => {
  if (resLeaderboard.status.value === 'success') {
    profile.value = resLeaderboard.data.value.data[resLeaderboard.data.value.data.length - 1]
  }
}, {immediate: true});
</script>

<template>
  <section class="points-overview relative">
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
      <img src="/images/skz-element-8.svg" alt="Element" width="53" height="53" loading="lazy" class="w-[53px] h-auto laptop:w-[125px] rotate-[15deg] absolute top-0 right-[5%] laptop:top-10 laptop:right-10">
      <img src="/images/skz-element-9.svg" alt="Element" width="96" height="96" loading="lazy" class="w-[96px] h-auto laptop:w-[244px] absolute top-[12%] left-[0%] laptop:top-[18%] laptop:left-0">
      <img src="/images/skz-element-1.svg" alt="Element" width="160" height="160" loading="lazy" class="w-[160px] h-auto laptop:w-[185px] absolute bottom-[-1%] right-[-15%] laptop:bottom-[3%] laptop:right-[1%]">
    </div>
    <div class="points-overview-container container mx-auto px-6 laptop:px-0 py-12 laptop:py-[120px] relative z-10">
      <div class="mb-20 pointer-events-none">
        <img src="/images/text-ultraoddinary-points.svg" alt="UltraOddinary Points" width="950" height="198" class="w-full h-auto hidden laptop:block" />
        <img src="/images/text-ultraoddinary-points--m.svg" alt="UltraOddinary Points" width="312" height="107" class="w-full h-auto block laptop:hidden" />
      </div>
      <div class="points-overview-wrap flex flex-col laptop:flex-row gap-8">
        <div class="w-full laptop:w-[386px] rounded-[24px] laptop:rounded-[48px] relative">
          <div class="points-overview-profile card bg-[#705BF6] p-4 laptop:p-2 rounded-[24px] laptop:rounded-[48px] flex flex-row laptop:flex-col justify-start items-center gap-2 laptop:gap-4">
            <div class="w-auto laptop:w-full rounded-[24px] laptop:rounded-[48px] overflow-hidden">
              <img :src="profile.profile_photo" class="w-[87px] laptop:w-full aspect-square laptop:aspect-[185/172] object-cover" width="72" height="72" alt="avatar" loading="lazy" />
            </div>
            <div class="px-2 laptop:px-4 laptop:py-3 w-full">
              <p class="text-body-16px laptop:text-body-24px-bold laptop:leading-[32px] text-[#CCCCCC] mb-3 laptop:mb-0">Point Saya</p>
              <div class="flex flex-row justify-start items-center gap-2 laptop:gap-6">
                <svg class="w-[38px] h-auto laptop:w-[66px]" width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33 63.3334C49.7527 63.3334 63.3334 49.7527 63.3334 33C63.3334 16.2474 49.7527 2.66666 33 2.66666C16.2474 2.66666 2.66666 16.2474 2.66666 33C2.66666 49.7527 16.2474 63.3334 33 63.3334Z" fill="#9A8BF9" stroke="#705BF6" stroke-width="4.66667"/>
                  <path d="M31.9908 16.064C32.4409 15.2913 33.5571 15.2913 34.0071 16.064L38.7748 24.2497C38.9397 24.5327 39.2159 24.7334 39.536 24.8027L48.7944 26.8076C49.6683 26.9968 50.0132 28.0584 49.4174 28.7251L43.1057 35.789C42.8875 36.0333 42.7819 36.358 42.8149 36.6839L43.7692 46.1086C43.8593 46.9982 42.9562 47.6543 42.138 47.2938L33.4694 43.4738C33.1697 43.3417 32.8282 43.3417 32.5285 43.4738L23.8599 47.2938C23.0417 47.6543 22.1387 46.9982 22.2287 46.1086L23.183 36.6839C23.216 36.358 23.1105 36.0333 22.8922 35.789L16.5805 28.7251C15.9847 28.0584 16.3297 26.9968 17.2036 26.8076L26.4619 24.8027C26.782 24.7334 27.0583 24.5327 27.2231 24.2497L31.9908 16.064Z" fill="#FBFAFF"/>
                </svg>
                <p class="text-[24px] font-black laptop:text-body-40px-black leading-[32px] laptop:leading-[54px] text-[#FBFAFF] laptop:mt-3">{{ useThousandFormat(profile.total_points || 0) }} pts</p>
              </div>
            </div>
          </div>
          <div v-if="isConvertReady" class="points-overfiew-token p-4 laptop:p-2">
            <div class="p-2 laptop:px-4 laptop:py-8">
              <div class="flex flex-row items-center mb-3">
                <p class="text-body-16px laptop:text-body-24px-bold laptop:leading-[32px] text-[#CCCCCC] mr-2">Milk Token</p>
                <div role="button" @click="showMilkInfo">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4ZM11.99 10C12.548 10 13 10.452 13 11.01V16.134C13.1906 16.2441 13.3396 16.414 13.4238 16.6173C13.5081 16.8207 13.5229 17.0462 13.4659 17.2588C13.4089 17.4714 13.2834 17.6593 13.1087 17.7933C12.9341 17.9273 12.7201 18 12.5 18H12.01C11.8774 18 11.746 17.9739 11.6235 17.9231C11.501 17.8724 11.3896 17.798 11.2958 17.7042C11.202 17.6104 11.1276 17.499 11.0769 17.3765C11.0261 17.254 11 17.1226 11 16.99V12C10.7348 12 10.4804 11.8946 10.2929 11.7071C10.1054 11.5196 10 11.2652 10 11C10 10.7348 10.1054 10.4804 10.2929 10.2929C10.4804 10.1054 10.7348 10 11 10H11.99ZM12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289C12.8946 7.48043 13 7.73478 13 8C13 8.26522 12.8946 8.51957 12.7071 8.70711C12.5196 8.89464 12.2652 9 12 9C11.7348 9 11.4804 8.89464 11.2929 8.70711C11.1054 8.51957 11 8.26522 11 8C11 7.73478 11.1054 7.48043 11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#CCCCCC"/>
                  </svg>
                </div>
              </div>
              <div class="flex flex-row justify-between items-center">
                <p class="text-[24px] font-black laptop:text-body-32px-bold leading-[32px] laptop:leading-normal text-[#FBFAFF]">100 pts</p>
                <button class="bg-white px-4 h-8 laptop:h-12 flex flex-col justify-center text-black text-body-14px font-black leading-none laptop:text-body-20px-black rounded-full">Convert </button>
              </div>
            </div>
          </div>
          <div class="absolute -top-6 laptop:top-[-30px] left-[-6px] laptop:left-[-26px] inline-block">
            <svg class="w-[50px] h-auto laptop:w-[147px]" width="147" height="147" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_2807_254)">
              <path d="M67.9013 1.14121C69.6868 -0.380402 72.313 -0.380405 74.0985 1.14121L91.7609 16.193C92.526 16.845 93.4774 17.2391 94.4795 17.3191L117.612 19.165C119.95 19.3517 121.807 21.2086 121.994 23.5471L123.84 46.6795C123.92 47.6816 124.314 48.633 124.966 49.3981L140.018 67.0605C141.539 68.846 141.539 71.4722 140.018 73.2577L124.966 90.9201C124.314 91.6852 123.92 92.6366 123.84 93.6387L121.994 116.771C121.807 119.11 119.95 120.967 117.612 121.153L94.4795 122.999C93.4774 123.079 92.526 123.473 91.7609 124.125L74.0985 139.177C72.313 140.699 69.6868 140.699 67.9013 139.177L50.2389 124.125C49.4738 123.473 48.5225 123.079 47.5204 122.999L24.3879 121.153C22.0494 120.967 20.1925 119.11 20.0059 116.771L18.1599 93.6387C18.0799 92.6366 17.6859 91.6852 17.0338 90.9201L1.98203 73.2577C0.460419 71.4722 0.460415 68.846 1.98203 67.0605L17.0338 49.3981C17.6859 48.633 18.0799 47.6816 18.1599 46.6795L20.0059 23.5471C20.1925 21.2086 22.0494 19.3517 24.3879 19.165L47.5203 17.3191C48.5224 17.2391 49.4738 16.845 50.2389 16.193L67.9013 1.14121Z" fill="#F4BC3A"/>
              </g>
              <defs>
              <filter id="filter0_d_2807_254" x="0" y="0" width="147.727" height="146.727" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="5.72727" dy="5.72727"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2807_254"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2807_254" result="shape"/>
              </filter>
              </defs>
            </svg>
            <div class="absolute top-1.5 laptop:top-6 left-1/2 -translate-x-1/2">
              <p class="text-[#5C4205] text-[12px] laptop:text-[28px] leading-normal font-normal text-center">Rank</p>
              <p class="text-[#5C4205] text-[20px] laptop:text-[52px] leading-normal font-bold text-center -translate-y-2 laptop:-translate-y-5">{{ profile.rank || `-` }}</p>
            </div>
          </div>
        </div>
        <div class="points-overview-history flex flex-col flex-1 px-4 py-6 laptop:px-9 laptop:py-8 rounded-[32px] bg-white/10 backdrop-blur-[48px]">
          <h2 class="text-body-24px-bold laptop:text-body-32px-bold font-black text-white mb-8">Riwayat Points</h2>
          <ul class="points-overview-history-list w-full flex flex-col justify-start items-start gap-6 laptop:gap-8">
            <li class="w-full flex flex-row justify-between items-center text-white">
              <p class="text-body-14px flex-1 mr-auto">Deskripsi</p>
              <p class="hidden laptop:block text-body-14px laptop:w-[100px] laptop:ml-10 laptop:mr-40">Tanggal</p>
              <p class="text-body-14px laptop:w-[120px]">Total Points</p>
            </li>
            <li v-for="(history, index) in historys.data" :key="`${history.id}--${index}`" class="w-full flex flex-row justify-start items-center">
              <div class="flex-1 mr-4 laptop:mr-auto">
                <div v-if="history.type === 'add'" class="flex flex-row justify-start items-start laptop:items-center gap-2">
                  <svg class="w-[22px] h-auto laptop:w-10" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="#705BF6"/>
                    <path d="M20 12.5V27.5M27.5 20H12.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div class="flex flex-col">
                    <p class="text-body-16px-bold text-white">{{ history.activity }}</p>
                    <p class="block laptop:hidden text-body-12px-black font-bold laptop:text-body-16px-bold text-[#CCCCCC]">{{ useDateFormat(history.created_at) }}</p>
                  </div>
                </div>
                <div v-else class="flex flex-row justify-start items-start laptop:items-center gap-2">
                  <svg class="w-[22px] h-auto laptop:w-10" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="#EA578A"/>
                    <path d="M15.5 29L11 24.5M11 24.5L15.5 20M11 24.5H24.5M24.5 11L29 15.5M29 15.5L24.5 20M29 15.5H15.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div class="flex flex-col">
                    <p class="text-body-16px-bold text-white">{{ history.activity }}</p>
                    <p class="block laptop:hidden text-body-12px-black font-bold laptop:text-body-16px-bold text-[#CCCCCC]">{{ useDateFormat(history.created_at) }}</p>
                  </div>
                </div>
              </div>
              <div class="hidden laptop:block laptop:w-[100px] laptop:ml-10 laptop:mr-40">
                <p class="text-body-16px-bold text-[#CCCCCC]">{{ useDateFormat(history.created_at) }}</p>
              </div>
              <div class="w-20 laptop:w-[120px] h-7 laptop:h-9 bg-[#FBFAFF] rounded-xl flex flex-col justify-center">
                <p :class="{ 'text-[#17077E]' : history.type === 'add', 'text-[#680D2D]' : history.type === 'convert' }" class="text-body-14px font-bold laptop:text-body-16px-bold text-center">{{ history.type === 'add' ? `+` : `-` }} {{ history.point }}</p>
              </div>
            </li>
          </ul>
          <div v-show="pages.length > 1" class="points-overview-history-pagination flex flex-row justify-between items-center mt-12">
            <button @click="prev" :disabled="currentPage === 1" class="disabled:opacity-60">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="12" fill="white" fill-opacity="0.1"/>
                <path d="M23.75 27.5L16.25 20L23.75 12.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="flex flex-row justify-center items-center gap-4">
              <button v-for="page in pages" :key="page" @click="changePage(page)" :class="{ 'current-page': page === currentPage }" class="w-10 h-10 flex flex-row justify-center items-center rounded-xl bg-transparent text-body-16px laptop:text-body-20px-bold text-white text-center">{{ page }}</button>
            </div>
            <button @click="next" :disabled="currentPage === pages.length" class="disabled:opacity-60">
              <svg class="rotate-180" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="12" fill="white" fill-opacity="0.1"/>
                <path d="M23.75 27.5L16.25 20L23.75 12.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <MilkInfo v-if="isMilkInfo" :closeInfo="closeMilkInfo"/>
  </section>
</template>

<style lang="scss" scoped>
.points-overview-history-pagination{
  .current-page{
    background-color: #CDFF3E;
    color: black;
  }
}
</style>