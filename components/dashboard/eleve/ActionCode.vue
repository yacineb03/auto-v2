<script setup lang="ts">
import { BookOpenCheck } from 'lucide-vue-next'
</script>

<template>
  <NuxtLink to="/code-quiz" class="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[160px] group transition-all hover:shadow-md hover:-translate-y-1">
    <div class="flex justify-between items-start">
      <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center p-3">
        <BookOpenCheck :size="24" />
      </div>
      <span class="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 uppercase tracking-widest">IA Recommandé</span>
    </div>
    
    <div>
      <h3 class="font-bold text-slate-900 leading-tight">Entraînement Code</h3>
      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Série Express : 5min</p>
    </div>
  </NuxtLink>
</template>
