<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const tabs = [
    {
        id: 0,
        name: 'Outstanaline',
        icon: '/images/icon-skz-outstanaline.svg?v=1',
        title: '/images/text-outstanaline.svg',
        subTitle: 'Outstanding & Adrenaline',
        textColor: 'text-[#FF9700]',
        bgColor: 'bg-[#FF9700]',
        hoverBgColor: 'hover:bg-[#FF9700]',
        shortDescription: `“Your <span class="text-white px-1 bg-[#FF9700]">empathy</span> and <span class="text-white px-1 bg-[#FF9700]">leadership inspire</span> an adrenaline-fueled drive in others.”`,
        question: 'Your exceptional empathy and supportiveness, coupled with your charismatic and inclusive nature, make you an outstanding leader. You infuse performances with an adrenaline-pumping energy, leaving audiences captivated and inspired.',
        facts: [
            `You always put your friends and family first – they're your world!`,
            `You get a real boost of energy and happiness from helping those close to you.`,
            `Your kindness and caring nature make you incredibly attractive!`
        ]
    },
    {
        id: 1,
        name: 'Intimidavely',
        icon: '/images/icon-skz-intimidavely.svg?v=1',
        title: '/images/text-intimidavely.svg',
        subTitle: 'Intimidating & Lovely',
        textColor: 'text-[#FF0D41]',
        bgColor: 'bg-[#FF0D41]',
        hoverBgColor: 'hover:bg-[#FF0D41]',
        shortDescription: `“<span class="text-white px-1 bg-[#FF0D41]">Intimidating</span> appearance, but actually has <span class="text-white px-1 bg-[#FF0D41]">kind heart</span> and <span class="text-white px-1 bg-[#FF0D41]">cute</span>”`,
        question: 'Despite your intimidating presence, where your powerful performances command attention, in reality you radiate a charming and approachable aura. This captivating duality adds depth to your personality, making you relatable and intriguing to both fans and fellow artists',
        facts: [
            `People who just met you might think you're a bit cold.`,
            `Some of them might even see you as fierce at first.`,
            `But as they get to know you better and spend more time with you...`,
            `They'll discover your warmest side!`
        ]
    },
    {
        id: 2,
        name: 'Distincute',
        icon: '/images/icon-skz-distincute.svg?v=1',
        title: '/images/text-distincute.svg',
        subTitle: 'Distictive & Cute',
        textColor: 'text-[#FF0C98]',
        bgColor: 'bg-[#FF0C98]',
        hoverBgColor: 'hover:bg-[#FF0C98]',
        shortDescription: `“<span class="text-white px-1 bg-[#FF0C98]">Friendly</span> and <span class="text-white px-1 bg-[#FF0C98]">feels excited</span> in every new thing with lovely expression.”`,
        question: 'Your distinctive and cute personality is intricately woven with your vibrant and expressive nature. Your charisma and dynamic expressions showcase your ability to connect with the audience, exuding an enthusiastic and adaptable energy.',
        facts: [
            `Your enthusiasm is always bubbling over! It's infectious and tends to be more expressive, which builds a charisma that many people adore.`,
            `You radiate a positive aura that naturally draws others to you.`,
            `Adapting to new environments? That's even become one of your skills!`,
        ]
    },
    {
        id: 3,
        name: 'Dratsy',
        icon: '/images/icon-skz-dratsy.svg?v=1',
        title: '/images/text-dratsy.svg',
        subTitle: 'Dreamy & Artsy',
        textColor: 'text-[#0000FF]',
        bgColor: 'bg-[#0000FF]',
        hoverBgColor: 'hover:bg-[#0000FF]',
        shortDescription: `“Easily <span class="text-white px-1 bg-[#0000FF]">falls in love</span> with things and <span class="text-white px-1 bg-[#0000FF]">feels mellow</span> around an artsy character.”`,
        question: 'Your imaginative music tells intricate stories that touch listeners. Your artistic touch is seen in visuals and group aesthetics. Your genuine care enriches your creative process, making you a beloved and true embodiment of this personality.',
        facts: [
            `You're a hard worker and always full of enthusiasm. These qualities really make you stand out, you know.`,
            `Everyone's eyes are on you!`,
            `Even though sometimes it's tough for you to express your feelings, through art, you can convey them clearly.`,
        ],
    },
    {
        id: 4,
        name: 'Navisity',
        icon: '/images/icon-skz-navisity.svg?v=1',
        title: '/images/text-navisity.svg',
        subTitle: 'Navigate & Curiosity',
        textColor: 'text-[#0BBFA1]',
        bgColor: 'bg-[#0BBFA1]',
        hoverBgColor: 'hover:bg-[#0BBFA1]',
        shortDescription: `“Possessing <span class="text-white px-1 bg-[#0BBFA1]">boundless curiosity</span> and skill in <span class="text-white px-1 bg-[#0BBFA1]">navigating challenges</span>, you are easily distracted yet remarkably adept.”`,
        question: 'Your boundless curiosity and adventurous spirit guide you through life. Fearlessly venturing into uncharted territories, you seek new experiences for your art. Though easily distracted, your adaptability and determination help you navigate challenges, always pushing boundaries.',
        facts: [
            `Most people see you as a smart and cheerful person, which builds a really strong charm around you.`,
            `The imaginative things in your mind can actually be turned into inspiration in any form!`,
        ],
    },
    {
        id: 5,
        name: 'Adventurule',
        icon: '/images/icon-skz-adventurule.svg?v=1',
        title: '/images/text-adventurule.svg',
        subTitle: 'Adventurous & Rule',
        textColor: 'text-[#830EFF]',
        bgColor: 'bg-[#830EFF]',
        hoverBgColor: 'hover:bg-[#830EFF]',
        shortDescription: `“Your shining aura rules, enhancing your <span class="text-white px-1 bg-[#830EFF]">adventurous spirit, social nature,</span> and <span class="text-white px-1 bg-[#830EFF]">warm-heartedness.</span>”`,
        question: 'Your adventurous spirit pairs well with your social warmth. Connecting with others and fostering positivity align with your adventurous side. Your willingness to break rules for inclusivity highlights your boundary-pushing nature, creating a supportive community.',
        facts: [
            `Everyone wants to get to know you better because of the warmth you always radiate. It's a reflection of your positive spirit and high social awareness.`,
            `You're also someone who's not afraid to try new things. Adventure is your middle name!`,
        ],
    },
    {
        id: 6,
        name: 'Rasmart',
        icon: '/images/icon-skz-rasmart.svg?v=1',
        title: '/images/text-rasmart.svg',
        subTitle: 'Rascal & Smart',
        textColor: 'text-[#FF9700]',
        bgColor: 'bg-[#FF9700]',
        hoverBgColor: 'hover:bg-[#FF9700]',
        shortDescription: `“Looks <span class="text-white px-1 bg-[#FF9700]">clumsy</span>, talk less but <span class="text-white px-1 bg-[#FF9700]">calm</span> and <span class="text-white px-1 bg-[#FF9700]">smart.</span>”`,
        question: 'Your caring nature combines effortlessly with your inner rascal, creating a delightful mix of playfulness and genuine affection. You skillfully balance your mischievous side with a sociable and supportive demeanor, making you a charming presence on and off stage.',
        facts: [
            `You're playful with others thanks to your intelligence.`,
            `People are drawn to you when you share your thoughts calmly and confidently.`,
            `You possess a sincere and genuine heart towards everyone`
        ],
    },
    {
        id: 7,
        name: 'Youthbloom',
        icon: '/images/icon-skz-youthbloom.svg?v=1',
        title: '/images/text-youthbloom.svg',
        subTitle: 'Youthful & Blooming',
        textColor: 'text-[#F955E9]',
        bgColor: 'bg-[#F955E9]',
        hoverBgColor: 'hover:bg-[#F955E9]',
        shortDescription: `“<span class="text-white px-1 bg-[#F955E9]">Young</span> at heart. Act like a bright <span class="text-white px-1 bg-[#F955E9]">star.</span>”`,
        question: 'Your youthful and blooming personality shines through your diligent and responsible nature. This combination of youthful energy and a grounded, responsible demeanor creates a unique and compelling presence, much like the vibrancy and freshness associated with youthfulness and blooming.',
        facts: [
            `People really like having you around`,
            `Your adorable and cheerful nature just makes everyone fall in love with you`,
            `On top of being super cute, you're also someone who takes responsibility for what you're doing at the moment.`
        ],
    },
];

