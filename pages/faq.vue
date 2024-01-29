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
  
  const contents = [
    {
        id: 0,
        type: 'General',
        url: 'general',
        faqs: [
            {
                title: 'Apa itu ULTRAoddinary Leaderboard?',
                paragraph: `Suatu program di bawah naungan brand Ultra Milk yang berkolaborasi K-Pop boy group Stray Kids. Kamu bisa berlomba-lomba untuk mendapatkan poin dan berkompetisi untuk mendapatkan hadiah menarik di akhir periode program. <br/> <br/> Akan terdapat peringkat/posisi yang bisa dilihat setiap harinya di leaderboard utama dan menampilkan urutan posisimu.`
            },
            {
                title: 'Apa itu ULTRAoddinary Point?',
                paragraph: `Poin dalam ULTRAoddinary Leaderboard merupakan pencapaian point Movers dalam suatu kompetisi yang diikuti.`
            },
            {
                title: 'Apa saja benefit bergabung di ULTRAoddinary Leaderboard?',
                paragraph: `
                    <ul>
                        <li>Mendapatkan informasi terkait program Ultra Milk x Stray Kids</li>
                        <li>Mendapatkan point untuk setiap program aktivitas yang ditentukan oleh Ultra Milk</li>
                        <li>Point dapat ditukarkan dengan hadiah menarik</li>
                        <li>Menjadi bagian dari ULTRAoddinary</li>
                    </ul>`
            },
            {
                title: 'Bagaimana cara bergabung di ULTRAoddinary Leaderboard?',
                paragraph: `Kamu bisa sign up/mendaftar dengan menyambungkan account media sosial kamu. <br/> <br/> Satu user hanya diperbolehkan menggunakan satu identitas (nama, alamat, nomor telepon, email) dan setiap identitas hanya boleh terhubung dengan satu user.`
            },
            {
                title: 'Bagaimana cara mendapatkan ULTRAoddinary Point?',
                paragraph: `Kamu bisa mendapatkan point dengan mengikuti aktivitas atau tantangan tertentu yang telah ditentukan oleh Ultra Milk secara konsisten. <br/> <br/> Semakin banyak kamu mengumpulkan point, semakin besar peluang untuk menang di leaderboard.`
            },
            {
                title: 'Bagaimana mengetahui banyaknya point?',
                paragraph: `Kamu dapat melihat rincian pencapaian point di profile kamu, setelah kamu melakukan pendaftaran.`
            },
            {
                title: 'Apakah ULTRAoddinary Point dapat hangus?',
                paragraph: `Seluruh poin tidak akan hangus.`
            },
            {
                title: 'Apakah ULTRAoddinary Point dapat dipindahtangankan',
                paragraph: `Poin tidak dapat di transfer atau di pindah tangankan ke akun lain.`
            },
        ]
    },
    {
        id: 1,
        type: 'Mekanisme Poin',
        url: 'mekanisme-poin',
        faqs: [
            {
                title: 'Bagaimana perhitungan mendapatkan ULTRAoddinary points?',
                paragraph: `
                <table>
                    <thead>
                        <tr>
                            <th>Level</th>
                            <th>Jumlah Poin</th>
                            <th>Deskripsi Aktivitas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span style="background: #0CBFA1; padding: 8px; border-radius: 6px; color: #FFF; font-weight: 700;">Easy</span>
                            </td>
                            <td>
                                <span>10 Poin</span>
                            </td>
                            <td>
                                <span>Aktivitas yang tidak memerlukan effort lebih</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style="background: #FF9700; padding: 8px; border-radius: 6px; color: #FFF; font-weight: 700;">Medium</span>
                            </td>
                            <td>
                                <span>50 Poin</span>
                            </td>
                            <td>
                                <span>Aktivitas yang memerlukan effort lumayan</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style="background: #FF0D41; padding: 8px; border-radius: 6px; color: #FFF; font-weight: 700;">Hard</span>
                            </td>
                            <td>
                                <span>100 Poin</span>
                            </td>
                            <td>
                                <span>Aktivitas yang memerlukan effort besar</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                `
            }
        ]
    },
    {
        id: 2,
        type: 'Penukaran Poin',
        url: 'penukaran-poin',
        faqs: [
            {
                title: 'Apakah ULTRAoddinary Points dapat diuangkan?',
                paragraph: `Tidak bisa! Kamu bisa menukar point dengan “Milk Token”.`
            },
            {
                title: 'Bagaimana cara penukaran ULTRAoddinary Points?',
                paragraph: `Kamu bisa stay tuned di website ini untuk info lebih lanjut!`
            }
        ]
    },
    // {
    //     id: 3,
    //     type: 'Milk Token (TBC)',
    //     url: 'milik-token-tbc',
    //     faqs: [
    //         {
    //             title: 'Apakah itu milk token?',
    //             paragraph: `-`
    //         },
    //         {
    //             title: 'Apa perbedaan ULTRAoddinary Points dengan milk token?',
    //             paragraph: `-`
    //         },
    //         {
    //             title: 'Bagaimana konversi ULTRAoddinary Points ke milk token?',
    //             paragraph: `-`
    //         },
    //     ]
    // },
    {
        id: 4,
        type: 'Lain-Lain',
        url: 'lain-lain',
        faqs: [
            {
                title: 'Apakah Discord Community member akan otomatis bergabung dalam ULTRAoddinary Leaderboard?',
                paragraph: `Tidak. Kamu bisa melakukan pendaftaran secara terpisah melalui website www.icownicpatch.com/ULTRAoddinary`
            },
            {
                title: 'Apa perbedaan Discord community dengan ULTRAoddinary Leaderboard?',
                paragraph: `Discord community merupakan sebuah komunitas untuk para Movers berinteraksi dan forum untuk mengetahui segala informasi mengenai segala aktivitas Ultra Milk dan konten seru lainnya. <br/> <br/> ULTRAoddinary Leaderboard adalah program papan peringkat untuk mendapatkan poin, menunjukkan posisi peringkat dan  ruang kompetisi untuk mendapatkan hadiah super menarik setiap minggunya.`
            },
        ]
    },
]
</script>

