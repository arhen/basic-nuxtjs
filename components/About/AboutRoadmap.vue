<script setup>
const roadmaps = [
    {
        title: 'ULTRAoddinary Type Quiz',
        description: 'Personality setiap orang memang berbeda-beda. Kini saatnya kalian cobain sendiri untuk bisa lebih mengerti kalau kalian tipe ULTRAoddinary yang mana. Cus!',
        image: '/images/odt-roadmap-2023.webp?v=1',
        linkFilter: '/personality-quiz',
        date: '12 Desember',
        columnPosition: 'ml-0 mr-auto',
        year: '2023'
    },
    {
        title: 'Mystery Event',
        description: 'Keseruan ULTRAoddinary lain yang layak kalian coba. Tungguin yah!',
        image: '/images/odt-roadmap-Q1.webp',
        linkFilter: '',
        date: 'Kuartal Pertama',
        columnPosition: 'ml-0 mr-auto laptop:ml-auto laptop:mr-0',
        year: '2024'
    },
    {
        title: 'Mystery Event',
        description: 'Keseruan ULTRAoddinary lain yang layak kalian coba. Tungguin yah!',
        image: '/images/odt-roadmap-Q2.webp',
        linkFilter: '',
        date: 'Kuartal Kedua',
        columnPosition: 'ml-0 mr-auto laptop:mx-auto',
        year: ''
    },
    {
        title: 'Mystery Event',
        description: 'Keseruan ULTRAoddinary lain yang layak kalian coba. Tungguin yah!',
        image: '/images/odt-roadmap-Q3.webp',
        linkFilter: '',
        date: 'Kuartal Ketiga',
        columnPosition: 'ml-0 mr-auto laptop:ml-0 laptop:mr-auto',
        year: ''
    },
    {
        title: 'Mystery Event',
        description: 'Keseruan ULTRAoddinary lain yang layak kalian coba. Tungguin yah!',
        image: '/images/odt-roadmap-Q4.webp',
        linkFilter: '',
        date: 'Kuartal Keempat',
        columnPosition: 'ml-0 mr-auto laptop:ml-auto laptop:mr-0',
        year: ''
    },
];
</script>

<template>
    <section class="relative">
        <div class="pt-12 px-4 laptop:px-0 max-w-[1200px] mx-auto text-white overflow-hidden">
            <div class="flex flex-col laptop:flex-row justify-between gap-5">
                <h2 class="font-plastic text-center laptop:text-left text-[56px] leading-[56px] laptop:text-[80px] laptop:leading-[80px]">CAMPAIGN ROADMAP</h2>
                <p class="max-w-[500px] text-center text-sm laptop:text-right laptop:text-xl px-5 laptop:px-0">
                    Keseruan ULTRAoddinary bersama <br class="hidden laptop:block" />
                    Ultra Milk X Stray Kids memang nggak ada habisnya. <br class="hidden laptop:block" />
                    Tunggu terus jangan sampai ketinggalan yah, Movers!
                </p>
            </div>

            <div class="relative mt-20 -mx-16 pl-20 pr-1 laptop:pl-0 laptop:pr-0">
                <span style="background: radial-gradient(30732475.52% 50% at 50% 50.9%, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)" class="absolute z-10 left-[94px] laptop:left-1/2 transform laptop:-translate-x-1/2 block w-[2px] bg-white h-full"></span>
                <div class="relative" v-for="(roadmap, key) in roadmaps" v-bind:key="key">
                    <span v-if="roadmap?.year" class="bg-white rounded-xl p-2 z-10 px-3 text-black absolute -left-4 top-12 laptop:top-0 laptop:left-1/2 transform laptop:-translate-x-1/2 font-black text-sm laptop:text-[32px] laptop:leading-[43px]">{{ roadmap?.year }}</span>
                    <div :class="{ 'grid grid-cols-1 laptop:grid-cols-2' : true, 'laptop:-mt-[25%]': (key + 1) % 2 === 0 }">
                        <span class="absolute left-[11px] top-2 laptop:left-1/2 z-10 transform laptop:-translate-x-1/2 w-[8px] h-[8px] laptop:w-[16px] laptop:h-[16px] rounded-full block bg-white laptop:translate-y-1/2 laptop:top-1/3"></span>
                        <div :class="{ 'hidden laptop:block px-16': true, 'order-1' : (key + 1) % 2 === 0, 'order-2' : (key + 1) % 2 != 0 }"></div>
                        <div :class="{ 'px-16 pb-20 laptop:pb-0 relative z-10': true, 'order-2' : (key + 1) % 2 === 0, 'order-1' : (key + 1) % 2 != 0 }">
                            <div :class="{ 'w-full laptop:w-[400px]' : true, [roadmap?.columnPosition]: true }">
                                <div class="flex gap-2 items-center text-base font-bold mb-6">
                                    <svg class="flex-none" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.75 3.00061V5.25061M17.25 3.00061V5.25061M3 18.7506V7.50061C3 6.90387 3.23705 6.33158 3.65901 5.90962C4.08097 5.48766 4.65326 5.25061 5.25 5.25061H18.75C19.3467 5.25061 19.919 5.48766 20.341 5.90962C20.7629 6.33158 21 6.90387 21 7.50061V18.7506M3 18.7506C3 19.3473 3.23705 19.9196 3.65901 20.3416C4.08097 20.7636 4.65326 21.0006 5.25 21.0006H18.75C19.3467 21.0006 19.919 20.7636 20.341 20.3416C20.7629 19.9196 21 19.3473 21 18.7506M3 18.7506V11.2506C3 10.6539 3.23705 10.0816 3.65901 9.65962C4.08097 9.23766 4.65326 9.00061 5.25 9.00061H18.75C19.3467 9.00061 19.919 9.23766 20.341 9.65962C20.7629 10.0816 21 10.6539 21 11.2506V18.7506" stroke="#CCCCCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span>{{ roadmap?.date }}</span>
                                </div>
            
                                <img :src="roadmap?.image" alt="Campaign Roadmap" width="400" height="400" loading="lazy" class="aspect-square w-[400] h-auto">
                                <h5 class="font-bold text-xl laptop:text-[32px] laptop:leading-[43px] my-3 mt-5">{{ roadmap?.title }}</h5>
                                <p class="text-[#CCCCCC] text-sm laptop:text-xl">{{ roadmap?.description }}</p>
            
                                <NuxtLink :data-roadmap="roadmap?.title" v-if="roadmap?.linkFilter" :to="roadmap?.linkFilter" class="bg-[#CDFF3E] text-black text-center py-4 laptop:py-5 laptop:px-8 text-xl laptop:text-2xl font-black uppercase rounded-[100px] w-full block mt-6">
                                    COBAIN FILTERNYA!
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>