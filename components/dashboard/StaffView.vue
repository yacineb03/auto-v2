<script setup lang="ts">
import { ref } from 'vue'
import { 
  Calendar, Clock, User, MessageCircle, 
  ChevronRight, Star, AlertCircle, CheckCircle2,
  MoreHorizontal, MapPin, Send, Search,
  Zap, Brain, ShieldCheck
} from 'lucide-vue-next'

const lessons = ref([
  { 
    id: 1, 
    student: 'Yacine B.', 
    time: '09:00 - 11:00', 
    type: 'Ville & Autoroute', 
    location: 'Gare St-Charles',
    status: 'done',
    rating: 'ok'
  },
  { 
    id: 2, 
    student: 'Sophie L.', 
    time: '11:00 - 13:00', 
    type: 'Manœuvres', 
    location: 'Place Castellane',
    status: 'active',
    rating: null
  },
  { 
    id: 3, 
    student: 'Thomas M.', 
    time: '14:00 - 16:00', 
    type: 'Évaluation', 
    location: 'Vieux-Port',
    status: 'pending',
    rating: null
  },
  { 
    id: 4, 
    student: 'Léa D.', 
    time: '16:00 - 18:00', 
    type: 'Première Leçon', 
    location: 'Agence',
    status: 'pending',
    rating: null
  },
])

const setRating = (lessonId: number, rating: string) => {
  const lesson = lessons.value.find(l => l.id === lessonId)
  if (lesson) lesson.rating = rating
}
</script>