<template>
    <div>
      <AppHeader/>
      <main class="main-policy">
        <section class="relative pt-[120px] laptop:pb-[120px] laptop:pt-32">
          <div class="relative container mx-auto px-6 laptop:px-0">
            <div class="py-10 laptop:pt-[120px] laptop:pb-20">
              <h1 class="font-plastic text-[56px] laptop:text-[128px] leading-none text-center text-white mb-[30px]">FAQ</h1>
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
                  <p class="main-policy-dropdown-text text-body-16px-black capitalize">{{ contents[0].type }}</p>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 9.14893L12 16.6489L4.5 9.14893" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="main-policy-sidebar flex flex-col justify-start items-start gap-6 laptop:gap-2 w-full laptop:w-[400px] bg-[#191919] laptop:bg-transparent rounded-b-2xl">
                  <button v-for="(label, index) in contents" :key="index" :data-paragraph="label.url" class="text-body-14px laptop:text-body-20px-black font-bold text-[#CCCCCC] laptop:text-white capitalize px-6 laptop:px-5 laptop:py-[18px] laptop:rounded-full laptop:hover:bg-[#CDFF3E] laptop:hover:text-black">{{ label.type }}</button>
                </div>
              </div>
  
              <div class="relative">
                <div v-for="(groupFaq, key) in contents" v-bind:key="key" :id="groupFaq.url" class="tablet:mb-4 mb-10 main-policy-panel">
                    <h5 ref="targetElTitle" class="text-2xl font-black text-white">{{ groupFaq?.type }}</h5>

                    <Accordion :default-open="true" v-for="(faq, key) in groupFaq?.faqs" v-bind:key="key" class="my-6">
                        <template v-slot:header>
                            <h2 class="font-black text-base tablet:text-xl text-white">{{ faq?.title }}</h2>
                        </template>

                        <template v-slot:body>
                            <div class="px-6 pb-4 text-sm tablet:text-base text-[#CCCCCC] html-renderer" v-html="faq?.paragraph"></div>
                        </template>
                    </Accordion>
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
  .main-policy-sidebar {
    @media(max-width: 1023px){
        padding-top: 0;
        padding-bottom: 0;
        height: 0;
        overflow: hidden;
        transition: height .3s ease-out;
        transform: translateY(-1px);
    }
  
    &.open {
        height: auto;
        overflow: auto;
        padding-top: 16px;
        padding-bottom: 32px;
    }
  }

  .main-policy-dropdown {
    &.active {
        background-color: #191919;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        
        p {
            color: white;
        }
    
        svg {
            transform: rotate(180deg); 
            path {
                stroke: white;
            }
        }
    }
    
    svg {
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
  