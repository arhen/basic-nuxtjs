<template>
  <div>
    <AppHeader/>
    <main class="main-policy">
      <section class="relative pt-[120px] laptop:pb-[120px] laptop:pt-32">
        <div class="relative container mx-auto px-6 laptop:px-0">
          <div class="py-10 laptop:pt-[120px] laptop:pb-20">
            <h1 class="font-plastic text-[56px] laptop:text-[128px] leading-none text-center text-white mb-[30px]">Privacy Policy</h1>
            <div class="flex flex-row flex-wrap laptop:flex-nowrap justify-between items-center">
              <img src="/images/skz-element-5.svg" alt="Element" width="92" height="92" loading="lazy" class="w-7 h-auto laptop:w-[92px]">
              <img src="/images/skz-element-8.svg" alt="Element" width="119" height="119" loading="lazy" class="w-10 h-auto laptop:w-[119px]">
              <img src="/images/skz-element-3.svg" alt="Element" width="92" height="92" loading="lazy" class="w-7 h-auto laptop:w-[92px] rotate-[-30deg]">
              <img src="/images/skz-element-4.svg" alt="Element" width="104" height="104" loading="lazy" class="w-7 h-auto laptop:w-[104px]">
              <img src="/images/skz-element-7.svg" alt="Element" width="126" height="126" loading="lazy" class="w-10 h-auto laptop:w-[126px]">
              <img src="/images/skz-element-1.svg" alt="Element" width="104" height="104" loading="lazy" class="w-7 h-auto laptop:w-[104px] rotate-[-15deg]">
              <img src="/images/skz-element-6.svg" alt="Element" width="112" height="112" loading="lazy" class="w-10 h-auto laptop:w-[112px]">
              <img src="/images/skz-element-9.svg" alt="Element" width="92" height="92" loading="lazy" class="w-7 h-auto laptop:w-[92px]">
            </div>
          </div>
          <div class="main-policy-content flex flex-col laptop:flex-row justify-between items-start gap-0 laptop:gap-4 relative">
            <div id="pinSection" class="sticky top-[120px] laptop:top-32 left-0 w-full laptop:w-auto laptop:inline-block z-10 pb-8 laptop:pb-0">
              <div class="main-policy-dropdown laptop:hidden flex flex-row justify-between items-center w-full px-6 py-4 rounded-2xl bg-[#CDFF3E]">
                <p class="main-policy-dropdown-text text-body-16px-black capitalize">{{ contents[0].title }}</p>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5 9.14893L12 16.6489L4.5 9.14893" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="main-policy-sidebar flex flex-col justify-start items-start gap-6 laptop:gap-2 w-full laptop:w-[400px] bg-[#191919] laptop:bg-transparent rounded-b-2xl">
                <button v-for="(label, index) in contents" :key="index" :data-paragraph="label.url" class="text-body-14px laptop:text-body-20px-black font-bold text-[#CCCCCC] laptop:text-white capitalize px-6 laptop:px-5 laptop:py-[18px] laptop:rounded-full laptop:hover:bg-[#CDFF3E] laptop:hover:text-black text-left">{{ label.title }}</button>
              </div>
            </div>

            <div class="relative">
              <div v-for="(content) in contents" :key="content.id" :id="content.url" class="main-policy-panel mb-8">
                <p class="text-body-20px-bold laptop:text-body-24px-bold text-white mb-4">{{ content.title }}</p>
                <p class="text-body-16px text-[#cccccc]" v-html="content.desc"></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <AppFooter/>
  </div>
</template>

<style lang="scss" scoped>
.main-policy-sidebar{
@media(max-width: 1023px){
  padding-top: 0;
  padding-bottom: 0;
  height: 0;
  overflow: hidden;
  transition: height .3s ease-out;
  transform: translateY(-1px);
}

&.open{
  height: auto;
  overflow: auto;
  padding-top: 16px;
  padding-bottom: 32px;
}
}
.main-policy-dropdown{
&.active{
  background-color: #191919;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  
  p{
    color: white;
  }

  svg{
    transform: rotate(180deg);

    path{
      stroke: white;
    }
  }
}

svg{
  transition: transform .1s ease-in-out;
}
}
</style>

<script setup>
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRuntimeConfig } from "nuxt/app"

const config = useRuntimeConfig()

