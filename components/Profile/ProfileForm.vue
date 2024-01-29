<script setup>
const router = useRouter()
const { auth, setAuth } = useAuthStore()
const { getProvince, getCity, updateProfile } = useAuthApi()

const form = ref({ name: '', instagram: '', tiktok: '', discord: '', address: '', address_2: '', province: '', city: '', zip_code: '', profile_photo: null})
const exceptData = ref({ email: '', phone: '' })
const listProvince = ref(null)
const listCity = ref(null)
const modalMessage = ref('')
const isLoading = ref(false)
const previewPhoto = ref(null)

const isNotEmpty = computed(() => {
  return form.value?.name !== '' && form.value?.address !== '' && form.value?.address_2 !== '' && form.value?.province !== '' && form.value?.city !== '' && form.value?.zip_code !== ''
})

const isValidForm = computed(() => {
  return form.value?.name !== auth.value?.profile?.name || form.value?.instagram !== '' && form.value?.instagram !== auth.value?.profile?.instagram || form.value?.tiktok !== '' && form.value?.tiktok !== auth.value?.profile?.tiktok || form.value?.discord !== '' && form.value?.discord !== auth.value?.profile?.discord || form.value.address !== auth.value?.profile?.address || form.value.address_2 !== auth.value?.profile?.address_2 || form.value.province !== auth.value?.profile.province || form.value.city !== auth.value?.profile?.city
})

const triggerGetCity = async (e) =>{
  form.value.city = ''
  listCity.value = null
  try {
    const data = await getCity(form.value?.province)
    listCity.value = data?.data
  } catch (error) {
    console.log(error)
  }
}

const handleUpdateProfile = async (e) => {
  e.preventDefault()
  isLoading.value = true

  try {
    const formData = new FormData()

    formData.append("name", form.value.name)
    formData.append("instagram", form.value.instagram)
    formData.append("tiktok", form.value.tiktok)
    formData.append("discord", form.value.discord)
    formData.append("address", form.value.address)
    formData.append("address_2", form.value.address_2)
    formData.append("province", form.value.province)
    formData.append("city", form.value.city)
    formData.append("zip_code", form.value.zip_code)
    formData.append("profile_photo", form.value.profile_photo)

    await updateProfile(formData)

    modalMessage.value = 'Berhasil update profile'

  } catch (error) {
    console.log(error)
    
    modalMessage.value = 'Harap lengkapi semua data'
  } finally {
    isLoading.value = false
  }
}

const handleCloseModalMessage = () => {
  modalMessage.value = ''
  isValidForm.value = false
  reloadNuxtApp()
}

if(!auth.value?.isLogin){
  router.push({ path: "/" })
}

const resUser = await useFetchApi('/api/profile', {
  method: 'GET',
  lazy: true,
  server: false
})

watch(resUser.status, async () => {
  if (resUser.status.value === 'success') {
    const dataProfile = resUser.data.value;
    form.value = {
      name: dataProfile?.data?.name, 
      instagram: dataProfile?.data?.instagram !== 'null' ? dataProfile?.data?.instagram : '', 
      tiktok: dataProfile?.data?.tiktok !== 'null' ? dataProfile?.data?.tiktok : '', 
      discord: dataProfile?.data?.discord !== 'null' ? dataProfile?.data?.discord : '',
      address: dataProfile?.data?.address,
      address_2: dataProfile?.data?.address_2,
      province: dataProfile?.data?.province,
      city: dataProfile?.data?.city,
      zip_code: dataProfile?.data?.zip_code,
      profile_photo: dataProfile?.data?.profile_photo
    }

    exceptData.value = { email: dataProfile?.data?.email, phone: dataProfile?.data?.phone_number }

    const dataProvince = await getProvince()
    listProvince.value = dataProvince?.data

    if(form.value.province){
      const dataCity = await getCity(form.value?.province)
      listCity.value = dataCity?.data
    }else{
      form.value.province = ''
      form.value.city = ''
    }

    setAuth({ profile: resUser.data.value.data, total_points: resUser.data.value.meta.total_points })
  }
}, {immediate: true});

const handleFileChange = (e) => {
  let input = e.target
  if(input.files){
    const reader = new FileReader()
    reader.onload = (e) => {
      previewPhoto.value = e.target.result
    }
    form.value.profile_photo = input.files[0]
    reader.readAsDataURL(input.files[0])
  }
}
</script>

