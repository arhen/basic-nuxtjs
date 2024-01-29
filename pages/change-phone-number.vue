<script setup>
const route = useRoute()
const isExpiredLink = new Date().valueOf() >= Number(route?.query?.expires) * 1000

const modalMessage = ref(isExpiredLink ? 'Link Invalid' : false)

if (!isExpiredLink) {
    navigateTo({ path: '/', query: { ['change-phone-number']: 1, ...route?.query } })
}

const handleCloseModalMessage = () => {
    modalMessage.value = false
    navigateTo('/')
}

</script>

<template>
    <ModalMessage v-if="modalMessage" :message="modalMessage" @onClose="handleCloseModalMessage" />
</template>