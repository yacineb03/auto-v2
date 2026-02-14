<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'
</script>

<template>
  <div class="relative mb-12 py-10 px-8 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-white shadow-sm overflow-hidden group">
    <div class="absolute -right-20 -top-20 w-80 h-80 bg-indigo-50 rounded-full blur-[100px] opacity-60"></div>
    
    <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
      <div class="space-y-3">
        <div class="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 w-fit">
          <Sparkles :size="10" /> Statut : Élève Premium
        </div>
        
        <h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
          Content de te revoir, <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-[length:200%_auto] animate-gradient">Yacine</span>
        </h1>
        <p class="text-slate-500 font-medium text-lg mt-2 max-w-md">
          Tu as déjà validé <span class="text-indigo-600 font-bold">65%</span> de ta formation. Continue comme ça !
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  animation: gradient 3s ease infinite;
}
</style>
