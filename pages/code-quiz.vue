<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Play, BookOpen, Trophy, Target, 
  ChevronRight, Brain, Timer, FileText,
  BarChart3, Sparkles, AlertCircle, CheckCircle2,
  Lock, ArrowRight, Zap, Info, PlayCircle
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

const categories = [
  { id: 1, name: 'Signalisation', progress: 85, total: 120, icon: Target, color: 'text-rose-600', bg: 'bg-rose-50/50' },
  { id: 2, name: 'Priorités', progress: 40, total: 95, icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50/50' },
  { id: 3, name: 'Règles de circulation', progress: 65, total: 150, icon: Brain, color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
  { id: 4, name: 'Croisement & Dépassement', progress: 20, total: 80, icon: ArrowRight, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
]

const recentSeries = [
  { id: 1, title: 'Série thématique #4', score: '38/40', date: 'Hier', type: 'Examen' },
  { id: 2, title: 'Entraînement Libre', score: '18/20', date: 'Il y a 2 jours', type: 'Pratique' },
]
</script>

<template>
  <LayoutDashboardLayout
    page-title="Code de la Route"
    page-subtitle="L'examen sans stress avec notre méthode IA."
    :user="user"
  >
    <div class="animate-in fade-in duration-1000 space-y-16 pb-32 pt-4">
      <div class="relative bg-white rounded-xl p-8 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7 space-y-8">
            <div class="inline-flex items-center gap-3 px-4 py-2 bg-slate-900 text-white rounded-full">
              <Sparkles :size="14" class="text-indigo-400" />
              <span class="text-[10px] font-black uppercase tracking-[0.2em]">Programme 2026 Officiel</span>
            </div>
            <h1 class="text-5xl font-black uppercase tracking-tight leading-none text-slate-900">
              L'Examen <span class="text-indigo-600">Sans Stress</span>
            </h1>
            <div class="flex flex-wrap gap-4 pt-4">
               <button class="bg-indigo-600 text-white px-8 py-4 rounded-lg font-black uppercase tracking-widest text-[10px] flex items-center gap-3">
                 Commencer une série <PlayCircle :size="18" fill="currentColor" />
               </button>
            </div>
          </div>
          <div class="lg:col-span-5">
             <div class="bg-slate-50 p-8 rounded-xl space-y-6">
                <div>
                   <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Progression Globale</p>
                   <div class="flex items-baseline gap-2">
                     <span class="text-5xl font-black italic text-slate-900">74<span class="text-xl not-italic text-slate-300 ml-1">/100</span></span>
                   </div>
                </div>
                <div class="h-2 w-full bg-white rounded-full overflow-hidden">
                   <div class="h-full bg-indigo-600 rounded-full" style="width: 74%"></div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-12 gap-16">
        <div class="xl:col-span-8 space-y-8">
          <h2 class="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Thématiques</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div v-for="cat in categories" :key="cat.id" class="group bg-white p-8 rounded-xl shadow-sm border border-slate-50 hover:border-indigo-100 transition-all cursor-pointer">
                <div :class="['w-14 h-14 rounded-lg flex items-center justify-center mb-6', cat.bg]">
                    <component :is="cat.icon" :size="24" :class="cat.color" />
                </div>
                <h3 class="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4">{{ cat.name }}</h3>
                <div class="flex justify-between items-end mb-2">
                   <span class="text-2xl font-black italic">{{ cat.progress }}%</span>
                   <ArrowRight :size="16" class="text-indigo-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <div class="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                   <div class="h-full bg-slate-900" :style="{ width: `${cat.progress}%` }"></div>
                </div>
             </div>
          </div>
        </div>

        <div class="xl:col-span-4 space-y-8">
          <div class="bg-indigo-600 rounded-xl p-8 text-white shadow-xl">
             <div class="flex items-center gap-4 mb-6">
                <Brain :size="24" />
                <h3 class="font-black text-[10px] uppercase tracking-widest leading-none">Intelligence IA</h3>
             </div>
             <p class="text-indigo-50 text-base font-medium italic mb-8 leading-relaxed">
               "Tes résultats sur la signalisation stagnent. Veux-tu un focus de 15 min ?"
             </p>
             <button class="w-full bg-white text-indigo-600 py-4 rounded-lg font-black uppercase tracking-widest text-[10px]">
               Lancer Focus IA
             </button>
          </div>
        </div>
      </div>
    </div>
  </LayoutDashboardLayout>
</template>
