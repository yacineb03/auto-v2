<script setup lang="ts">
import { Map as MapIcon } from 'lucide-vue-next'
</script>

<template>
  <NuxtLink to="/historique" class="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[160px] group transition-all hover:shadow-md hover:-translate-y-1">
    <div class="flex justify-between items-start">
      <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center p-3">
        <MapIcon :size="24" />
      </div>
    </div>
    
    <div>
      <h3 class="font-bold text-slate-900 leading-tight">Carte des Zones</h3>
      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">12 points à valider</p>
    </div>
  </NuxtLink>
</template>
