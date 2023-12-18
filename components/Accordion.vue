<script setup>
import { useElementSize } from '@vueuse/core';

const el = ref(null);
const { height } = useElementSize(el);

const props = defineProps(['header', 'body']);
const open = ref(false);
</script>

<template>
    <div :class="{'overflow-hidden rounded-2xl' : true, 'bg-[#1A1A1A] text-white' : !open, 'bg-white text-black' : open}">
        <button v-on:click="() => open = !open" type="button" class="appearance-none w-full px-6 py-4 text-left flex justify-between gap-2 items-center">
            <slot name="header"></slot>

            <svg :class="{ 'flex-none h-6 w-6 transform transition-all ease-linear duration-200' : true, '-rotate-180 text-black': open }" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 8.75L12 16.25L4.5 8.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>

        <div :style="{ maxHeight: open ? height + 'px' : '0px' }" :class="{'transition-all ease-linear duration-200 opacity-0' : true, 'opacity-100': open }">
            <div ref="el">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>