<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const targetEl = ref(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver( targetEl, ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
        isVisible.value = isIntersecting
        stop()
    }
})
</script>

<template>
  <div ref="targetEl">
    <slot v-if="isVisible" />
  </div>
</template>