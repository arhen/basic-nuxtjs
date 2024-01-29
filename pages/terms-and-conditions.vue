<template>
    <div>
      <AppHeader/>
      <main class="main-tnc">
        <section class="relative pt-[120px] laptop:pb-[120px] laptop:pt-32">
          <div class="relative container mx-auto px-6 laptop:px-0">
            <div class="py-10 laptop:pt-[120px] laptop:pb-20">
              <h1 class="font-plastic text-[56px] laptop:text-[128px] leading-none text-center text-white mb-[30px]">SYARAT DAN KETENTUAN</h1>
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
            <div class="main-tnc-content flex flex-col laptop:flex-row justify-between items-start gap-0 laptop:gap-4 relative">
              <div id="pinSection" class="sticky top-[120px] laptop:top-32 left-0 w-full laptop:w-auto laptop:inline-block z-10 pb-8 laptop:pb-0">
                <div class="main-tnc-dropdown laptop:hidden flex flex-row justify-between items-center w-full px-6 py-4 rounded-2xl bg-[#CDFF3E]">
                  <p class="main-tnc-dropdown-text text-body-16px-black capitalize">{{ contents[0].title }}</p>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 9.14893L12 16.6489L4.5 9.14893" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="main-tnc-sidebar flex flex-col justify-start items-start gap-6 laptop:gap-2 w-full laptop:w-[400px] bg-[#191919] laptop:bg-transparent rounded-b-2xl">
                  <button v-for="(label, index) in contents" :key="index" :data-paragraph="label.url" class="text-body-14px laptop:text-body-20px-black font-bold text-[#CCCCCC] laptop:text-white capitalize px-6 laptop:px-5 laptop:py-[18px] laptop:rounded-full laptop:hover:bg-[#CDFF3E] laptop:hover:text-black">{{ label.title }}</button>
                </div>
              </div>
  
              <div class="relative">
                <div v-for="(content) in contents" :key="content.id" :id="content.url" class="main-tnc-panel mb-8">
                  <p class="text-body-20px-bold laptop:text-body-24px-bold text-white mb-4">{{ content.title }}</p>
                  <div class="px-6 pb-4 text-sm tablet:text-base text-[#CCCCCC] html-renderer" v-html="content?.desc"></div>
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
.main-tnc-sidebar{
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
.main-tnc-dropdown{
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

:deep(.html-renderer) {
    ul {
        @apply list-decimal pl-4;
        li {
          @apply mb-2;
        }
    }

    table {
        @apply w-full;

        th {
            @apply font-black text-white text-base tablet:text-xl;
        }
        td, th {
            @apply border border-[#333333] p-3 tablet:p-6 text-xs tablet:text-base;
        }
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
  optionMenu.value = document.querySelector(".main-tnc-sidebar")
  selectBtn.value = document.querySelector(".main-tnc-dropdown")
  options.value = document.querySelectorAll(".main-tnc-sidebar button")

  ScrollTrigger.clearScrollMemory()
  ScrollTrigger.refresh()

  scrollToTnc()
  scrollSpyTnc()
  openDropdown()
})

const openDropdown = () => {
  selectBtn.value.addEventListener("click", (event) => {
    event.preventDefault();
    let text = document.querySelector(".main-tnc-dropdown-text")
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
  document.querySelectorAll(".main-tnc-sidebar button").forEach((item, index) => {
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
  const panels = gsap.utils.toArray(".main-tnc-panel");
  const sidebars = gsap.utils.toArray(".main-tnc-sidebar button");
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
            document.querySelector(".main-tnc-dropdown-text").innerHTML = tableText.value
          }
        }, 
        onLeaveBack: () => {
          if(i !== 0){
            tableText.value = sidebars[i-1].innerText
            document.querySelector(".main-tnc-dropdown-text").innerHTML = tableText.value
          }
        }, 
      })
    });
    
  });
}

