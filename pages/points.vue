<script setup>
import { useRuntimeConfig } from "nuxt/app"

const config = useRuntimeConfig()

if(config?.public?.enablePhase2 === '0'){
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>

<template>
  <div class="pt-[120px] laptop:pt-32">
    <AppHeader/>
    <PointsOverview/>
    <PointsLeaderboard/>
    <AppFooter/>
  </div>
</template>