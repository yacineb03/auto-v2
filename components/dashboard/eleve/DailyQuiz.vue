<script setup lang="ts">
import { PlayCircle, Award } from 'lucide-vue-next'
</script>

<template>
  <div class="bg-white rounded-xl p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6 group hover:shadow-md transition-all">
    <div class="w-16 h-16 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
      <Award :size="32" />
    </div>
    
    <div class="flex-1 text-center md:text-left">
      <h3 class="text-xl font-bold text-slate-900 mb-1">Quiz Quotidien</h3>
      <p class="text-slate-500 text-sm font-medium">Relève ton défi : 5 questions rapides.</p>
      
      <div class="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
        <div class="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest border border-emerald-100">
          +15 XP
        </div>
        <div class="flex items-center gap-1.5 text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-widest border border-blue-100">
          Série : 4j
        </div>
      </div>
    </div>
    
    <button class="bg-indigo-600 hover:bg-slate-900 text-white px-8 py-3.5 rounded-lg font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all">
      Lancer <PlayCircle :size="16" />
    </button>
  </div>
</template>