const contents = reactive([
  {
    id: 1,
    title: 'General',
    url: 'general',
    desc: `
      <ul>
        <li>Loyalty Program ini diadakan oleh Ultra Milk dan/atau pihak yang ditunjuk oleh Ultra Milk (secara kolektif atau secara sendiri-sendiri disebut sebagai “Panitia” atau “kami”) melalui situs <strong><u><a href="https://www.icownicpatch.com/ULTRAoddinary" target="_blank">https://www.icownicpatch.com/ULTRAoddinary</a></u></strong> dan ditujukan untuk seluruh kalangan masyarakat Indonesia.</li>
        <li>Ultra Milk tidak pernah dan tidak akan meminta uang kepada peserta program, dalam hal apa pun.</li>
        <li>Dengan mendaftarkan diri pada ULTRAoddinary Leaderboard, maka kamu menjadi Peserta Program ini dan dianggap telah membaca, memahami, dan menyetujui syarat serta ketentuan yang berlaku.</li>
        <li>Kebijakan Privasi Program ULTRAoddinary Leaderboard menjelaskan cara kami menangani dan melindungi data pribadi peserta sehubungan dengan keikutsertaan peserta dalam program ini, dengan menyetujui syarat dan ketentuan untuk dapat berpartisipasi dalam program. Peserta juga menyetujui Kebijakan Privasi ULTRAoddinary Points.</li>
        <li>Periode Program berlangsung sampai dengan September 2024.</li>
        <li>Panitia berhak mendiskualifikasi peserta yang melanggar syarat dan ketentuan yang telah ditetapkan.</li>
        <li>Panitia berhak untuk melakukan pengubahan, penambahan, dan/atau pengurangan syarat serta ketentuan yang berlaku tanpa melakukan pemberitahuan terlebih dahulu.</li>
        <li>Panitia tidak memungut biaya melalui media apa pun bagi peserta yang mengikuti kegiatan ini.</li>
        <li>Keputusan yang dibuat oleh panitia adalah final dan mutlak serta tidak dapat diganggu gugat.</li>
        <li>Dengan mengikuti program ini, peserta setuju untuk terikat dengan syarat dan ketentuan.</li>
        <li>Hadiah akan dikirimkan maksimal 60 hari kerja setelah peserta mengisi data diri saat penukaran poin.</li>
        <li>Program ini tertutup untuk seluruh karyawan Ultra Milk, agensi, & pihak lain beserta keluarganya, yang berhubungan dengan penyelenggaraan program ini.</li>
      </ul>
    `,
  },
  {
    id: 2,
    title: 'Pembebasan Tanggung Jawab',
    url: 'pembebasan-tanggung-jawab',
    desc: `
      <ul>
        <li>Panitia tidak bertanggung jawab atas kerugian dan/atau kerusakan akibat kejadian luar biasa yang tidak terduga dan/atau kejadian di luar kuasa panitia seperti gempa bumi, tanah longsor, angin topan, petir, banjir besar, kebakaran, wabah penyakit, pemogokan massal, pemberontakan atau tindakan militer lainnya, perang, sabotase, huru-hara, tindakan pemerintah, kegagalan sistem, pemblokiran, dan peretasan situs.</li>
        <li>Panitia tidak bertanggung jawab atas keterlambatan, penundaan, kehilangan atau kerusakan sehubungan pengiriman melalui jasa kurir/ekspedisi.</li>
        <li>Panitia tidak bertanggung jawab untuk setiap kerugian dan/atau kerusakan yang dengan cara apa pun terjadi dikarenakan kesepakatan, kesalahan, kelalaian atau hal-hal lain, yang terkait dengan kompetisi dan hadiah-hadiah yang disediakan.</li>
        <li>Ultra Milk tidak bertanggung jawab atas setiap tindakan peserta, komentar, foto, potret, video, dan konten apa pun yang di-share atau diunggah oleh peserta baik di-website maupun di sosial media (apabila ada), dengan demikian peserta bertanggung jawab penuh atas setiap tindakan peserta, komentar, foto, potret, video, dan konten tersebut.</li>
      </ul>
    `,
  },
  {
    id: 3,
    title: 'Lain-lain',
    url: 'lain-lain',
    desc: `
      <ul>
        <li>Panitia memiliki hak untuk memperpanjang dan/atau menghentikan program setiap saat dalam durasi yang telah direncanakan tanpa pemberitahuan terlebih dahulu.</li>
        <li>Panitia tidak bertanggung jawab atas setiap kerugian dan/atau kerusakan yang diakibatkan oleh perpanjangan dan/atau pengakhiran program ini.</li>
        <li>Dengan berpartisipasi dalam program, maka peserta secara otomatis telah menyetujui foto, potret, video atau konten apa pun yang diunggah atau dibagikan oleh peserta (apabila ada) akan menjadi hak milik dari Ultra Milk sepenuhnya dan Ultra Milk dapat menggunakan foto, potret, video atau konten tersebut untuk kepentingan Ultra Milk dalam bentuk apa pun termasuk pada kebutuhan promosi, mem-post/repost foto, potret, video/konten peserta di media sosial sosial tanpa pemberitahuan sebelumnya kepada pemilik foto, potret, video/konten.</li>
      </ul>
    `,
  }
]);

</script>