if(config?.public?.enablePhase2 === '0'){
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const tableText = ref(null)
const optionMenu = ref(null)
const selectBtn = ref(null)
const options = ref(null)

onMounted(() => {
  optionMenu.value = document.querySelector(".main-policy-sidebar")
  selectBtn.value = document.querySelector(".main-policy-dropdown")
  options.value = document.querySelectorAll(".main-policy-sidebar button")

  ScrollTrigger.clearScrollMemory()
  ScrollTrigger.refresh()

  scrollToTnc()
  scrollSpyTnc()
  openDropdown()
})

const openDropdown = () => {
  selectBtn.value.addEventListener("click", (event) => {
    event.preventDefault();
    let text = document.querySelector(".main-policy-dropdown-text")
    if(text.innerHTML === "Choose document"){
      if(tableText.value !== null){
        text.innerHTML = tableText.value
      }else{
        text.innerHTML = contents[0].title
      }
    }else{
      text.innerHTML = "Choose document"
    }
    selectBtn.value.classList.toggle('active');
    optionMenu.value.classList.toggle('open');
  });
}

const scrollToTnc = () => {
document.querySelectorAll(".main-policy-sidebar button").forEach((item, index) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    let target = item.getAttribute('data-paragraph');
    if(window.matchMedia("(max-width: 1023px)")){
      selectBtn.value.classList.remove('active');
      optionMenu.value.classList.remove('open');
      setTimeout(() => {
        gsap.to(window, { duration: 1, scrollTo: { y: "#"+target, offsetY: 210 } });
      }, 100);
    }else{
      gsap.to(window, { duration: 1, scrollTo: { y: "#"+target, offsetY: 130 } });
    }
  });
});
}

const scrollSpyTnc = () => {
  const panels = gsap.utils.toArray(".main-policy-panel");
  const sidebars = gsap.utils.toArray(".main-policy-sidebar button");
  let mm = gsap.matchMedia();

  panels.forEach((panel, i) => {
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top =+160px",
        end: "max",
        id: i + 1,
        onEnter: () => {
          if(sidebars[i]){
            document.querySelectorAll('.activetable').forEach((element) => {
              element.classList.remove('activetable');
            })
            sidebars[i].classList.add("activetable")
          }
        }, 
        onLeaveBack: () => {
          if(sidebars[i]){
            document.querySelectorAll('.activetable').forEach((element) => {
              element.classList.remove('activetable');
            })
            if(i !== 0){
              sidebars[i-1].classList.add("activetable")
            }
          }
        }, 
      })
    });

    mm.add("(max-width: 1023px)", () => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top =+212px",
        end: "max",
        id: i + 1,
        onEnter: () => {
          if(sidebars[i]){
            tableText.value = sidebars[i].innerText
            document.querySelector(".main-policy-dropdown-text").innerHTML = tableText.value
          }
        }, 
        onLeaveBack: () => {
          if(i !== 0){
            tableText.value = sidebars[i-1].innerText
            document.querySelector(".main-policy-dropdown-text").innerHTML = tableText.value
          }
        }, 
      })
    });
    
  });
}