<template>
  <section class="profile-form relative">
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <img src="/images/skz-element-4.svg" alt="Element" width="188" height="188" loading="lazy" class="w-[135px] h-auto laptop:w-[188px] rotate-[30deg] absolute top-[8.5%] left-[-11%] laptop:top-[1%] laptop:left-[8%]">
      <img src="/images/skz-element-3.svg" alt="Element" width="175" height="175" loading="lazy" class="hidden laptop:block h-auto laptop:w-[175px] rotate-[-30deg] absolute laptop:top-[32%] laptop:-left-10">
      <img src="/images/skz-element-8.svg" alt="Element" width="180" height="180" loading="lazy" class="w-[165px] h-auto laptop:w-[180px] rotate-[15deg] absolute top-[55.2%] left-[-15%] laptop:top-[50%] laptop:left-[12.5%]">
      <img src="/images/skz-element-9.svg" alt="Element" width="175" height="175" loading="lazy" class="w-[165px] h-auto laptop:w-[175px] absolute bottom-[5%] left-[-13%] laptop:bottom-[2%] laptop:left-[6%]">
      <img src="/images/skz-element-6.svg" alt="Element" width="138" height="138" loading="lazy" class="w-[145px] h-auto laptop:w-[138px] absolute top-[6%] right-[-8%] laptop:top-[8%] laptop:right-[5%]">
      <img src="/images/skz-element-7.svg" alt="Element" width="290" height="290" loading="lazy" class="w-[240px] h-auto laptop:w-[290px] rotate-[-30deg] absolute top-[50%] right-[-38%] laptop:top-[43%] laptop:right-[8%]">
      <img src="/images/skz-element-5.svg" alt="Element" width="180" height="180" loading="lazy" class="hidden laptop:block h-auto laptop:w-[180px] absolute laptop:bottom-[8%] laptop:right-[-1%]">
      <img src="/images/skz-element-1.svg" alt="Element" width="175" height="175" loading="lazy" class="w-[140px] h-auto laptop:w-[175px] rotate-[-30deg] absolute bottom-[3%] right-[-8%] laptop:bottom-[1%] laptop:right-[23%]">
    </div>
    <div class="profile-form-container w-full laptop:w-[816px] mx-auto py-12 laptop:py-[120px]">
      <form @submit="handleUpdateProfile" novalidate class="w-full h-full relative">
        <div class="wrap px-6 laptop:px-0 mb-12 laptop:mb-0">
          <div class="profile-form-header flex flex-row justify-between items-end mb-12 laptop:mb-8">
            <h1 class="font-plastic text-head-56px laptop:text-head-72px text-white text-center laptop:text-left uppercase w-full laptop:w-1/2">PENGATURAN PROFIL</h1>
            <div class="w-1/2 text-right hidden laptop:block">
              <button :disabled="!isNotEmpty" type="submit" class="ba text-body-20px-black text-black text-center uppercase py-[18px] px-6 rounded-full bg-[#CDFF3E] disabled:bg-[#CDFF3E]/60">{{ !isLoading ? 'Simpan Perubahan' : 'Harap Tunggu..'}}</button>
            </div>
          </div>
          <div class="profile-form-information rounded-2xl laptop:rounded-[32px] bg-white/10 backdrop-blur-[48px]">
            <div class="p-4 laptop:p-8">
              <div class="mb-8">
                <h2 class="text-body-20px-black laptop:text-body-24px-black text-white capitalize mb-4">Informasi Dasar</h2>
                <p class="text-body-14px laptop:text-body-16px leading-none text-[#CCCCCC]">Perubahan data berikut akan disinkronasikan ke akun <span class="font-bold underline underline-offset-4">Gaspack</span> kamu juga</p>
              </div>
              <div class="flex flex-col laptop:flex-row justify-start items-start gap-8">
                <div class="avatar relative w-[160px] mx-auto laptop:mx-0">
                  <div class="absolute top-2 right-2 cursor-pointer">
                    <button type="button" class="avatar-edit inline-block">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="8" fill="white"/>
                        <g clip-path="url(#clip0_2368_10373)">
                        <path d="M20.0517 9.73916L21.4575 8.33249C21.7506 8.03943 22.148 7.87479 22.5625 7.87479C22.977 7.87479 23.3744 8.03943 23.6675 8.33249C23.9606 8.62556 24.1252 9.02304 24.1252 9.43749C24.1252 9.85195 23.9606 10.2494 23.6675 10.5425L11.6933 22.5167C11.2528 22.957 10.7095 23.2806 10.1125 23.4583L7.875 24.125L8.54167 21.8875C8.7194 21.2905 9.04303 20.7472 9.48333 20.3067L20.0525 9.73916H20.0517ZM20.0517 9.73916L22.25 11.9375" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2368_10373">
                        <rect width="20" height="20" fill="white" transform="translate(6 6)"/>
                        </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <input type="file" accept="image/*" class="w-full h-full opacity-0 absolute top-0 left-0" id="file-input" @change="handleFileChange($event)">
                  </div>
                  <img v-show="previewPhoto == null" :src="form.profile_photo" class="img-user h-[160px] w-full aspect-square object-cover rounded-2xl" width="160" height="160" alt="avatar" loading="lazy" />
                  <img v-show="previewPhoto != null" :src="previewPhoto" class="img-preview h-[160px] w-full aspect-square object-cover rounded-2xl" width="160" height="160" alt="avatar" loading="lazy">
                </div>
                <div class="user-info flex flex-row justify-start items-start flex-wrap flex-1 gap-4">
                  <div class="relative flex-1 min-w-full laptop:min-w-[45%]">
                    <label for="nama-lengkap" class="block text-body-12px-black font-bold text-white">Nama Lengkap <sup>*</sup></label>
                    <div class="mt-2">
                      <input v-model="form.name" type="text" name="nama-lengkap" id="nama-lengkap" autocomplete="off" placeholder="Masukkan nama kamu" class="w-full rounded-xl bg-white/10 text-body-16px text-white h-12 px-3 flex flex-col justify-center placeholder:text-[#CCCCCC] border-2 border-transparent focus:border-[#CCCCCC] focus-visible:outline-none">
                    </div>
                  </div>
                  <div class="relative flex-1 min-w-full laptop:min-w-[45%]">
                    <label for="email" class="block text-body-12px-black font-bold text-white">Alamat email</label>
                    <div class="mt-2">
                      <input v-model="exceptData.email" type="email" name="email" id="email" autocomplete="off" disabled class="w-full rounded-xl bg-black/10 text-body-16px text-white h-12 px-3 flex flex-col justify-center placeholder:text-[#CCCCCC] border-2 border-transparent focus:border-[#CCCCCC] focus-visible:outline-none cursor-not-allowed">
                    </div>
                  </div>
                  <div class="relative flex-1 min-w-full laptop:min-w-[30%] laptop:max-w-[34%]">
                    <label for="instagram" class="block text-body-12px-black font-bold text-white">Instagram</label>
                    <div class="mt-2">
                      <input v-model="form.instagram" type="text" name="instagram" id="instagram" autocomplete="off" placeholder="username" class="w-full rounded-xl bg-white/10 text-body-16px text-white h-12 px-3 flex flex-col justify-center placeholder:text-[#CCCCCC] border-2 border-transparent focus:border-[#CCCCCC] focus-visible:outline-none">
                    </div>
                  </div>
                  <div class="relative flex-1 min-w-full laptop:min-w-[30%] laptop:max-w-[34%]">
                    <label for="tiktok" class="block text-body-12px-black font-bold text-white">Tiktok</label>
                    <div class="mt-2">
                      <input v-model="form.tiktok" type="text" name="tiktok" id="tiktok" autocomplete="off" placeholder="username" class="w-full rounded-xl bg-white/10 text-body-16px text-white h-12 px-3 flex flex-col justify-center placeholder:text-[#CCCCCC] border-2 border-transparent focus:border-[#CCCCCC] focus-visible:outline-none">
                    </div>
                  </div>
                  <div class="relative flex-1 min-w-full laptop:min-w-[30%] laptop:max-w-[34%]">
                    <label for="discord" class="block text-body-12px-black font-bold text-white">Discord</label>
                    <div class="mt-2">
                      <input v-model="form.discord" type="text" name="discord" id="discord" autocomplete="off" placeholder="username" class="w-full rounded-xl bg-white/10 text-body-16px text-white h-12 px-3 flex flex-col justify-center placeholder:text-[#CCCCCC] border-2 border-transparent focus:border-[#CCCCCC] focus-visible:outline-none">
                    </div>
                  </div>
                  <div class="relative flex-1">
                    <label for="telepon" class="block text-body-12px-black font-bold text-white">Nomor Telepon</label>
                    <div class="flex flex-row gap-2 mt-2">
                      <p class="rounded-xl bg-black/10 text-body-16px text-white h-12 px-3 flex flex-col justify-center">+62</p>
                      <input v-model="exceptData.phone" type="text" name="telepon" id="telepon" disabled class="w-full rounded-xl bg-black/10 text-body-16px text-white h-12 px-3 flex flex-col justify-center placeholder:text-[#CCCCCC] border-2 border-transparent focus:border-[#CCCCCC] focus-visible:outline-none cursor-not-allowed">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="profile-form-address rounded-2xl laptop:rounded-[32px] bg-white/10 backdrop-blur-[48px] mt-4">
            <div class="p-4 laptop:p-8">
              <div class="mb-8">
                <h2 class="text-body-24px-black text-white capitalize">Detail Alamat</h2>
              </div>
              <div class="relative flex-1 mb-4">
                <label for="alamat-1" class="block text-body-12px-black font-bold text-white">Alamat Baris 1 <sup>*</sup></label>
                <div class="mt-2">
                  <input v-model="form.address" type="text" name="alamat-1" id="alamat-1" autocomplete="off" placeholder="Masukkan alamat kamu..." class="w-full rounded-xl bg-white/10 text-body-16px text-white h-12 px-3 flex flex-col justify-center placeholder:text-[#CCCCCC] border-2 border-transparent focus:border-[#CCCCCC] focus-visible:outline-none">
                </div>
              </div>
              <div class="relative flex-1 mb-4">
                <label for="alamat-2" class="block text-body-12px-black font-bold text-white">Alamat Baris 2 <sup>*</sup></label>
                <div class="mt-2">
                  <input v-model="form.address_2" type="text" name="alamat-2" id="alamat-2" autocomplete="off" placeholder="Masukkan alamat kamu..." class="w-full rounded-xl bg-white/10 text-body-16px text-white h-12 px-3 flex flex-col justify-center placeholder:text-[#CCCCCC] border-2 border-transparent focus:border-[#CCCCCC] focus-visible:outline-none">
                </div>
              </div>
              <div class="flex flex-col laptop:flex-row justify-start laptop:justify-between gap-4 mb-4">
                <div class="relative flex-1">
                  <label for="country" class="block text-body-12px-black font-bold text-white">Negara</label>
                  <div class="mt-2">
                    <input disabled type="text" name="country" id="country" autocomplete="off" placeholder="Masukkan alamat kamu..." value="Indonesia" class="w-full rounded-xl bg-black/10 text-body-16px text-white h-12 px-3 flex flex-col justify-center placeholder:text-[#CCCCCC] border-2 border-transparent focus:border-[#CCCCCC] focus-visible:outline-none cursor-not-allowed">
                  </div>
                </div>
                <div class="relative flex-1">
                  <label for="province" class="block text-body-12px-black font-bold text-white">Provinsi <sup>*</sup></label>
                  <div class="mt-2">
                    <div class="select-option relative">
                      <select v-model="form.province" @change="triggerGetCity()" id="province" name="province" autocomplete="province-name" class="appearance-none outline-none shadow-none border-none w-full px-3 h-12 rounded-xl bg-white/10 text-body-16px text-white">
                        <option v-if="form.province == null || form.province == ''" value="" selected>Pilih Provinsi</option>
                        <option v-for="(province, index) in listProvince" :value="province.id">{{ province.name }}</option>
                      </select>
                      <span class="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.25 6.875L10 13.125L3.75 6.875" stroke="#CCCCCC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col laptop:flex-row justify-start laptop:justify-between gap-4">
                <div class="relative flex-1">
                  <label for="city" class="block text-body-12px-black font-bold text-white">Kota <sup>*</sup></label>
                  <div class="mt-2">
                    <div class="select-option relative">
                      <select v-model="form.city" :disabled="!form.province" id="city" name="city" autocomplete="city-name" class="appearance-none outline-none shadow-none border-none w-full px-3 h-12 rounded-xl bg-white/10 text-body-16px text-white disabled:cursor-not-allowed">
                        <option value="" selected>Pilih Kota</option>
                        <option v-for="(city, index) in listCity" :value="city.id">{{ city.name }}</option>
                      </select>
                      <span class="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.25 6.875L10 13.125L3.75 6.875" stroke="#CCCCCC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="zipcode relative flex-1">
                  <label for="zipcode" class="block text-body-12px-black font-bold text-white">Kode Pos <sup>*</sup></label>
                  <div class="mt-2">
                    <input v-model="form.zip_code" type="number" max="6" maxlength="6" name="zipcode" id="zipcode" autocomplete="off" placeholder="Masukkan kodepos kamu..." class="zipcode w-full rounded-xl bg-white/10 text-body-16px text-white h-12 px-3 flex flex-col justify-center placeholder:text-[#CCCCCC] border-2 border-transparent focus:border-[#CCCCCC] focus-visible:outline-none">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full laptop:hidden sticky bottom-0 left-0 bg-black p-4 outline-none">
          <button :disabled="!isNotEmpty" type="submit" class="ba text-body-20px-black text-black text-center uppercase py-[18px] px-6 rounded-full bg-[#CDFF3E] disabled:bg-[#CDFF3E]/60">{{ !isLoading ? 'Simpan Perubahan' : 'Harap Tunggu..'}}</button>
        </div>
      </form>
    </div>
    <ModalMessage v-if="modalMessage" :message="modalMessage" @onClose="handleCloseModalMessage" />
  </section>
</template>

<style lang="scss" scoped>
.zipcode{
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>