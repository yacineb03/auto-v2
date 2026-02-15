<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  TrendingUp, Users, Clock, Trophy, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Calendar, Wallet, Target, UserPlus, LogOut
} from 'lucide-vue-next'

const { logout } = useAuth()
const router = useRouter()

interface Props {
  user: any
}

const props = defineProps<Props>()

const stats = [
  { 
    label: "Chiffre d'affaires", 
    value: '42 500 €', 
    trend: '+12%', 
    trendUp: true, 
    icon: Wallet, 
    color: 'text-indigo-600', 
    bg: 'bg-indigo-50',
    chartColor: 'bg-indigo-600'
  },
  { 
    label: 'Élèves Actifs', 
    value: '148', 
    trend: '+5%', 
    trendUp: true, 
    icon: Users, 
    color: 'text-orange-600', 
    bg: 'bg-orange-50',
    chartColor: 'bg-orange-600'
  },
  { 
    label: 'Heures Volant', 
    value: '850h', 
    trend: '-2%', 
    trendUp: false, 
    icon: Clock, 
    color: 'text-pink-600', 
    bg: 'bg-pink-50',
    chartColor: 'bg-pink-600'
  },
  { 
    label: 'Taux de Réussite', 
    value: '88%', 
    trend: '=', 
    trendUp: null, 
    icon: Trophy, 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50',
    chartColor: 'bg-emerald-600'
  },
]

const activityData = [
  { month: 'Mai', value: 40 },
  { month: 'Juin', value: 65 },
  { month: 'Juil', value: 50 },
  { month: 'Août', value: 85 },
  { month: 'Sept', value: 95, current: true },
  { month: 'Oct', value: 55 },
]

const recentStudents = [
  { name: 'Félix P.', time: 'il y a 2h', type: 'Permis B', detail: 'Pack Zen (20h)', avatar: 'FP' },
  { name: 'Alice D.', time: 'il y a 5h', type: 'Code', detail: 'En ligne', avatar: 'AD' },
  { name: 'Bob M.', time: 'hier', type: 'Conduite Acc.', detail: 'Pack Famille', avatar: 'BM' },
]
</script>