const contents = reactive([
{
  id: 1,
  title: 'Kebijakan Privasi',
  url: 'kebijakan-privasi',
  desc: `Website <strong><u><a target="_blank" href="https://www.icownicpatch.com/">https://www.icownicpatch.com/</a></u></strong> dimiliki oleh Ultra Milk, yang akan menjadi pengontrol atas data pribadi Anda. Kami telah mengadopsi kebijakan privasi ini untuk menjelaskan bagaimana kami memproses informasi yang dikumpulkan oleh <strong><u><a target="_blank" href="https://www.icownicpatch.com/">https://www.icownicpatch.com/</a></u></strong>, yang juga menjelaskan alasan mengapa kami perlu mengumpulkan data pribadi tertentu tentang Anda. Oleh karena itu, Anda harus membaca kebijakan privasi ini sebelum menggunakan website <strong><u><a target="_blank" href="https://www.icownicpatch.com/">https://www.icownicpatch.com/</a></u></strong>. Kami menjaga data pribadi Anda dan berjanji untuk menjamin kerahasiaan dan keamanannya.`,
},
{
  id: 2,
  title: 'Informasi pribadi yang kami kumpulkan',
  url: 'informasi-pribadi-yang-kami-kumpulkan',
  desc: `Saat Anda mengunjungi <strong><u><a target="_blank" href="https://www.icownicpatch.com/">https://www.icownicpatch.com/</a></u></strong>, kami secara otomatis mengumpulkan informasi tertentu mengenai perangkat Anda, termasuk informasi tentang browser web, alamat IP, zona waktu, dan sejumlah cookie yang terinstal di perangkat Anda. Selain itu, selama Anda menjelajahi website, kami mengumpulkan informasi tentang setiap halaman web atau produk yang Anda lihat, website atau istilah pencarian apa yang mengarahkan Anda ke website, dan cara Anda berinteraksi dengan website. Kami menyebut informasi yang dikumpulkan secara otomatis ini sebagai "Informasi Perangkat". Kemudian, kami mungkin akan mengumpulkan data pribadi yang Anda berikan kepada kami (termasuk tetapi tidak terbatas pada nama, alamat, informasi pembayaran, dll) selama pendaftaran untuk dapat memenuhi perjanjian.`,
},
{
  id: 3,
  title: 'Mengapa kami memproses data Anda?',
  url: 'mengapa-kami-memproses-data-anda',
  desc: `Menjaga data pelanggan agar tetap aman adalah prioritas utama kami. Oleh karena itu, kami hanya dapat memproses sejumlah kecil data pengguna, sebanyak yang benar-benar diperlukan untuk menjalankan website. Informasi yang dikumpulkan secara otomatis hanya digunakan untuk mengidentifikasi kemungkinan kasus penyalahgunaan dan menyusun informasi statistik terkait penggunaan website. Informasi statistik ini tidak digabungkan sedemikian rupa hingga dapat mengidentifikasi pengguna tertentu dari sistem. Anda dapat mengunjungi website tanpa memberi tahu kami identitas Anda atau mengungkapkan informasi apa pun, yang dapat digunakan oleh seseorang untuk mengidentifikasi Anda sebagai individu tertentu yang dapat dikenali. Namun, jika Anda ingin menggunakan beberapa fitur website, atau Anda ingin menerima newsletter kami atau memberikan detail lainnya dengan mengisi formulir, Anda dapat memberikan data pribadi kepada kami, seperti email, nama depan, nama belakang, kota tempat tinggal, organisasi, dan nomor telepon Anda. Anda dapat memilih untuk tidak memberikan data pribadi Anda kepada kami, tetapi Anda mungkin tidak dapat memanfaatkan beberapa fitur website. Contohnya, Anda tidak akan dapat menerima Newsletter kami atau menghubungi kami secara langsung dari website. Pengguna yang tidak yakin tentang informasi yang wajib diberikan dapat menghubungi kami melalui akun Official Instagram Ultra Milk di <strong><u><a target="_blank" href="https://www.instagram.com/ultra_mym/">@ultra_mym</a></u/></strong>.`,
},
{
  id: 4,
  title: 'Hak-hak Anda',
  url: 'hak-hak-anda',
  desc: `Jika Anda seorang warga Eropa, Anda memiliki hak-hak berikut terkait data pribadi Anda: Hak untuk mendapatkan penjelasan. Hak atas akses. Hak untuk memperbaiki. Hak untuk menghapus. Hak untuk membatasi pemrosesan. Hak atas portabilitas data. Hak untuk menolak. Hak-hak terkait pengambilan keputusan dan pembuatan profil otomatis. Jika Anda ingin menggunakan hak ini, silahkan hubungi kami melalui informasi kontak di bawah ini. Selain itu, jika Anda seorang warga Eropa, perlu diketahui bahwa kami akan memproses informasi Anda untuk memenuhi kontrak yang mungkin kami miliki dengan Anda (misalnya, jika Anda melakukan pemesanan melalui website), atau untuk memenuhi kepentingan bisnis sah kami seperti yang tercantum di atas. Di samping itu, harap diperhatikan bahwa informasi Anda mungkin dapat dikirim ke luar Eropa, termasuk Kanada dan Amerika Serikat.`,
},
{
  id: 5,
  title: `Link ke website lain`,
  url: 'link-ke-website-lain',
  desc: `Website kami mungkin berisi tautan ke website lain yang tidak dimiliki atau dikendalikan oleh kami. Perlu diketahui bahwa kami tidak bertanggung jawab atas praktik privasi website lain atau pihak ketiga. Kami menyarankan Anda untuk selalu waspada ketika meninggalkan website kami dan membaca pernyataan privasi setiap website yang mungkin mengumpulkan informasi pribadi.`,
},
{
  id: 6,
  title: 'Integrasi Sosial Media',
  url: 'integrasi-sosial-media',
  desc: `Kami mendeteksi aktivitas pengguna di akun Instagram dan TikTok yang terintegrasi dengan <strong><u><a target="_blank" href="https://www.icownicpatch.com/">https://www.icownicpatch.com/</a></u></strong> untuk kebutuhan pengumpulan poin dari aktivitas yang terjadi di sosial media. Kami hanya mengambil data dari akun media sosial Anda yang memenuhi syarat dan ketentuan setiap aktivitas yang sudah ditentukan dan dikomunikasikan di Instagram <strong><u><a target="_blank" href="https://www.instagram.com/ultra_mym/">@ultra_mym</a></u/></strong> untuk kemudian dikonversikan menjadi ULTRAoddinary poin.`,
},
{
  id: 7,
  title: 'Pengungkapan Hukum',
  url: 'pengungkapan-hukum',
  desc: `Kami akan mengungkapkan informasi apa pun yang kami kumpulkan, gunakan, atau terima jika diwajibkan atau diizinkan oleh hukum, misalnya untuk mematuhi panggilan pengadilan atau proses hukum serupa, dan jika kami percaya dengan itikad baik bahwa pengungkapan diperlukan untuk melindungi hak kami, melindungi keselamatan Anda atau keselamatan orang lain, menyelidiki penipuan, atau menanggapi permintaan dari pemerintah.`,
},
{
  id: 7,
  title: 'Informasi Kontak',
  url: 'informasi-kontak',
  desc: `Jika Anda ingin menghubungi kami untuk mempelajari kebijakan ini lebih lanjut atau menanyakan masalah apa pun yang berkaitan dengan hak perorangan dan informasi pribadi Anda, silahkan menghubungi akun Official Instagram Ultra Milk Make Your Move di <strong><u><a target="_blank" href="https://www.instagram.com/ultra_mym/">@ultra_mym</a></u/></strong>.`,
},
]);

</script>
