<template>
    <section class="relative">
        <div class="py-16 laptop:py-36 max-w-[1200px] mx-auto text-white px-4">
            <div class="grid grid-cols-1 laptop:grid-cols-2 gap-20">
                <div class="laptop:max-w-[500px]">
                    <h2 class="text-[56px] leading-[56px] laptop:text-[96px] laptop:leading-[100%] text-center laptop:text-left font-plastic font-black mb-6">PERTANYAAN YANG SERING DITANYA</h2>
                    <p class="text-sm laptop:text-xl font-[500] text-center laptop:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec turpis ac arcu pellentesque volutpat. Integer vel bibendum justo.</p>
                </div>

                <div>
                    <Accordion class="my-3">
                        <template v-slot:header>
                            <h2 class="font-black text-xl">Pertanyaan 1</h2>
                        </template>

                        <template v-slot:body>
                            <p class="px-6 pb-4 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec turpis ac arcu pellentesque volutpat. Integer vel bibendum justo.</p>
                        </template>
                    </Accordion>

                    <Accordion class="my-3">
                        <template v-slot:header>
                            <h2 class="font-black text-xl">Pertanyaan 2</h2>
                        </template>

                        <template v-slot:body>
                            <p class="px-6 pb-4 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec turpis ac arcu pellentesque volutpat. Integer vel bibendum justo.</p>
                        </template>
                    </Accordion>

                    <Accordion class="my-3">
                        <template v-slot:header>
                            <h2 class="font-black text-xl">Pertanyaan 3</h2>
                        </template>

                        <template v-slot:body>
                            <p class="px-6 pb-4 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec turpis ac arcu pellentesque volutpat. Integer vel bibendum justo.</p>
                        </template>
                    </Accordion>

                    <Accordion class="my-3">
                        <template v-slot:header>
                            <h2 class="font-black text-xl">Pertanyaan 4</h2>
                        </template>

                        <template v-slot:body>
                            <p class="px-6 pb-4 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec turpis ac arcu pellentesque volutpat. Integer vel bibendum justo.</p>
                        </template>
                    </Accordion>

                    <Accordion class="my-3">
                        <template v-slot:header>
                            <h2 class="font-black text-xl">Pertanyaan 5</h2>
                        </template>

                        <template v-slot:body>
                            <p class="px-6 pb-4 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec turpis ac arcu pellentesque volutpat. Integer vel bibendum justo.</p>
                        </template>
                    </Accordion>
                </div>
            </div>
        </div>
    </section>
</template>