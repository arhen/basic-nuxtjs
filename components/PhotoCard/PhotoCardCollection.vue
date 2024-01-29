<script setup>
const { isMobileOrTablet } = useDevice()
const showModalBlockPhotocard = ref(false)
const images = [
    '/images/skz-card-front-blur-0.webp?v=1',
    '/images/skz-card-front-blur-1.webp?v=1',
    '/images/skz-card-front-blur-2.webp?v=1',
    '/images/skz-card-front-blur-3.webp?v=1',
    '/images/skz-card-front-blur-4.webp?v=1',
    '/images/skz-card-front-blur-5.webp?v=1',
    '/images/skz-card-front-blur-6.webp?v=1',
    '/images/skz-card-front-blur-7.webp?v=1',
]

const handleScan = () => {
    if (!isMobileOrTablet) {
        showModalBlockPhotocard.value = true
    }
}

const handleClosePopUp = () => {
    showModalBlockPhotocard.value = false
}
</script>

<template>
    <section class="pt-24 laptop:pt-0">
        <div class="py-10 laptop:py-24 px-4 max-w-[1200px] mx-auto text-white relative">
            <IntersectionProvider>
                <div class="pointer-events-none">
                    <img src="/images/skz-element-1.svg" alt="Element" width="185" height="185" loading="lazy" class="aspect-square w-[125px] h-auto laptop:w-[185px] absolute top-[65%] right-[77%] laptop:top-[65%] laptop:right-[93%] z-20">
                    <img src="/images/skz-element-4.svg" alt="Element" width="206" height="206" loading="lazy" class="aspect-square w-[114px] h-auto laptop:w-[206px] absolute top-[-4%] left-[10%] laptop:top-[3%] laptop:left-[-10%] transform -rotate-[100deg] z-20">
                    <img src="/images/skz-element-3.svg" alt="Element" width="209" height="209" loading="lazy" class="aspect-square w-[120px] h-auto laptop:w-[209px] absolute top-[20%] left-[80%] laptop:top-[18%] laptop:left-[85%] transform rotate-[-30deg] z-20">
                    <img src="/images/skz-element-5.svg" alt="Element" width="126" height="126" loading="lazy" class="aspect-square w-[70px] h-auto laptop:w-[126px] absolute top-[12%] right-[85%] laptop:top-[23%] laptop:right-[80%] z-20">
                    <img src="/images/skz-element-8.svg" alt="Element" width="124" height="124" loading="lazy" class="aspect-square w-[70px] h-auto laptop:w-[124px] absolute top-[82%] left-[85%] laptop:top-[77%] laptop:left-[97%] transform rotate-[30deg] z-20">
                    <img src="/images/skz-element-9.svg" alt="Element" width="244" height="244" loading="lazy" class="aspect-square w-[122px] h-auto laptop:w-[244px] absolute top-[97.5%] right-[35%] laptop:top-[86%] laptop:right-[42%] z-20">
                    <img src="/images/skz-element-6.svg" alt="Element" width="140" height="140" loading="lazy" class="aspect-square w-[94px] h-auto laptop:w-[140px] absolute top-[4%] right-[-6%] laptop:top-[5%] laptop:left-[80%] transform rotate-[0deg] laptop:rotate-[30deg] z-20">
                    <img src="/images/skz-element-7.svg" alt="Element" width="302" height="302" loading="lazy" class="aspect-square w-[156px] h-auto laptop:w-[302px] absolute top-[45%] right-[-15%] laptop:top-[45%] laptop:right-[-15%] transform scale-x-100 z-20">
                </div>
            </IntersectionProvider>
            
            <div class="max-w-[740px] mx-auto relative z-20">
                <h2 class="uppercase text-white text-[56px] leading-[56px] laptop:text-[96px] laptop:leading-[96px] font-plastic text-center mb-4">
                    UDAH DAPETIN <br class="tablet:hidden" /> SEMUA <br class="tablet:hidden" /> PHOTOCARD-NYA BELUM?
                </h2>

                <p class="max-w-[600px] mx-auto text-center text-[#CCCCCC] text-sm tablet:text-xl">Nggak cuma bisa jadi koleksi keren kalian, lho. <br/> Photocard Ultra Milk X Stray Kids ini juga akan ngasih AR experience yang berbeda dari biasanya. Bisa scan per photocard & bisa scan kedelapan photocard sekaligus. Pokoknya super seru!</p>
            </div>
            
            <div class="grid grid-cols-2 tablet:grid-cols-4 mt-10 gap-4">
                <IntersectionProvider v-for="(img, key) in images" v-bind:key="key" class="aspect-[296/441]">
                    <div class="skz-card-front-blur">
                        <img :src="img" class="aspect-[296/441]" loading="lazy" />
                        <img src="/images/bg-mozaik-effect.webp?v=1" class="absolute left-0 top-0 w-full aspect-[296/441] mix-blend-multiply" loading="lazy" />
                    </div>
                </IntersectionProvider>
            </div>

            <div class="flex flex-col tablet:flex-row justify-between gap-4 laptop:gap-10 mt-16 items-center">
                <h2 class="uppercase flex-none text-white text-center tablet:text-left text-[56px] leading-[56px] laptop:text-[96px] laptop:leading-[96px] font-plastic mb-4 laptop:flex-auto">
                    YUK KUMPULIN <br/> SEKARANG
                </h2>

                <NuxtLink :to="isMobileOrTablet && '/ar-photo-card/ar8target'" @click="handleScan" class="cursor-pointer w-full laptop:w-[500px] flex-auto laptop:flex-none text-black bg-[#CDFF3E] rounded-[104px] text-xl laptop:text-[40px] laptop:leading-[54px] font-black text-center block p-4 laptop:py-9">
                    Scan Sekarang
                </NuxtLink>
            </div>
        </div>
    </section>

    <ModalMessage v-if="!isMobileOrTablet && showModalBlockPhotocard" message="Gunakan smartphone untuk scan photocard dengan AR" @onClose="handleClosePopUp" />
</template>

<style lang="scss" scoped>
.skz-card-front-blur {
    @apply rounded-3xl border border-black relative;
    background: radial-gradient(146.24% 111.8% at 100% 0%, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 100%);
}
</style>