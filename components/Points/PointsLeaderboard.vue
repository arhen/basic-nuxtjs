<script setup>
const { auth, setAuth } = useAuthStore()

const leaderboard = ref('')
const user = ref('')
const listLeaderboard = ref('')
const listToShow = ref(10)

const resLeaderboard = await useFetchApi(`/api/leaderboard?limit=${listToShow.value}`, {
  method: 'GET',
  lazy: true,
  server: false
})

watch(resLeaderboard.status, async () => {
  if (resLeaderboard.status.value === 'success') {
    listLeaderboard.value = resLeaderboard.data.value.data.slice(3)
    if(auth.value.isLogin){
      leaderboard.value = resLeaderboard.data.value.data.slice(0, 4)
      user.value = resLeaderboard.data.value.data[resLeaderboard.data.value.data.length - 1]
    }else{
      leaderboard.value = resLeaderboard.data.value.data.slice(0, 3)
    }
    setAuth({ total_points: resLeaderboard.data.value.meta.total_points })
  }
}, {immediate: true});

const getLeaderboardOnScroll = async () => {
  let skip = listToShow.value
  listToShow.value = listToShow.value + 10
  const newList = await useFetchApi(`/api/leaderboard?limit=${listToShow.value}`, { method: 'GET' })
  listLeaderboard.value.push(...newList.data.value.data.slice(skip))
}

onMounted(() => {
  const listElm = document.querySelector('#listEl');
  if(listElm){
    listElm.addEventListener('scroll', e => {
      if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        getLeaderboardOnScroll()
      }
    });
  }
})
</script>

