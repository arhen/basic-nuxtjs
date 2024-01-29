<template>
    <section>
        <div class="pb-10 laptop:py-28 laptop:pb-40 px-4 laptop:px-0 max-w-[1200px] mx-auto text-white relative">
            <IntersectionProvider>
                <div class="pointer-events-none">
                    <img src="/images/skz-element-1.svg" alt="Element" width="185" height="185" loading="lazy" class="aspect-square w-[101px] h-auto laptop:w-[185px] absolute top-[30%] right-[35%] laptop:top-[65%] laptop:right-[93%] z-0 laptop:z-20">
                    <img src="/images/skz-element-8.svg" alt="Element" width="124" height="124" loading="lazy" class="aspect-square w-[70px] h-auto laptop:w-[124px] absolute top-[22%] left-[87%] laptop:top-[10%] laptop:left-[97%] transform rotate-[30deg] z-0 laptop:z-20">
                    <img src="/images/skz-element-7.svg" alt="Element" width="270" height="270" loading="lazy" class="aspect-square w-[158px] h-auto laptop:w-[270px] absolute top-[75%] right-[-18%] laptop:top-[35%] laptop:right-[-10%] transform scale-x-100 z-0 laptop:z-20">
                </div>
            </IntersectionProvider>

            <div class="grid grid-cols-1 laptop:grid-cols-2 laptop:gap-10">
                <div class="flex items-center">
                    <div class="max-w-[300px] laptop:max-w-[620px] mx-auto text-center laptop:text-left">
                        <h2 class="uppercase text-white text-[56px] leading-[56px] laptop:text-[76px] laptop:leading-[76px] font-plastic mb-4">
                            DAPETIN PHOTOCARD REGULAR SET DAN SPECIAL SET
                        </h2>
                    </div>
                </div>

                <div class="flex items-center">
                    <p class="text-sm laptop:text-xl text-center w-full laptop:text-right laptop:max-w-[500px] laptop:ml-auto laptop:mr-0">Photocard regular set dengan hologram dan <br/> photocard special set dengan full hologram!</p>
                </div>
            </div>

            <div class="grid grid-cols-1 laptop:grid-cols-2 gap-24 laptop:gap-4 mt-14">
                <IntersectionProvider class="relative aspect-[600/500]">
                    <img src="/images/card-set-regular.webp" alt="regular photocard" class="aspect-[600/500] w-full h-auto" width="600" height="500" loading="lazy" />
                    <span class="absolute -bottom-[22%] left-[30%] laptop:-bottom-[20%] laptop:left-[30%]">
                        <img src="/images/odt-element-2.svg" alt="Element" width="73" height="120" loading="lazy" class="aspect-[73/120] w-[37px] laptop:w-[73px] h-auto absolute top-[-90%] left-[-50%] laptop:top-[-170%] laptop:left-[-65%] transform rotate-[-20deg] laptop:rotate-[-30deg]">
                        <span class="font-black text-2xl laptop:text-[33px] laptop:leading-[33px]">Regular Set</span>
                    </span>
                </IntersectionProvider>

                <IntersectionProvider class="relative aspect-[600/500]">
                    <img src="/images/card-set-special.webp" alt="special photocard" class="aspect-[600/500] w-full h-auto" width="600" height="500" loading="lazy" />

                    <span class="absolute -bottom-[22%] right-[30%] laptop:-bottom-[20%] laptop:right-[30%]">
                        <span class="font-black text-2xl laptop:text-[33px] laptop:leading-[33px]">Special Set</span>
                        <img src="/images/odt-element-2.svg" alt="Element" width="73" height="120" loading="lazy" class="aspect-[73/120] w-[37px] laptop:w-[73px] h-auto absolute top-[-90%] right-[-50%] laptop:top-[-170%] laptop:right-[-65%] transform rotate-[20deg] laptop:rotate-[30deg] -scale-x-100">
                    </span>
                </IntersectionProvider>
            </div>
        </div>
    </section>
</template>