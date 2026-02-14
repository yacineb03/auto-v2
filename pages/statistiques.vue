<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  TrendingUp, Users, Clock, Trophy, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Calendar, Wallet, Target, UserPlus,
  PieChart, BarChart3, LineChart
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

const performanceData = [
  { label: 'Examen Code', value: 92, trend: '+4%', trendUp: true },
  { label: 'Examen Pratique', value: 84, trend: '+2%', trendUp: true },
  { label: 'Présentation Permis', value: 78, trend: '-1%', trendUp: false },
]
</script>

<template>
  <LayoutDashboardLayout
    page-title="Statistiques Globales"
    page-subtitle="Analysez la performance de votre auto-école en détail."
    :user="user"
  >
    <div class="animate-in fade-in duration-700 space-y-12 pt-4 pb-24 max-w-6xl mx-auto px-4">
      
      <!-- ELITE STATS KPI -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="stat in performanceData" :key="stat.label" class="bg-white p-8 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-all">
           <!-- Subtle decor -->
           <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

           <div class="flex justify-between items-start mb-6 relative z-10">
              <div>
                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{{ stat.label }}</p>
                <h3 class="text-4xl font-black text-slate-900 italic tracking-tighter tabular-nums leading-none">{{ stat.value }}<span class="text-indigo-600 text-2xl">%</span></h3>
              </div>
              <div :class="['px-2.5 py-1 rounded-lg text-[9px] font-black italic flex items-center gap-1 border border-white shadow-sm', stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600']">
                {{ stat.trend }}
                <component :is="stat.trendUp ? ArrowUpRight : ArrowDownRight" :size="10" stroke-width="3" />
              </div>
           </div>
           
           <!-- Elite Mini Gauge -->
           <div class="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100 relative z-10">
              <div class="h-full bg-indigo-600 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(79,70,229,0.4)]" :style="{ width: stat.value + '%' }"></div>
           </div>
        </div>
      </div>

      <!-- ELITE PERFORMANCE ANALYTICS -->
      <div class="bg-white rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group">
         <!-- Background decoration subtle -->
         <div class="absolute right-0 top-0 w-80 h-80 bg-indigo-50 rounded-full blur-[100px] opacity-60"></div>

         <div class="p-10 md:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
            <div class="space-y-8 max-w-xl">
               <div class="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-100 text-slate-400 rounded-lg shadow-sm">
                  <TrendingUp :size="12" class="text-indigo-600" />
                  <span class="text-[9px] font-black uppercase tracking-widest">Optimisation IA Active</span>
               </div>
               
               <h3 class="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-slate-900 uppercase italic">
                  Taux de réussite <br/> <span class="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">Propulsé.</span>
               </h3>
               
               <p class="text-slate-500 text-lg font-medium leading-relaxed italic">
                  L'analyse cognitive de DriveFlow a permis une hausse de <span class="text-slate-900 font-black">+12.4%</span> sur vos présentations d'examen.
               </p>
               
               <div class="flex items-center gap-4">
                  <button class="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 shadow-xl transition-all flex items-center gap-3">
                     Décharger Rapport <iconify-icon icon="solar:download-minimalistic-bold" width="16" />
                  </button>
                  <button class="px-8 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-600 transition-all">
                     Détails Mensuels
                  </button>
               </div>
            </div>

            <div class="flex-1 flex justify-center lg:justify-end">
               <!-- Score Display Elite -->
               <div class="w-full max-w-[320px] bg-white rounded-2xl border border-slate-100 p-10 flex flex-col items-center justify-center relative shadow-2xl group/score">
                  <div class="absolute -top-6 -right-6 w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-100 transform rotate-12 group-hover:rotate-0 transition-transform">
                     <Target :size="24" />
                  </div>
                  
                  <div class="text-center relative">
                     <p class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-2">Impact Réseau</p>
                     <p class="text-8xl font-black italic tracking-tighter text-slate-900 leading-none">+12<span class="text-indigo-600 text-4xl">%</span></p>
                     <p class="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mt-6 bg-indigo-50 py-1 px-4 rounded-full border border-indigo-100 inline-block">Score Global</p>
                  </div>

                  <div class="mt-10 w-full px-4">
                     <div class="w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100 p-0.5">
                        <div class="h-full bg-slate-900 w-[78%] rounded-full shadow-lg"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

    </div>
  </LayoutDashboardLayout>
</template>
