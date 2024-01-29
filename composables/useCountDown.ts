import { ref } from "vue"

export function useCountDown({ seconds = 60, callback = () => false }) {

    let countingInterval: any = null

    const secs = ref(seconds)

    const startCounting = () => {
        secs.value = seconds
        countingInterval = setInterval(() => {
            secs.value = secs.value - 1
            if (secs.value <= 0) {
                clearInterval(countingInterval)
                callback()
            }
        }, 1000)
    }

    return { secs, startCounting }
}