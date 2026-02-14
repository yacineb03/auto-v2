<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sparkles, Navigation, Play, Cpu, CheckCircle } from 'lucide-vue-next'

const isAnalyzing = ref(true)
const examCenter = 'Aubagne'

onMounted(() => {
  setTimeout(() => {
    isAnalyzing.value = false
  }, 2000)
})
</script>

<template>
  <div class="relative bg-white rounded-xl p-6 border border-slate-100 shadow-sm overflow-hidden h-full min-h-[300px] flex flex-col">
    <!-- Scanner IA Simulation -->
    <div v-if="isAnalyzing" class="flex-1 flex flex-col items-center justify-center space-y-4 py-12">
      <div class="relative">
        <Cpu :size="40" class="text-indigo-600 animate-pulse" />
        <div class="absolute inset-0 border-2 border-indigo-600/20 rounded-full scale-150 animate-ping"></div>
      </div>
      <p class="text-[10px] font-black text-indigo-600 uppercase tracking-widest animate-pulse">Analyse du parcours...</p>
    </div>

    <!-- Contenu une fois analysé -->
    <div v-else class="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-700 flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          <Sparkles :size="12" class="text-indigo-600" />
          <span class="text-[9px] font-black text-indigo-600 uppercase tracking-widest">IA Recommandation</span>
        </div>
        <div class="flex items-center gap-1 text-emerald-500">
          <CheckCircle :size="12" />
          <span class="text-[9px] font-black uppercase tracking-tight">Optimisé</span>
        </div>
      </div>

      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg">
          <Navigation :size="24" class="rotate-45" />
        </div>
        <div>
          <h3 class="text-xl font-black text-slate-900 leading-tight">Centre {{ examCenter }}</h3>
          <p class="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Boucle n°4 : Hauts d'Aubagne</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-8">
        <div class="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <p class="text-[8px] font-black text-slate-400 uppercase mb-1">Difficulté</p>
          <p class="text-xs font-bold text-slate-700">Intermédiaire</p>
        </div>
        <div class="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <p class="text-[8px] font-black text-slate-400 uppercase mb-1">Focus</p>
          <p class="text-xs font-bold text-slate-700">Ronds-points</p>
        </div>
      </div>

      <button class="mt-auto w-full bg-indigo-600 hover:bg-slate-900 text-white p-4 rounded-lg font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl">
        Lancer MasterCours <Play :size="16" fill="currentColor" />
      </button>
    </div>
  </div>
</template>
