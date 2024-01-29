<script setup>
const props = defineProps(['message'])
const emit = defineEmits(['onClose'])
</script>

<template>
    <div class="modal-container fixed top-0 left-0 bottom-0 right-0 w-screen h-screen px-6 laptop:px-0 overflow-hidden flex flex-row justify-center items-center backdrop-blur-sm bg-black/40 z-50">
        <div role="button" @click="() => emit('onClose')" class="modal-outer w-full h-full absolute top-0 left-0 cursor-default"></div>

        <div class="modal-success relative w-full laptop:w-auto bg-[#FBFAFF] rounded-[32px] z-10">
            <div class="modal-success-container w-full laptop:w-[400px] mx-auto relative flex flex-row justify-center items-center">
                <div class="modal-success-wrap w-full mx-auto p-6 flex flex-col justify-center items-center gap-4 relative">
                    <button type="button" @click="() => emit('onClose')" class="absolute top-4 right-4 z-10">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="16" fill="#ECFFB6"/>
                            <path d="M11 21L21 11M11 11L21 21" stroke="#17077E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M84 48C84 52.7276 83.0688 57.4089 81.2597 61.7766C79.4505 66.1443 76.7988 70.1129 73.4558 73.4558C70.1129 76.7988 66.1443 79.4505 61.7766 81.2597C57.4089 83.0688 52.7276 84 48 84C43.2724 84 38.5911 83.0688 34.2234 81.2597C29.8557 79.4505 25.8871 76.7988 22.5442 73.4558C19.2012 70.1129 16.5495 66.1443 14.7403 61.7766C12.9312 57.4089 12 52.7276 12 48C12 38.4522 15.7928 29.2955 22.5442 22.5442C29.2955 15.7928 38.4522 12 48 12C57.5478 12 66.7045 15.7928 73.4558 22.5442C80.2072 29.2955 84 38.4522 84 48Z" fill="url(#paint0_linear_2665_3325)"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M43.8849 33.7549C45.7137 30.5882 50.2863 30.5882 52.1135 33.7549L63.7589 53.9392C65.5861 57.1059 63.2997 61.0642 59.6438 61.0642H36.3546C32.6987 61.0642 30.4139 57.1059 32.2411 53.9392L43.8833 33.7549H43.8849ZM48 42.0626C48.3149 42.0626 48.617 42.1877 48.8397 42.4104C49.0624 42.6331 49.1875 42.9352 49.1875 43.2501V49.1876C49.1875 49.5026 49.0624 49.8046 48.8397 50.0273C48.617 50.25 48.3149 50.3751 48 50.3751C47.6851 50.3751 47.383 50.25 47.1603 50.0273C46.9376 49.8046 46.8125 49.5026 46.8125 49.1876V43.2501C46.8125 42.9352 46.9376 42.6331 47.1603 42.4104C47.383 42.1877 47.6851 42.0626 48 42.0626ZM48 55.1251C48.3149 55.1251 48.617 55 48.8397 54.7773C49.0624 54.5546 49.1875 54.2526 49.1875 53.9376C49.1875 53.6227 49.0624 53.3206 48.8397 53.0979C48.617 52.8752 48.3149 52.7501 48 52.7501C47.6851 52.7501 47.383 52.8752 47.1603 53.0979C46.9376 53.3206 46.8125 53.6227 46.8125 53.9376C46.8125 54.2526 46.9376 54.5546 47.1603 54.7773C47.383 55 47.6851 55.1251 48 55.1251Z" fill="black"/>
                        <defs>
                            <linearGradient id="paint0_linear_2665_3325" x1="12" y1="83.9999" x2="77.8138" y2="98.9019" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#CDFF3E"/>
                                <stop offset="1" stop-color="#0FC0A0"/>
                            </linearGradient>
                        </defs>
                    </svg>

                    <h1 class="text-gradient-complete text-2xl laptop:text-[32px] laptop:leading-[32px] font-bold text-center">{{ message }}</h1>

                    <button type="button" @click="() => emit('onClose')" class="w-full h-10 bg-[#CDFF3E] rounded-full mt-4">
                        <span class="text-body-16px-black leading-none text-center text-black">OK</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>