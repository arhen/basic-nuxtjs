<script setup>
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const { isMobileOrTablet } = useDevice()
const { auth } = useAuthStore()
const refIframe = ref(null)
const iframeURL = `${config?.public?.arURL}/${route?.params?.slug}`

const handleClosePopUp = () => router.push('/')
const onLoadIframe = () => {
    let payloads = {
        event_type: auth?.value?.isLogin ? 'AUTHENTICATION' : 'PUBLIC'
    }

    if (auth?.value?.isLogin) payloads.token = auth?.value?.token

    setTimeout(() => {
        refIframe?.value?.contentWindow?.postMessage(JSON.stringify(payloads), config?.public?.arURL);
    }, 700);
}

</script>

<template>
    <iframe ref="refIframe" v-if="isMobileOrTablet" :src="iframeURL" frameborder="0" class="h-screen w-screen" v-bind:onLoad="onLoadIframe" allow="camera; microphone"></iframe>
    <ModalMessage v-else message="Gunakan smartphone untuk scan photocard dengan AR" @onClose="handleClosePopUp" />
</template>