<template>
  <div class="animate-in fade-in duration-1000 space-y-16 pb-32 max-w-[1400px] mx-auto px-4">
    
    <!-- ELITE HEADER INSTRUCTOR -->
    <header class="px-0 sm:px-4 mb-8 sm:mb-12">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
        <!-- Decoration -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

        <div class="flex items-center gap-4 sm:gap-6 relative z-10">
          <div class="w-12 h-12 sm:w-14 sm:h-14 bg-slate-900 text-white rounded-lg flex items-center justify-center shadow-lg shrink-0">
            <Calendar :size="24" />
          </div>
          <div class="min-w-0">
            <h1 class="text-lg sm:text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none truncate">Ma Journée</h1>
            <div class="flex flex-wrap items-center gap-2 mt-1.5 sm:mt-2">
               <span class="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Lundi 09 Février</span>
               <span class="hidden sm:block w-1 h-1 rounded-full bg-slate-200"></span>
               <span class="text-[8px] sm:text-[9px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">4 Leçons Planifiées</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10 w-full lg:w-auto">
          <div class="hidden sm:flex items-center gap-3 px-6 py-3.5 bg-slate-50 border border-slate-100 rounded-lg">
            <div class="text-right">
              <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
              <p class="text-sm font-black text-slate-900 italic">08 Heures</p>
            </div>
          </div>
          
          <button class="bg-indigo-600 text-white px-6 sm:px-8 py-3.5 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all flex items-center justify-between sm:justify-center gap-6 group w-full sm:w-auto">
            <div class="text-left">
              <p class="text-[8px] font-black text-indigo-200 uppercase tracking-widest leading-none mb-1">Prochain élève</p>
              <p class="text-xs sm:text-sm font-black italic group-hover:text-indigo-400 transition-colors uppercase">Sophie L.</p>
            </div>
            <iconify-icon icon="solar:round-alt-arrow-right-bold" width="20" class="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-16">
      
      <!-- MA JOURNÉE : CHRONOLOGICAL LIST (8 COLS) -->
      <div class="xl:col-span-8 space-y-8">
        <div class="flex items-center justify-between px-4">
          <h2 class="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Leçons du jour</h2>
          <div class="flex items-center gap-2 bg-slate-100 p-1.5 rounded-lg px-4 border border-slate-200">
            <Search :size="14" class="text-slate-400" />
            <input type="text" placeholder="RECHERCHER ÉLÈVE..." class="bg-transparent border-none text-[9px] font-black uppercase tracking-widest outline-none w-32" />
          </div>
        </div>

        <div class="space-y-4">
          <div v-for="lesson in lessons" :key="lesson.id" 
            class="group bg-white p-6 rounded-xl border border-slate-50 hover:border-indigo-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden"
            :class="{ 'opacity-60 grayscale-[0.5] bg-slate-50/50': lesson.status === 'done' }"
          >
            <!-- Status vertical bar -->
            <div class="absolute left-0 top-0 bottom-0 w-1 transition-colors duration-500"
              :class="{ 'bg-emerald-500': lesson.status === 'done', 'bg-indigo-600': lesson.status === 'active', 'bg-slate-200': lesson.status === 'pending' }"
            ></div>
 
            <div class="flex items-center gap-8">
              <!-- Time Icon Box -->
              <div class="min-w-[80px] h-20 rounded-lg bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0 group-hover:bg-white group-hover:border-indigo-100 transition-all">
                <Clock :size="18" class="text-slate-300 group-hover:text-indigo-600 mb-1" />
                <span class="text-sm font-black text-slate-900 italic tabular-nums leading-none">{{ lesson.time.split(' ')[0] }}</span>
              </div>
 
              <div class="space-y-1.5">
                <div class="flex items-center gap-3">
                   <h3 class="text-xl font-black text-slate-900 uppercase tracking-tighter">{{ lesson.student }}</h3>
                   <span v-if="lesson.status === 'active'" class="flex items-center gap-1.5 px-2 py-0.5 bg-slate-900 text-white rounded text-[7px] font-black uppercase tracking-widest animate-pulse">
                     <span class="w-1 h-1 rounded-full bg-emerald-400"></span> Session Live
                   </span>
                </div>
                <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] font-black uppercase tracking-widest">
                   <span class="flex items-center gap-1.5 text-slate-400"><MapPin :size="12" /> {{ lesson.location }}</span>
                   <span class="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded italic">{{ lesson.type }}</span>
                </div>
              </div>
            </div>
 
            <!-- FICHE NOTATION ELITE -->
            <div class="flex flex-col md:items-end gap-3 min-w-[200px]">
               <p class="text-[8px] font-black text-slate-300 uppercase tracking-widest">Compte Rendu</p>
               <div class="flex gap-1.5">
                  <button 
                    @click="setRating(lesson.id, 'bad')"
                    :class="['px-4 py-2.5 rounded-lg font-black text-[8px] uppercase tracking-widest transition-all border', lesson.rating === 'bad' ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-rose-200 hover:text-rose-500']"
                  >
                    Niveau bas
                  </button>
                  <button 
                    @click="setRating(lesson.id, 'medium')"
                    :class="['px-4 py-2.5 rounded-lg font-black text-[8px] uppercase tracking-widest transition-all border', lesson.rating === 'medium' ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-amber-200 hover:text-amber-500']"
                  >
                    Moyen
                  </button>
                  <button 
                    @click="setRating(lesson.id, 'ok')"
                    :class="['px-4 py-2.5 rounded-lg font-black text-[8px] uppercase tracking-widest transition-all border', lesson.rating === 'ok' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200 hover:text-emerald-500']"
                  >
                    Maîtrisé
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SIDEBAR: CHAT & TOOLS -->
      <div class="xl:col-span-4 space-y-12">
        <div class="bg-white rounded-xl border border-slate-100 p-8 shadow-sm flex flex-col h-[500px] relative overflow-hidden">
           <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50 -translate-y-10 translate-x-10"></div>
           <div class="flex items-center justify-between mb-8 relative z-10">
              <div class="flex items-center gap-4">
                 <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                    <MessageCircle :size="24" />
                 </div>
                 <div>
                    <h3 class="font-black text-slate-900 text-sm uppercase tracking-widest leading-none">Flash Messages</h3>
                    <p class="text-indigo-600 text-[10px] font-bold uppercase mt-1">Ligne Directe</p>
                 </div>
              </div>
              <div class="relative">
                 <div class="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>
           </div>
           
           <div class="flex-1 overflow-y-auto space-y-6 px-2 scrollbar-hide py-4 border-t border-slate-50 relative z-10">
              <div class="space-y-2">
                 <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secrétariat • 10:24</p>
                 <p class="bg-slate-50 p-4 rounded-xl rounded-tl-none text-xs leading-relaxed font-semibold text-slate-700 border border-slate-100">
                    "Salut Gabriel, Léa aura 15min de retard pour sa leçon de 16h."
                 </p>
              </div>
              <div class="space-y-2 text-right">
                 <p class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Moi • 10:26</p>
                 <p class="bg-indigo-600 p-4 rounded-xl rounded-tr-none text-xs leading-relaxed font-semibold inline-block text-left text-white shadow-lg shadow-indigo-100">
                    "Ça marche, je décale la fin de séance aussi."
                 </p>
              </div>
           </div>

           <div class="pt-6 relative z-10">
              <input type="text" placeholder="ÉCRIRE..." 
                class="w-full bg-slate-50 border border-slate-200 rounded-lg py-4 px-6 text-[10px] font-black uppercase tracking-widest outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400" />
              <button class="absolute right-4 top-[2.1rem] text-slate-900 hover:text-indigo-600 transition-colors">
                 <Send :size="18" />
              </button>
           </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.animate-in { animation-duration: 1s; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