const activeTab = ref(tabs[0]);
const thumbsSwiper = ref(null);
const firstRender = ref(true);

</script>

<template>
    <section class="mt-10 laptop:-mt-28">
        <div class="flex flex-col justify-center items-center pt-12 laptop:pt-[64px] text-white px-4">
            <h2 class="uppercase text-white text-[56px] leading-[56px] laptop:text-[96px] laptop:leading-[96px] font-plastic text-center">
                TIPE KAMU <br/>
                YANG MANA, NIH?
            </h2>

            <div class="grid grid-cols-12 gap-4 laptop:gap-10 laptop:w-[1200px] mx-auto mt-10 laptop:mt-20">
                <div class="col-span-12 laptop:col-span-3 hidden laptop:block">
                    <div class="flex items-center max-w-[100vw] overflow-x-auto -mx-4 px-4 py-2">
                        <ul class="font-plastic text-xl laptop:text-[32px] laptop:leading-[32px] flex flex-row laptop:flex-col gap-1 laptop:gap-0">
                            <li role="button" v-on:click="activeTab = item" v-for="(item, key) in tabs" v-bind:key="key" :class="`flex laptop:w-full items-center justify-center laptop:justify-start gap-2 px-6 py-1 laptop:px-5 laptop:py-2 rounded-[32px] laptop:my-2 ${item?.hoverBgColor} ${activeTab?.id === item?.id && item?.bgColor}`">
                                <img :src="item?.icon" :alt="item?.name" width="40" height="40" loading="lazy" class="aspect-square w-[24px] laptop:w-[40px] h-auto flex-none">
                                <span class="flex-none">
                                    {{ item?.name }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-span-12 laptop:col-span-9 bg-[#ffffff1f] rounded-[32px] p-4 laptop:p-10 hidden laptop:block">
                    <img :src="activeTab?.title" :alt="activeTab?.name" width="538" height="112" loading="lazy" class="h-[56px] laptop:h-[112px] w-auto mx-auto">
                    <div class="flex items-center justify-center my-10">
                        <div :class="`${activeTab?.bgColor} inline-block p-2 px-4 rounded-lg mx-auto text-base laptop:text-xl font-bold`">
                            {{ activeTab?.subTitle }}
                        </div>
                    </div>

                    <div class="text-xl laptop:text-[38px] laptop:leading-[51px] text-center" v-html="activeTab?.shortDescription"/>

                    <div class="grid grid-cols-1 laptop:grid-cols-2 mt-10 mb-4 laptop:mb-0">
                        <div class="text-[#17077E] bg-[#E6E2FD] p-4 px-5 rounded-2xl w-[264px] mx-auto laptop:mx-[unset] laptop:w-[400px] laptop:h-[368px] laptop:mt-10 shadow-card transform rotate-[-5deg] laptop:translate-x-6">
                            <h5 class=" font-black text-2xl laptop:text-[40px] laptop:leading-[54px] mb-2">Artinya Apa Tuh?</h5>
                            <p class="text-sm laptop:text-xl font-[500] laptop:pr-5" v-html="activeTab?.question"></p>
                        </div>
    
                        <div class="text-[#5B3415] bg-[#F7E9DE] p-4 px-5 rounded-2xl w-[264px] mx-auto laptop:mx-[unset] laptop:w-[400px] mt-6 laptop:h-[368px] laptop:mt-10 shadow-card transform rotate-[3deg] laptop:translate-y-5">
                            <h5 class=" font-black text-2xl laptop:text-[40px] laptop:leading-[54px] mb-2">Fakta Menarik!</h5>
                            <ul class="list-disc pl-4 laptop:pl-5">
                                <li class="py-[2px]" v-for="fact in activeTab.facts" v-bind:key="fact">
                                    <p class="text-sm laptop:text-xl font-[500]" v-html="fact"></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 laptop:hidden -mx-4 px-4 overflow-hidden">
                    <Swiper
                        class="!overflow-visible pointer-events-none"
                        :slides-per-view="2.5"
                        :speed="800"
                        :initial-slide="8"
                        @swiper="(swiper) => thumbsSwiper = swiper"
                        centered-slides
                    >
                        <SwiperSlide v-for="(item, key) in [...tabs, ...tabs, tabs[0]]" v-bind:key="key">
                            <div role="button" :class="`font-plastic text-xl w-[150px] tablet:mx-auto laptop:text-[32px] laptop:leading-[32px] flex laptop:w-full items-center justify-center laptop:justify-start px-8 gap-2 py-1 laptop:px-5 laptop:py-2 rounded-[32px] laptop:my-2 ${item?.hoverBgColor} ${activeTab?.id === item?.id && item?.bgColor}`">
                                <img :src="item?.icon" :alt="item?.name" width="40" height="40" class="aspect-square w-[24px] laptop:w-[40px] h-auto flex-none">
                                <span class="flex-none">
                                    {{ item?.name }}
                                </span>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

                <div class="col-span-12 laptop:hidden -mx-4 px-4 overflow-hidden">
                    <Swiper
                        class="!overflow-visible"
                        :slides-per-view="1"
                        :space-between="16"
                        :speed="800"
                        :initial-slide="0"
                        loop
                        @slide-change="(swiper) => {
                            activeTab = tabs[swiper?.realIndex > 7 ? swiper?.realIndex - 8 : swiper?.realIndex];
                            if (swiper?.realIndex != 8) firstRender = false;
                            
                            if (swiper?.realIndex < 8) {
                                thumbsSwiper?.slideTo(swiper?.realIndex + 8);
                            }

                            if (swiper?.realIndex >= 8) {
                                thumbsSwiper?.slideTo(swiper?.realIndex);
                            }
                        }"
                    >
                        <SwiperSlide v-for="(item, key) in tabs" v-bind:key="key">
                            <div class="bg-[#ffffff1f] rounded-[32px] p-4 laptop:hidden relative">
                                <img :src="item?.title" :alt="item?.name" class="h-[56px] laptop:h-[112px] w-auto mx-auto">
                                <div class="flex items-center justify-center my-10">
                                    <div :class="`${item?.bgColor} inline-block p-2 px-4 rounded-lg mx-auto text-base laptop:text-xl font-bold`">
                                        {{ item?.subTitle }}
                                    </div>
                                </div>

                                <div class="text-xl laptop:text-[38px] laptop:leading-[51px] text-center" v-html="item?.shortDescription"/>

                                <div class="grid grid-cols-1 laptop:grid-cols-2 mt-10 mb-4 laptop:mb-0">
                                    <div class="text-[#17077E] bg-[#E6E2FD] p-4 px-5 rounded-2xl w-[264px] mx-auto laptop:mx-[unset] laptop:w-[400px] laptop:h-[368px] laptop:mt-10 shadow-card transform rotate-[-5deg] laptop:translate-x-6">
                                        <h5 class=" font-black text-2xl laptop:text-[40px] laptop:leading-[54px] mb-2">Artinya Apa Tuh?</h5>
                                        <p class="text-sm laptop:text-xl font-[500] laptop:pr-5" v-html="item?.question"></p>
                                    </div>
                
                                    <div class="text-[#5B3415] bg-[#F7E9DE] p-4 px-5 rounded-2xl w-[264px] mx-auto laptop:mx-[unset] laptop:w-[400px] mt-6 laptop:h-[368px] laptop:mt-10 shadow-card transform rotate-[3deg] laptop:translate-y-5">
                                        <h5 class=" font-black text-2xl laptop:text-[40px] laptop:leading-[54px] mb-2">Fakta Menarik!</h5>
                                        <ul class="list-disc pl-4 laptop:pl-5">
                                            <li class="py-[2px]" v-for="fact in item.facts" v-bind:key="fact">
                                                <p class="text-sm laptop:text-xl font-[500]" v-html="fact"></p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div role="button" v-on:touchstart="() => firstRender = false" v-if="firstRender && key === 0" class="absolute z-10 left-0 top-0 w-full h-full text-center text-white backdrop-blur-sm bg-[#000000d9]">
                                    <img src="/images/icon-swipe-hand.svg" class="mx-auto my-10 mb-6 animate-pulse" />
                                    <span class="block font-black text-2xl">Kamu bisa swipe loh!</span>
                                    <span class="text-[#CCCCCC] text-sm">Kamu bisa swipe kiri dan kanan untuk <br/> lihat semua tipe</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    </section>
</template>