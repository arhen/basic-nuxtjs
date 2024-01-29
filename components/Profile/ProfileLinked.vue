<script setup>
const isUnlink = ref(false)

function unlinkIg(event){
  event.preventDefault()
  isUnlink.value = true
}

function cancelUnlink(){
  isUnlink.value = false
}
</script>

<template>
  <div>
    <div class="profile-form-linked rounded-2xl laptop:rounded-[32px] bg-[#5C4205] mb-8">
      <div class="p-4 laptop:p-8">
        <div class="mb-8">
          <h2 class="text-body-20px-black laptop:text-body-24px-black text-[#F7E9DE] capitalize mb-4">Link Account</h2>
          <p class="text-body-14px laptop:text-body-16px leading-none text-[#FCEDCA]">Hubungkan akun sosial media kamu untuk mulai mendapatkan poin.</p>
        </div>
        <div class="grid laptop:grid-cols-2 gap-4">
          <div class="flex flex-row justify-center items-center gap-4 bg-[#705BF6] p-4 rounded-2xl">
            <div class="inline-block">
              <img src="/images/icon-tiktok.png" alt="Tiktok" width="40" height="40" class="w-6 laptop:w-10 h-auto">
            </div>
            <div class="flex-1">
              <p class="text-body-16px-black laptop:text-body-20px-black laptop:leading-[27px] text-white mb-1 laptop:mb-2">Akun Terhubung</p>
              <p class="text-body-14px text-[#CCCCCC]">@abang_pasek</p>
            </div>
            <button>
              <svg class="w-5 laptop:w-6 h-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div role="button" class="flex flex-row justify-center items-center gap-4 bg-white/10 p-4 rounded-2xl">
            <div class="inline-block">
              <svg class="w-6 laptop:w-10 h-auto" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.0017 14.9997C17.2393 14.9997 15.0016 17.2382 15.0016 19.9997C15.0016 22.7618 17.2402 24.9997 20.0017 24.9997C22.7638 24.9997 25.0017 22.7612 25.0017 19.9997C25.0017 17.2375 22.7632 14.9997 20.0017 14.9997ZM20.0017 11.6663C24.6023 11.6663 28.335 15.3948 28.335 19.9997C28.335 24.6005 24.6065 28.333 20.0017 28.333C15.4008 28.333 11.6683 24.6045 11.6683 19.9997C11.6683 15.3989 15.3968 11.6663 20.0017 11.6663ZM30.835 11.2483C30.835 12.3984 29.9003 13.3316 28.7517 13.3316C27.6015 13.3316 26.6683 12.397 26.6683 11.2483C26.6683 10.0995 27.6028 9.16634 28.7517 9.16634C29.8988 9.16489 30.835 10.0995 30.835 11.2483ZM20.0017 6.66634C15.8775 6.66634 15.2053 6.67726 13.2871 6.76267C11.9802 6.82402 11.1042 6.99979 10.2903 7.31579C9.56693 7.59632 9.04514 7.93131 8.48919 8.48726C7.93111 9.04534 7.59673 9.56572 7.31733 10.2894C7.00059 11.1052 6.82488 11.9799 6.76463 13.2849C6.67838 15.125 6.66829 15.7681 6.66829 19.9997C6.66829 24.1238 6.67921 24.796 6.76461 26.714C6.82599 28.0203 7.00199 28.8977 7.31723 29.7097C7.59849 30.434 7.93416 30.957 8.48743 31.5103C9.04771 32.0698 9.56965 32.4053 10.2864 32.682C11.1103 33.0005 11.9858 33.1765 13.2869 33.2367C15.127 33.3228 15.77 33.333 20.0017 33.333C24.1258 33.333 24.798 33.322 26.716 33.2367C28.0195 33.1755 28.8975 32.999 29.7117 32.684C30.434 32.4035 30.9587 32.0667 31.5123 31.5138C32.0727 30.9527 32.4075 30.432 32.6845 29.7135C33.0022 28.8927 33.1785 28.016 33.2387 26.7145C33.3248 24.8743 33.335 24.2312 33.335 19.9997C33.335 15.8755 33.324 15.2034 33.2387 13.2853C33.1773 11.9814 33.0008 11.1022 32.6855 10.2883C32.4057 9.56697 32.0695 9.04359 31.514 8.48726C30.955 7.92826 30.436 7.59456 29.7118 7.31537C28.8967 6.99891 28.0207 6.82294 26.7163 6.76269C24.8763 6.67642 24.2332 6.66634 20.0017 6.66634ZM20.0017 3.33301C24.5293 3.33301 25.0947 3.34967 26.8725 3.43301C28.646 3.51496 29.8558 3.79551 30.9183 4.20801C32.0168 4.63162 32.9447 5.20384 33.871 6.13022C34.796 7.05662 35.3683 7.98717 35.7933 9.08301C36.2043 10.1441 36.485 11.3552 36.5683 13.1288C36.6475 14.9066 36.6683 15.4719 36.6683 19.9997C36.6683 24.5275 36.6517 25.0927 36.5683 26.8705C36.4863 28.6442 36.2043 29.8538 35.7933 30.9163C35.3697 32.015 34.796 32.9427 33.871 33.8692C32.9447 34.7942 32.0127 35.3663 30.9183 35.7913C29.8558 36.2025 28.646 36.483 26.8725 36.5663C25.0947 36.6455 24.5293 36.6663 20.0017 36.6663C15.4738 36.6663 14.9086 36.6497 13.1308 36.5663C11.3572 36.4843 10.1488 36.2025 9.08496 35.7913C7.98773 35.3677 7.05856 34.7942 6.13218 33.8692C5.20579 32.9427 4.63496 32.0108 4.20996 30.9163C3.79746 29.8538 3.51829 28.6442 3.43496 26.8705C3.35579 25.0927 3.33496 24.5275 3.33496 19.9997C3.33496 15.4719 3.35163 14.9066 3.43496 13.1288C3.51689 11.3538 3.79746 10.1455 4.20996 9.08301C4.63356 7.98579 5.20579 7.05662 6.13218 6.13022C7.05856 5.20384 7.98913 4.63301 9.08496 4.20801C10.1475 3.79551 11.3558 3.51634 13.1308 3.43301C14.9086 3.35384 15.4738 3.33301 20.0017 3.33301Z" fill="#F085AA"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-body-16px-black laptop:text-body-20px-black laptop:leading-[27px] text-white">Hubungkan Akun Instagram</p>
            </div>
            <button>
              <svg class="w-5 laptop:w-6 h-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2368_10054)">
                <path d="M13.19 8.688C13.8399 8.99825 14.4057 9.45993 14.8401 10.0342C15.2745 10.6085 15.5648 11.2787 15.6865 11.9885C15.8081 12.6982 15.7577 13.4268 15.5394 14.113C15.3212 14.7992 14.9414 15.423 14.432 15.932L9.93203 20.432C9.08811 21.2759 7.94351 21.75 6.75003 21.75C5.55655 21.75 4.41195 21.2759 3.56803 20.432C2.72411 19.5881 2.25 18.4435 2.25 17.25C2.25 16.0565 2.72411 14.9119 3.56803 14.068L5.32503 12.311M18.675 11.689L20.432 9.932C21.2759 9.08808 21.7501 7.94348 21.7501 6.75C21.7501 5.55652 21.2759 4.41192 20.432 3.568C19.5881 2.72408 18.4435 2.24997 17.25 2.24997C16.0565 2.24997 14.9119 2.72408 14.068 3.568L9.56803 8.068C9.05866 8.577 8.67889 9.20081 8.46061 9.88702C8.24233 10.5732 8.19191 11.3018 8.3136 12.0115C8.43528 12.7213 8.72552 13.3915 9.15992 13.9658C9.59432 14.5401 10.1602 15.0017 10.81 15.312" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_2368_10054">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isUnlink" class="modal-container fixed top-0 left-0 bottom-0 right-0 w-screen h-screen px-6 laptop:px-0 overflow-hidden flex flex-row justify-center items-center backdrop-blur-sm bg-black/40 z-50">
      <div @click="cancelUnlink" role="button" class="modal-outer w-full h-full absolute top-0 left-0 cursor-default"></div>
      <div class="modal-unlink relative w-full laptop:w-auto bg-[#FCEDCA] rounded-[32px] z-10">
        <button @click="cancelUnlink" class="absolute top-4 right-4 z-10">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 15L15 5M5 5L15 15" stroke="#5C4205" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="modal-unlink-container w-full laptop:w-[400px] mx-auto relative flex flex-row justify-center items-center">
          <div class="modal-unlink-wrap w-full mx-auto p-6 flex flex-col justify-center items-center gap-8">
            <div class="relative w-full">
              <p class="text-body-24px-black text-[#5C4205] mb-4">Apakah kamu yakin ingin unlink akun kamu?</p>
              <p class="text-body-16px leading-none text-[#8C6408]">Kamu bisa melakukan link akun kembali</p>
            </div>
            <div class="relative w-full">
              <button class="w-full h-12 bg-[#680D2D] rounded-full mb-2">
                <span class="text-body-16px-black leading-none text-center text-[#FBFAFF]">Unlink Akun</span>
              </button>
              <button class="w-full h-12 bg-transparent border-2 border-[#5C4205] rounded-full">
                <span class="text-body-16px-black leading-none text-center text-[#5C4205]">Batal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>