<template>
  <div class="animate-in fade-in duration-1000 space-y-16 pb-32 max-w-[1400px] mx-auto px-4">
    
    <!-- ELITE HEADER ADMIN -->
    <header class="px-0 sm:px-4 mb-8 sm:mb-12">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
        <!-- Decoration -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

        <div class="flex items-center gap-4 sm:gap-6 relative z-10 font-sans">
          <div class="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100 shrink-0">
            <TrendingUp :size="24" class="sm:hidden" />
            <TrendingUp :size="28" class="hidden sm:block" />
          </div>
          <div class="min-w-0">
            <h1 class="text-lg sm:text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none truncate">Vue Globale</h1>
            <div class="flex flex-wrap items-center gap-2 mt-1.5 sm:mt-2">
               <span class="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Octobre 2023</span>
               <span class="hidden sm:block w-1 h-1 rounded-full bg-slate-200"></span>
               <span class="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                 <div class="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                 Perf +12%
               </span>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 relative z-10 w-full lg:w-auto">
           <button class="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-all">
              <Calendar :size="14" /> <span class="hidden sm:inline">Personnaliser</span><span class="sm:hidden">Options</span>
           </button>
           <button class="bg-slate-900 text-white px-6 py-3 rounded-lg font-black text-[9px] uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3">
             Générer Rapport <iconify-icon icon="solar:document-text-bold" width="16" />
           </button>
        </div>
      </div>
    </header>

    <!-- ELITE KPI CARDS -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
      <div v-for="stat in stats" :key="stat.label" class="group relative">
        <div class="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-xl transition-all duration-700 relative overflow-hidden">
          <!-- Subtle decoration -->
          <div :class="['absolute -right-4 -top-4 w-32 h-32 rounded-full blur-3xl opacity-20 transition-transform duration-700 group-hover:scale-150', stat.bg]"></div>
          
          <div class="flex items-start justify-between mb-8 relative z-10">
             <div :class="['w-14 h-14 rounded-lg flex items-center justify-center border border-white shadow-sm', stat.bg, stat.color]">
                <component :is="stat.icon" :size="24" stroke-width="2.5" />
             </div>
             <div v-if="stat.trendUp !== null" :class="['px-2.5 py-1 rounded-lg text-[9px] font-black italic flex items-center gap-1 border border-white shadow-sm', stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600']">
                {{ stat.trend }}
                <component :is="stat.trendUp ? ArrowUpRight : ArrowDownRight" :size="10" stroke-width="3" />
             </div>
          </div>
 
          <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 relative z-10">{{ stat.label }}</p>
          <h3 class="text-3xl font-black text-slate-900 italic tracking-tighter tabular-nums relative z-10 leading-none">{{ stat.value }}</h3>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT GRID -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 px-4">
      
      <!-- FINANCIAL CHART (8 COLS) -->
      <div class="lg:col-span-8 space-y-8">
        <div class="bg-white p-10 md:p-14 rounded-xl border border-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div class="flex justify-between items-center mb-12 relative">
            <div>
              <h3 class="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Activité Financière</h3>
              <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Évolution des revenus mensuels</p>
            </div>
            <button class="w-12 h-12 rounded-lg bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center">
              <MoreHorizontal :size="24" />
            </button>
          </div>

          <!-- CHART CANVAS -->
          <div class="h-80 flex items-end gap-3 md:gap-8 relative pb-8">
            <!-- Y-Axis Lines -->
            <div class="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none">
              <div v-for="i in 5" :key="i" class="border-b border-dashed border-slate-50 w-full h-0"></div>
              <div class="border-b-2 border-slate-100 w-full h-0"></div>
            </div>

            <!-- Bars -->
            <div v-for="item in activityData" :key="item.month" class="flex-1 flex flex-col items-center justify-end group z-10 relative h-full">
              <!-- Value Tooltip -->
              <div class="opacity-0 group-hover:opacity-100 absolute bottom-full mb-4 bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-md transition-all scale-75 group-hover:scale-100">
                {{ item.value }}k€
              </div>
              
              <!-- Bar -->
              <div 
                class="w-full max-w-[50px] rounded-t-lg transition-all duration-700 cursor-pointer"
                :class="[item.current ? 'bg-indigo-600 shadow-2xl shadow-indigo-200' : 'bg-slate-100 hover:bg-slate-200']"
                :style="{ height: item.value + '%' }"
              ></div>
              
              <!-- Label -->
              <span class="absolute top-full mt-4 text-[10px] font-black uppercase tracking-widest" :class="item.current ? 'text-indigo-600' : 'text-slate-400'">
                {{ item.month }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- RECENT REGISTRATIONS (4 COLS) -->
      <div class="lg:col-span-4 space-y-8">
        <div class="bg-white p-10 rounded-xl border border-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.03)] flex flex-col h-full">
          <div class="mb-10">
            <h3 class="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Derniers Inscrits</h3>
            <p class="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Nouveaux membres du réseau</p>
          </div>

          <div class="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-hide">
            <div v-for="student in recentStudents" :key="student.name" class="flex items-center gap-6 group cursor-pointer p-4 -mx-4 rounded-xl hover:bg-slate-50 transition-all">
              <div class="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center font-black text-slate-400 italic text-sm group-hover:bg-white group-hover:text-indigo-600 shadow-inner group-hover:shadow-sm transition-all border border-transparent group-hover:border-slate-100">
                {{ student.avatar }}
              </div>
              <div class="flex-1">
                <p class="text-sm font-black text-slate-900 uppercase tracking-tight leading-none mb-1">{{ student.name }}</p>
                <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{{ student.time }}</p>
              </div>
              <div class="text-right">
                <p class="text-[10px] font-black text-indigo-600 italic leading-none mb-1">{{ student.type }}</p>
                <p class="text-[8px] font-bold text-slate-300 uppercase leading-none">{{ student.detail }}</p>
              </div>
            </div>
          </div>

          <button class="mt-10 w-full py-5 rounded-xl bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
            Voir tous les élèves
          </button>
        </div>
      </div>

    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
      <button class="p-8 bg-white border border-slate-100 text-slate-900 rounded-xl shadow-sm hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all text-center group">
        <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <UserPlus :size="24" />
        </div>
        <p class="text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-indigo-600 transition-colors">Inscrire Éléve</p>
      </button>
      <NuxtLink to="/planning" class="p-8 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-indigo-200 transition-all text-center group block">
        <div class="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <Calendar :size="24" />
        </div>
        <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Ouvrir Planning</p>
      </NuxtLink>
      <button class="p-8 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-indigo-200 transition-all text-center group">
        <div class="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <Wallet :size="24" />
        </div>
        <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Facturation</p>
      </button>
      <button class="p-8 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-indigo-200 transition-all text-center group">
        <div class="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <Target :size="24" />
        </div>
        <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Objectifs Réseau</p>
      </button>
    </div>

  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
