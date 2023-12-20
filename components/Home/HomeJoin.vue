<script setup>

const onPlay = ref(false)

onMounted(() => {
  initiateYoutube()
})

function initiateYoutube() {
  const playButton = document.getElementById("triggerPlay");
  playButton.addEventListener("click", function () {
    let tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    setTimeout(() => {
      let player;

      player = new window.YT.Player('ytPlayer', {
        height: '693',
        width: '1232',
        videoId: '5g-d5htMGdI',
        playerVars: {
          'playsinline': 1
        },
        events: {
          'onReady': onPlayerReady,
        }
      });
    }, 500);
  });
}

function onPlayerReady(event){
  event.target.playVideo();
  onPlay.value = true
}
</script>

<template>
  <section class="home-join relative overflow-hidden">
    <div class="container mx-auto py-20 laptop:py-[120px] px-6 laptop:px-0">
      <div class="home-join-content flex flex-col justify-center items-center gap-8 laptop:gap-20 relative">
        <div class="relative flex flex-col justify-center items-center laptop:w-[610px]">
          <h2 class="font-plastic text-white text-center relative mb-8 laptop:mb-16">
            <span class="text-head-48px laptop:text-head-96px block">seru-SERU an di</span>
            <img src="/images/text-discord.svg" alt="Discord" width="268" height="64" loading="lazy" class="w-[268px] h-auto laptop:w-[480px] absolute top-10 laptop:top-[60px] left-1/2 -translate-x-1/2 z-10">
          </h2>
          <img src="/images/logo-icownicpatch.svg" alt="ICOWNICPATCH" width="368" height="264" loading="lazy" class="w-[188px] h-auto laptop:w-[368px] relative z-10">
        </div>
        <div class="home-join-content-video w-full aspect-video rounded-3xl overflow-hidden relative">
          <div id="ytPlayer" class="w-full h-full relative"></div>
          <NuxtImg src="/images/um-x-skz-video-poster.webp" alt="Join Community" sizes="50vw sm:100vw xl:100vw" loading="lazy" class="w-full h-full object-cover object-center absolute top-0 left-0" :class="{ 'opacity-0 invisible' : onPlay }" />
          <div id="triggerPlay" class="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex flex-row justify-center items-center w-[40px] h-[40px] laptop:w-[152px] laptop:h-[152px] rounded-full bg-[#E4CCFF]"
            :class="{ 'opacity-0 invisible' : onPlay }"
          >
            <svg class="w-5 h-auto laptop:w-[104px]" width="104" height="105" viewBox="0 0 104 105" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.75 24.6563C22.75 20.947 26.7237 18.5983 29.9737 20.3837L79.9803 47.8917C80.7447 48.3125 81.3821 48.9308 81.826 49.6819C82.2699 50.4331 82.5041 51.2896 82.5041 52.1622C82.5041 53.0347 82.2699 53.8912 81.826 54.6424C81.3821 55.3936 80.7447 56.0118 79.9803 56.4327L29.9737 83.9363C29.2316 84.3443 28.3961 84.5519 27.5494 84.5388C26.7027 84.5257 25.8741 84.2922 25.145 83.8615C24.416 83.4307 23.8117 82.8175 23.3918 82.0821C22.9718 81.3468 22.7506 80.5148 22.75 79.668V24.6563Z" fill="#9747FF"/>
            </svg>
          </div>
        </div>
        <p class="text-body-14px laptop:text-body-20px laptop:leading-[27px] text-white text-center max-w-full laptop:max-w-[820px]"><span class="font-black">Stray Kids</span> ngajak kamu buat join <span class="font-black">Discord Icownic Community</span> di <a href="https://www.icownicpatch.com" target="_blank" rel="noopener noreferrer" class="font-black underline underline-offset-[5px]">www.icownicpatch.com</a> karena bisa mendapatkan banyak keuntungan menarik, mulai dari produk Ultra Milk, tiket event, merchandise dan masih banyak aktivitas seru lainnya!</p>
        <NuxtLink to="https://www.icownicpatch.com" target="_blank" class="flex flex-row justify-center items-center gap-4 laptop:gap-6 w-full laptop:w-auto py-4 laptop:px-[44px] laptop:py-12 rounded-full bg-[#9747FF]">
          <svg class="w-8 h-auto laptop:w-20" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.4014 46.1517C24.9347 46.1517 22.1047 43.0033 22.1047 39.1477C22.1047 35.2917 24.8639 32.1432 28.4014 32.1432C31.9035 32.1432 34.7687 35.2917 34.698 39.1477C34.698 43.0033 31.9035 46.1517 28.4014 46.1517ZM51.6464 46.1517C48.1794 46.1517 45.346 43.0033 45.346 39.1477C45.346 35.2917 48.1087 32.1432 51.6464 32.1432C55.1484 32.1432 58.0137 35.2917 57.943 39.1477C57.943 43.0033 55.1837 46.1517 51.6464 46.1517ZM33.7504 14.4087L32.7212 12.5322L30.6101 12.8841C25.7299 13.6975 21.088 15.1547 16.7508 17.1523L15.9877 17.5038L15.5163 18.1992C6.80536 31.0469 4.41869 43.6943 5.60043 56.1197L5.72926 57.474L6.82976 58.2737C12.6277 62.4873 18.2466 65.0617 23.7569 66.751L26.3879 67.5577L30.0998 58.501C36.465 60.0743 43.53 60.0747 49.896 58.5023L53.585 67.56L56.222 66.751C61.7237 65.0633 67.3784 62.4893 73.1547 58.2693L74.2414 57.4757L74.3764 56.137C75.8297 41.7363 72.0527 29.1913 64.515 18.1873L64.042 17.497L63.2814 17.149C58.9217 15.155 54.2834 13.6982 49.4357 12.8846L47.3767 12.5391L46.3284 14.3445C46.0367 14.847 45.7377 15.4143 45.454 15.9884C41.813 15.6145 38.186 15.6137 34.5747 15.9872C34.2934 15.4234 34.0077 14.8782 33.7504 14.4087ZM22.3806 55.3663C23.0405 55.7463 23.7318 56.1183 24.4179 56.459L22.9207 60.1123C19.1855 58.7517 15.3939 56.878 11.4914 54.1847C10.7431 43.7247 12.8691 33.1688 20.0392 22.2864C23.0314 20.9696 26.1777 19.9415 29.4529 19.242C29.6537 19.6599 29.8405 20.0677 29.994 20.4294L30.9036 22.5734L33.208 22.2355C37.7167 21.5742 42.2567 21.5733 46.8404 22.2363L49.1407 22.5691L50.0484 20.4294C50.2064 20.057 50.3884 19.6504 50.5804 19.2429C53.841 19.943 56.9927 20.9726 60.009 22.2926C66.2597 31.6941 69.413 42.18 68.4947 54.183C64.6117 56.874 60.8067 58.7483 57.0637 60.1107L55.5777 56.462C56.2657 56.1203 56.959 55.7473 57.621 55.3663C59.2537 54.4253 61.0124 53.252 62.1334 52.1313L57.868 47.8663C57.3224 48.412 56.1227 49.268 54.6097 50.14C53.1287 50.9933 51.6594 51.6827 50.7207 51.993C44.0414 54.2017 35.9604 54.2017 29.2808 51.993C28.3422 51.6827 26.8729 50.9933 25.3918 50.14C23.8788 49.268 22.6791 48.412 22.1333 47.8663L17.8682 52.1313C18.989 53.252 20.7477 54.4253 22.3806 55.3663Z" fill="white"/>
          </svg>
          <span class="text-body-20px-black laptop:text-body-40px-black text-white uppercase">Gabung Sekarang</span>
        </NuxtLink>
        <img src="/images/skz-element-5.svg" alt="Element" width="156" height="156" loading="lazy" class="hidden laptop:block h-auto laptop:w-[156px] absolute laptop:top-[280px] laptop:left-[76px]">
        <img src="/images/skz-element-3.svg" alt="Element" width="152" height="152" loading="lazy" class="hidden laptop:block h-auto laptop:w-[152px] absolute laptop:top-0 laptop:right-[16px]">
        <img src="/images/skz-element-6.svg" alt="Element" width="163" height="163" loading="lazy" class="w-[90px] h-auto laptop:w-[163px] absolute top-[-80px] right-8 laptop:top-[unset] laptop:bottom-[-60px] laptop:right-[50px]">
      </div>
    </div>
  </section>
</template>