<template>
  <section class="points-leaderboard relative" v-show="leaderboard.length > 0">
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
      <img src="/images/skz-element-4.svg" alt="Element" width="188" height="188" loading="lazy" class="hidden laptop:block h-auto w-[188px] rotate-[270deg] absolute top-[17%] right-0">
      <img src="/images/skz-element-6.svg" alt="Element" width="160" height="160" loading="lazy" class="hidden laptop:block h-auto w-[160px] absolute top-[74%] left-0">
      <img src="/images/skz-element-3.svg" alt="Element" width="100" height="100" loading="lazy" class="w-[100px] h-auto laptop:w-[200px] rotate-[-30deg] absolute top-[0] left-[-11%] laptop:top-[50%] laptop:left-[9%]">
      <img src="/images/skz-element-5.svg" alt="Element" width="80" height="80" loading="lazy" class="w-[80px] h-auto laptop:w-[130px] absolute top-[22%] right-[-5%] laptop:top-0 laptop:left-[1%] laptop:right-[unset]">
      <img src="/images/skz-element-7.svg" alt="Element" width="240" height="240" loading="lazy" class="w-[240px] h-auto laptop:w-[420px] absolute top-[50%] right-[-40%] laptop:top-[65%] laptop:right-[1%]">
    </div>
    <div class="container mx-auto px-6 laptop:px-0 py-16 laptop:py-[120px]">
      <div class="mb-2 laptop:mb-20 pointer-events-none">
        <img src="/images/text-ultraoddinary-leaderboard.svg" alt="UltraOddinary Leaderboard" width="983" height="224" class="w-full h-auto laptop:w-auto mx-auto" />
        <p class="text-body-14px laptop:text-body-20px leading-normal text-[#CCCCCC] text-center max-w-[610px] mx-auto mt-6">Kumpulin terus poinmu, jangan sampai ketinggalan! Karena setiap minggu akan ada beragam hadiah menarik dari Ultra Milk X Stray Kids untuk tiga urutan teratas.</p>
      </div>
      <div class="points-leaderboard-top flex flex-row justify-center items-start py-6 laptop:pt-6 laptop:pb-12 mb-8 laptop:mb-20 overflow-hidden">
        <template v-if="auth.isLogin">
          <div v-for="(item, index) in leaderboard.slice(0, -1)" :key="index" :class="[ `points-leaderboard-top-` + (index+1)]">
            <div class="card w-[100px] laptop:w-[360px] rounded-xl laptop:rounded-[48px] relative">
              <div class="card-wrap p-1 laptop:p-2 rounded-xl laptop:rounded-[48px]">
                <div class="w-full rounded-xl laptop:rounded-[48px] mb-1 laptop:mb-4 overflow-hidden">
                  <img :src="item.profile_photo" class="w-full aspect-[1/1] object-cover" width="344" height="344" alt="avatar" loading="lazy" />
                </div>
                <div class="px-1 laptop:px-4 mb-1 laptop:mb-8">
                  <p class="card-name text-[13px] laptop:text-[48px] leading-[18px] laptop:leading-[64px] font-bold capitalize">{{ item.name.split(' ')[0] }}</p>
                  <p class="card-user text-[7px] leading-[9px] laptop:text-[24px] laptop:leading-[32px] font-bold" v-text="item.instagram ? `@${item.instagram}` : ''"></p>
                </div>
              </div>
              <div class="card-point flex flex-row justify-center items-center gap-1 laptop:gap-2 py-1 laptop:py-3">
                <svg class="w-2 h-auto laptop:w-[38px]" width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5 36.1037C29.073 36.1037 36.8334 28.3432 36.8334 18.7703C36.8334 9.19734 29.073 1.43693 19.5 1.43693C9.92707 1.43693 2.16666 9.19734 2.16666 18.7703C2.16666 28.3432 9.92707 36.1037 19.5 36.1037Z" fill="#9A8BF9" stroke="#705BF6" stroke-width="2.66667"/>
                  <path d="M18.9234 9.09233C19.1805 8.65082 19.8184 8.65082 20.0755 9.09233L22.7999 13.7699C22.8941 13.9316 23.052 14.0463 23.2349 14.0859L28.5254 15.2315C29.0248 15.3397 29.2219 15.9463 28.8814 16.3273L25.2747 20.3638C25.15 20.5034 25.0897 20.6889 25.1086 20.8751L25.6539 26.2607C25.7053 26.7691 25.1893 27.144 24.7218 26.9379L19.7683 24.7551C19.597 24.6796 19.4019 24.6796 19.2306 24.7551L14.2771 26.9379C13.8096 27.144 13.2936 26.7691 13.345 26.2607L13.8903 20.8751C13.9092 20.6889 13.8489 20.5034 13.7242 20.3638L10.1175 16.3273C9.77703 15.9463 9.97413 15.3397 10.4735 15.2315L15.764 14.0859C15.9469 14.0463 16.1048 13.9316 16.199 13.7699L18.9234 9.09233Z" fill="#FBFAFF"/>
                </svg>
                <p class="text-[9px] leading-3 laptop:text-[32px] laptop:leading-[43px] font-bold">{{ useThousandFormat(item.total_points || 0) }} pts</p>
              </div>
              <div class="absolute top-1.5 left-1.5 laptop:top-5 laptop:left-5 inline-block">
                <svg class="w-6 h-6 laptop:w-[88px] laptop:h-[88px]" width="147" height="147" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_2807_254)">
                    <path class="icon-rank" d="M67.9013 1.14121C69.6868 -0.380402 72.313 -0.380405 74.0985 1.14121L91.7609 16.193C92.526 16.845 93.4774 17.2391 94.4795 17.3191L117.612 19.165C119.95 19.3517 121.807 21.2086 121.994 23.5471L123.84 46.6795C123.92 47.6816 124.314 48.633 124.966 49.3981L140.018 67.0605C141.539 68.846 141.539 71.4722 140.018 73.2577L124.966 90.9201C124.314 91.6852 123.92 92.6366 123.84 93.6387L121.994 116.771C121.807 119.11 119.95 120.967 117.612 121.153L94.4795 122.999C93.4774 123.079 92.526 123.473 91.7609 124.125L74.0985 139.177C72.313 140.699 69.6868 140.699 67.9013 139.177L50.2389 124.125C49.4738 123.473 48.5225 123.079 47.5204 122.999L24.3879 121.153C22.0494 120.967 20.1925 119.11 20.0059 116.771L18.1599 93.6387C18.0799 92.6366 17.6859 91.6852 17.0338 90.9201L1.98203 73.2577C0.460419 71.4722 0.460415 68.846 1.98203 67.0605L17.0338 49.3981C17.6859 48.633 18.0799 47.6816 18.1599 46.6795L20.0059 23.5471C20.1925 21.2086 22.0494 19.3517 24.3879 19.165L47.5203 17.3191C48.5224 17.2391 49.4738 16.845 50.2389 16.193L67.9013 1.14121Z" fill="current"/>
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
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <p class="card-rank text-[12px] laptop:text-[56px] leading-none font-bold text-center laptop:pb-2">{{ item.rank }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div v-for="(item, index) in leaderboard" :key="index" :class="[ `points-leaderboard-top-` + (index+1)]">
            <div class="card w-[100px] laptop:w-[360px] rounded-xl laptop:rounded-[48px] relative">
              <div class="card-wrap p-1 laptop:p-2 rounded-xl laptop:rounded-[48px]">
                <div class="w-full rounded-xl laptop:rounded-[48px] mb-1 laptop:mb-4 overflow-hidden">
                  <img :src="item.profile_photo" class="w-full aspect-[1/1] object-cover" width="344" height="344" alt="avatar" loading="lazy" />
                </div>
                <div class="px-1 laptop:px-4 mb-1 laptop:mb-8">
                  <p class="card-name text-[13px] laptop:text-[48px] leading-[18px] laptop:leading-[64px] font-bold capitalize">{{ item.name.split(' ')[0] }}</p>
                  <p class="card-user text-[7px] leading-[9px] laptop:text-[24px] laptop:leading-[32px] font-bold" v-text="item.instagram ? `@${item.instagram}` : ''"></p>
                </div>
              </div>
              <div class="card-point flex flex-row justify-center items-center gap-1 laptop:gap-2 py-1 laptop:py-3">
                <svg class="w-2 h-auto laptop:w-[38px]" width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5 36.1037C29.073 36.1037 36.8334 28.3432 36.8334 18.7703C36.8334 9.19734 29.073 1.43693 19.5 1.43693C9.92707 1.43693 2.16666 9.19734 2.16666 18.7703C2.16666 28.3432 9.92707 36.1037 19.5 36.1037Z" fill="#9A8BF9" stroke="#705BF6" stroke-width="2.66667"/>
                  <path d="M18.9234 9.09233C19.1805 8.65082 19.8184 8.65082 20.0755 9.09233L22.7999 13.7699C22.8941 13.9316 23.052 14.0463 23.2349 14.0859L28.5254 15.2315C29.0248 15.3397 29.2219 15.9463 28.8814 16.3273L25.2747 20.3638C25.15 20.5034 25.0897 20.6889 25.1086 20.8751L25.6539 26.2607C25.7053 26.7691 25.1893 27.144 24.7218 26.9379L19.7683 24.7551C19.597 24.6796 19.4019 24.6796 19.2306 24.7551L14.2771 26.9379C13.8096 27.144 13.2936 26.7691 13.345 26.2607L13.8903 20.8751C13.9092 20.6889 13.8489 20.5034 13.7242 20.3638L10.1175 16.3273C9.77703 15.9463 9.97413 15.3397 10.4735 15.2315L15.764 14.0859C15.9469 14.0463 16.1048 13.9316 16.199 13.7699L18.9234 9.09233Z" fill="#FBFAFF"/>
                </svg>
                <p class="text-[9px] leading-3 laptop:text-[32px] laptop:leading-[43px] font-bold">{{ useThousandFormat(item.total_points || 0) }} pts</p>
              </div>
              <div class="absolute top-1.5 left-1.5 laptop:top-5 laptop:left-5 inline-block">
                <svg class="w-6 h-6 laptop:w-[88px] laptop:h-[88px]" width="147" height="147" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_2807_254)">
                    <path class="icon-rank" d="M67.9013 1.14121C69.6868 -0.380402 72.313 -0.380405 74.0985 1.14121L91.7609 16.193C92.526 16.845 93.4774 17.2391 94.4795 17.3191L117.612 19.165C119.95 19.3517 121.807 21.2086 121.994 23.5471L123.84 46.6795C123.92 47.6816 124.314 48.633 124.966 49.3981L140.018 67.0605C141.539 68.846 141.539 71.4722 140.018 73.2577L124.966 90.9201C124.314 91.6852 123.92 92.6366 123.84 93.6387L121.994 116.771C121.807 119.11 119.95 120.967 117.612 121.153L94.4795 122.999C93.4774 123.079 92.526 123.473 91.7609 124.125L74.0985 139.177C72.313 140.699 69.6868 140.699 67.9013 139.177L50.2389 124.125C49.4738 123.473 48.5225 123.079 47.5204 122.999L24.3879 121.153C22.0494 120.967 20.1925 119.11 20.0059 116.771L18.1599 93.6387C18.0799 92.6366 17.6859 91.6852 17.0338 90.9201L1.98203 73.2577C0.460419 71.4722 0.460415 68.846 1.98203 67.0605L17.0338 49.3981C17.6859 48.633 18.0799 47.6816 18.1599 46.6795L20.0059 23.5471C20.1925 21.2086 22.0494 19.3517 24.3879 19.165L47.5203 17.3191C48.5224 17.2391 49.4738 16.845 50.2389 16.193L67.9013 1.14121Z" fill="current"/>
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
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <p class="card-rank text-[12px] laptop:text-[56px] leading-none font-bold text-center laptop:pb-2">{{ item.rank }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div v-show="listLeaderboard.length > 1" class="points-leaderboard-list relative max-w-full laptop:max-w-[820px] max-h-[620px] laptop:max-h-[930px] mx-auto bg-white/10 backdrop-blur-[48px] rounded-[32px] overflow-auto">
        <div class="flex flex-col justify-start items-start gap-4 laptop:gap-8 p-4 laptop:p-8">
          <template v-if="auth.isLogin">
            <div id="listEl" class="relative w-full flex flex-col justify-start items-start gap-6 laptop:gap-8" :class="{ 'h-[600px] laptop:h-[800px] overflow-y-scroll' : listLeaderboard.length > 10 }">
              <div v-for="(item, index) in listLeaderboard.slice(0, -1)" :key="item" class="points-leaderboard-list-item w-full flex flex-row justify-start items-center gap-3 laptop:gap-8">
                <div class="relative w-[30px] h-[30px] laptop:w-14 laptop:h-14">
                  <svg class="w-full h-auto" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.7892 1.07232C27.4869 0.477764 28.5131 0.477764 29.2108 1.07232L36.1122 6.95369C36.4112 7.20847 36.7829 7.36245 37.1745 7.39369L46.2133 8.115C47.127 8.18791 47.8526 8.91351 47.9255 9.82726L48.6468 18.8661C48.6781 19.2576 48.8321 19.6294 49.0868 19.9283L54.9682 26.8298C55.5628 27.5275 55.5628 28.5536 54.9682 29.2513L49.0868 36.1527C48.8321 36.4517 48.6781 36.8234 48.6468 37.215L47.9255 46.2538C47.8526 47.1675 47.127 47.8931 46.2133 47.9661L37.1745 48.6874C36.7829 48.7186 36.4112 48.8726 36.1122 49.1274L29.2108 55.0087C28.5131 55.6033 27.4869 55.6033 26.7892 55.0087L19.8878 49.1274C19.5888 48.8726 19.2171 48.7186 18.8255 48.6874L9.78673 47.9661C8.87298 47.8931 8.14739 47.1675 8.07447 46.2538L7.35317 37.215C7.32192 36.8234 7.16795 36.4517 6.91316 36.1527L1.0318 29.2513C0.437237 28.5536 0.437237 27.5275 1.0318 26.8298L6.91316 19.9283C7.16795 19.6294 7.32192 19.2576 7.35317 18.8661L8.07447 9.82726C8.14739 8.91351 8.87298 8.18791 9.78673 8.115L18.8255 7.39369C19.2171 7.36245 19.5888 7.20847 19.8878 6.95369L26.7892 1.07232Z" fill="white"/>
                  </svg>
                  <p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[13px] laptop:text-[24px] leading-[18px] laptop:leading-[32px] font-bold text-[#17077E]">{{ item.rank }}</p>
                </div>
                <img :src="item.profile_photo" class="w-9 laptop:w-20 aspect-[1/1] object-cover rounded-lg laptop:rounded-2xl" width="80" height="80" alt="avatar" loading="lazy" />
                <div class="flex flex-col justify-start items-start gap-0.5 laptop:gap-2">
                  <p class="text-[#FFFFFF] text-[16px] leading-[21px] laptop:text-[32px] laptop:leading-[43px] font-bold">{{ item.name.split(' ')[0] }}</p>
                  <p class="text-[#CCCCCC] text-[12px] leading-[16px] laptop:text-[24px] laptop:leading-[32px] font-bold" v-text="item.instagram ? `@${item.instagram}` : ''"></p>
                </div>
                <div class="flex flex-row items-center gap-3 ml-auto">
                  <svg class="w-4 h-auto laptop:w-[38px]" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 36.3739C28.573 36.3739 36.3334 28.6135 36.3334 19.0406C36.3334 9.4676 28.573 1.70719 19 1.70719C9.42707 1.70719 1.66666 9.4676 1.66666 19.0406C1.66666 28.6135 9.42707 36.3739 19 36.3739Z" fill="#9A8BF9" stroke="#705BF6" stroke-width="2.66667"/>
                    <path d="M18.4234 9.3626C18.6805 8.92108 19.3184 8.92108 19.5755 9.3626L22.2999 14.0401C22.3941 14.2019 22.552 14.3165 22.7349 14.3562L28.0254 15.5018C28.5248 15.6099 28.7219 16.2165 28.3814 16.5975L24.7747 20.6341C24.65 20.7736 24.5897 20.9592 24.6086 21.1454L25.1539 26.531C25.2053 27.0393 24.6893 27.4142 24.2218 27.2082L19.2683 25.0254C19.097 24.9499 18.9019 24.9499 18.7306 25.0254L13.7771 27.2082C13.3096 27.4142 12.7936 27.0393 12.845 26.531L13.3903 21.1454C13.4092 20.9592 13.3489 20.7736 13.2242 20.6341L9.61746 16.5975C9.27703 16.2165 9.47413 15.6099 9.9735 15.5018L15.264 14.3562C15.4469 14.3165 15.6048 14.2019 15.699 14.0401L18.4234 9.3626Z" fill="#FBFAFF"/>
                  </svg>
                  <p class="text-[#FBFAFF] text-[14px] leading-[18px] laptop:text-[24px] laptop:leading-[32px] font-bold">{{ useThousandFormat(item.total_points) }}</p>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div id="listEl" class="relative w-full flex flex-col justify-start items-start gap-6 laptop:gap-8" :class="{ 'h-[600px] laptop:h-[800px] overflow-y-scroll' : listLeaderboard.length > 10 }">
              <div v-for="(item, index) in listLeaderboard" :key="item" class="points-leaderboard-list-item w-full flex flex-row justify-start items-center gap-3 laptop:gap-8">
                <div class="relative w-[30px] h-[30px] laptop:w-14 laptop:h-14">
                  <svg class="w-full h-auto" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.7892 1.07232C27.4869 0.477764 28.5131 0.477764 29.2108 1.07232L36.1122 6.95369C36.4112 7.20847 36.7829 7.36245 37.1745 7.39369L46.2133 8.115C47.127 8.18791 47.8526 8.91351 47.9255 9.82726L48.6468 18.8661C48.6781 19.2576 48.8321 19.6294 49.0868 19.9283L54.9682 26.8298C55.5628 27.5275 55.5628 28.5536 54.9682 29.2513L49.0868 36.1527C48.8321 36.4517 48.6781 36.8234 48.6468 37.215L47.9255 46.2538C47.8526 47.1675 47.127 47.8931 46.2133 47.9661L37.1745 48.6874C36.7829 48.7186 36.4112 48.8726 36.1122 49.1274L29.2108 55.0087C28.5131 55.6033 27.4869 55.6033 26.7892 55.0087L19.8878 49.1274C19.5888 48.8726 19.2171 48.7186 18.8255 48.6874L9.78673 47.9661C8.87298 47.8931 8.14739 47.1675 8.07447 46.2538L7.35317 37.215C7.32192 36.8234 7.16795 36.4517 6.91316 36.1527L1.0318 29.2513C0.437237 28.5536 0.437237 27.5275 1.0318 26.8298L6.91316 19.9283C7.16795 19.6294 7.32192 19.2576 7.35317 18.8661L8.07447 9.82726C8.14739 8.91351 8.87298 8.18791 9.78673 8.115L18.8255 7.39369C19.2171 7.36245 19.5888 7.20847 19.8878 6.95369L26.7892 1.07232Z" fill="white"/>
                  </svg>
                  <p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[13px] laptop:text-[24px] leading-[18px] laptop:leading-[32px] font-bold text-[#17077E]">{{ item.rank }}</p>
                </div>
                <img :src="item.profile_photo" class="w-9 laptop:w-20 aspect-[1/1] object-cover rounded-lg laptop:rounded-2xl" width="80" height="80" alt="avatar" loading="lazy" />
                <div class="flex flex-col justify-start items-start gap-0.5 laptop:gap-2">
                  <p class="text-[#FFFFFF] text-[16px] leading-[21px] laptop:text-[32px] laptop:leading-[43px] font-bold">{{ item.name.split(' ')[0] }}</p>
                  <p class="text-[#CCCCCC] text-[12px] leading-[16px] laptop:text-[24px] laptop:leading-[32px] font-bold" v-text="item.instagram ? `@${item.instagram}` : ''"></p>
                </div>
                <div class="flex flex-row items-center gap-3 ml-auto">
                  <svg class="w-4 h-auto laptop:w-[38px]" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 36.3739C28.573 36.3739 36.3334 28.6135 36.3334 19.0406C36.3334 9.4676 28.573 1.70719 19 1.70719C9.42707 1.70719 1.66666 9.4676 1.66666 19.0406C1.66666 28.6135 9.42707 36.3739 19 36.3739Z" fill="#9A8BF9" stroke="#705BF6" stroke-width="2.66667"/>
                    <path d="M18.4234 9.3626C18.6805 8.92108 19.3184 8.92108 19.5755 9.3626L22.2999 14.0401C22.3941 14.2019 22.552 14.3165 22.7349 14.3562L28.0254 15.5018C28.5248 15.6099 28.7219 16.2165 28.3814 16.5975L24.7747 20.6341C24.65 20.7736 24.5897 20.9592 24.6086 21.1454L25.1539 26.531C25.2053 27.0393 24.6893 27.4142 24.2218 27.2082L19.2683 25.0254C19.097 24.9499 18.9019 24.9499 18.7306 25.0254L13.7771 27.2082C13.3096 27.4142 12.7936 27.0393 12.845 26.531L13.3903 21.1454C13.4092 20.9592 13.3489 20.7736 13.2242 20.6341L9.61746 16.5975C9.27703 16.2165 9.47413 15.6099 9.9735 15.5018L15.264 14.3562C15.4469 14.3165 15.6048 14.2019 15.699 14.0401L18.4234 9.3626Z" fill="#FBFAFF"/>
                  </svg>
                  <p class="text-[#FBFAFF] text-[14px] leading-[18px] laptop:text-[24px] laptop:leading-[32px] font-bold">{{ useThousandFormat(item.total_points) }}</p>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div v-show="auth.isLogin" class="point-leaderboard-list-user bg-[#E6E2FD] sticky bottom-0 left-0 w-full">
          <div class="flex flex-row justify-start items-center gap-3 laptop:gap-8 py-6 px-4 laptop:px-8">
            <div class="relative w-[30px] h-[30px] laptop:w-14 laptop:h-14">
              <svg class="w-full h-auto" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.7892 1.07232C27.4869 0.477764 28.5131 0.477764 29.2108 1.07232L36.1122 6.95369C36.4112 7.20847 36.7829 7.36245 37.1745 7.39369L46.2133 8.115C47.127 8.18791 47.8526 8.91351 47.9255 9.82726L48.6468 18.8661C48.6781 19.2576 48.8321 19.6294 49.0868 19.9283L54.9682 26.8298C55.5628 27.5275 55.5628 28.5536 54.9682 29.2513L49.0868 36.1527C48.8321 36.4517 48.6781 36.8234 48.6468 37.215L47.9255 46.2538C47.8526 47.1675 47.127 47.8931 46.2133 47.9661L37.1745 48.6874C36.7829 48.7186 36.4112 48.8726 36.1122 49.1274L29.2108 55.0087C28.5131 55.6033 27.4869 55.6033 26.7892 55.0087L19.8878 49.1274C19.5888 48.8726 19.2171 48.7186 18.8255 48.6874L9.78673 47.9661C8.87298 47.8931 8.14739 47.1675 8.07447 46.2538L7.35317 37.215C7.32192 36.8234 7.16795 36.4517 6.91316 36.1527L1.0318 29.2513C0.437237 28.5536 0.437237 27.5275 1.0318 26.8298L6.91316 19.9283C7.16795 19.6294 7.32192 19.2576 7.35317 18.8661L8.07447 9.82726C8.14739 8.91351 8.87298 8.18791 9.78673 8.115L18.8255 7.39369C19.2171 7.36245 19.5888 7.20847 19.8878 6.95369L26.7892 1.07232Z" fill="#705BF6"/>
              </svg>
              <p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[13px] laptop:text-[24px] leading-[18px] laptop:leading-[32px] font-bold text-[#FBFAFF]">{{ user.rank }}</p>
            </div>
            <img :src="user.profile_photo" class="w-9 laptop:w-20 aspect-[1/1] object-cover rounded-lg laptop:rounded-2xl" width="80" height="80" alt="avatar" loading="lazy" />
            <div class="flex flex-col justify-start items-start gap-0.5 laptop:gap-2">
              <p class="text-[#17077E] text-[16px] leading-[21px] laptop:text-[32px] laptop:leading-[43px] font-bold">{{ user.name }}</p>
              <p class="text-[#200AAE] text-[12px] leading-[16px] laptop:text-[24px] laptop:leading-[32px] font-bold" v-text="user.instagram ? `@${user.instagram}` : ''"></p>
            </div>
            <div class="flex flex-row items-center gap-3 ml-auto">
              <svg class="w-4 h-auto laptop:w-[38px]" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 36.3739C28.573 36.3739 36.3334 28.6135 36.3334 19.0406C36.3334 9.4676 28.573 1.70719 19 1.70719C9.42707 1.70719 1.66666 9.4676 1.66666 19.0406C1.66666 28.6135 9.42707 36.3739 19 36.3739Z" fill="#9A8BF9" stroke="#705BF6" stroke-width="2.66667"/>
                <path d="M18.4234 9.3626C18.6805 8.92108 19.3184 8.92108 19.5755 9.3626L22.2999 14.0401C22.3941 14.2019 22.552 14.3165 22.7349 14.3562L28.0254 15.5018C28.5248 15.6099 28.7219 16.2165 28.3814 16.5975L24.7747 20.6341C24.65 20.7736 24.5897 20.9592 24.6086 21.1454L25.1539 26.531C25.2053 27.0393 24.6893 27.4142 24.2218 27.2082L19.2683 25.0254C19.097 24.9499 18.9019 24.9499 18.7306 25.0254L13.7771 27.2082C13.3096 27.4142 12.7936 27.0393 12.845 26.531L13.3903 21.1454C13.4092 20.9592 13.3489 20.7736 13.2242 20.6341L9.61746 16.5975C9.27703 16.2165 9.47413 15.6099 9.9735 15.5018L15.264 14.3562C15.4469 14.3165 15.6048 14.2019 15.699 14.0401L18.4234 9.3626Z" fill="#FBFAFF"/>
              </svg>
              <p class="text-[#17077E] text-[14px] leading-[18px] laptop:text-[24px] laptop:leading-[32px] font-bold">{{ useThousandFormat(user.total_points || 0) }} pts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.points-leaderboard{
  &-top-1{
    order: 2;
    z-index: 10;

    .card{
      background-color: #F4BC3A;
      box-shadow: 0px 40px 80px 0px rgba(0, 0, 0, 0.40);

      &-wrap{
        background-color: #F7CC69;
      }

      &-name{
        color: #680D2D;
      }

      &-user{
        color: #961340;
      }

      &-point{
        color: #17077E;
      }

      &-rank{
        color: #5C4205;
      }

      .icon-rank{
        fill: #F4BC3A;
      }
    }
  }
  &-top-2{
    order: 1;
    transform: translate(8px, 16px) rotate(-6deg);
    
    @media (min-width: 1024px){
      transform: translate(8px, 32px) rotate(-6deg);
    }

    .card{
      background-color: #F085AA;
      box-shadow: 0px 40px 80px 0px rgba(0, 0, 0, 0.40);

      &-wrap{
        background-color: #F5B2C9;
      }

      &-name{
        color: #680D2D;
      }

      &-user{
        color: #961340;
      }

      &-point{
        color: #680D2D;
      }

      &-rank{
        color: #680D2D;
      }

      .icon-rank{
        fill: #EA578A;
      }
    }
  }
  &-top-3{
    order: 3;
    transform: translate(-8px, 16px) rotate(6deg);
    
    @media (min-width: 1024px){
      transform: translate(-8px, 32px) rotate(6deg);
    }

    .card{
      background-color: #DB9761;
      box-shadow: 0px 40px 80px 0px rgba(0, 0, 0, 0.40);

      &-wrap{
        background-color: #E4B28B;
      }

      &-name{
        color: #3E230E;
      }

      &-user{
        color: #5B3415;
      }

      &-point{
        color: #3E230E;
      }

      &-rank{
        color: #3E230E;
      }

      .icon-rank{
        fill: #D17A36;
      }
    }
  }
}
</style>