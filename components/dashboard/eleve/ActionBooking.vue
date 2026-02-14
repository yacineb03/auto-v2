<script setup lang="ts">
import { CalendarPlus, Zap } from 'lucide-vue-next'
</script>

<template>
  <NuxtLink to="/planning" class="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[160px] group transition-all hover:shadow-md hover:-translate-y-1">
    <div class="flex justify-between items-start">
      <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center p-3">
        <CalendarPlus :size="24" />
      </div>
      <div class="bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
        <Zap :size="14" fill="currentColor" />
      </div>
    </div>
    
    <div>
      <h3 class="font-bold text-slate-900 leading-tight">Réserver une leçon</h3>
      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Dispo : Demain 14h</p>
    </div>
  </NuxtLink>
</template>
