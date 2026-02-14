<script setup lang="ts">
import { Map as MapIcon, Compass } from 'lucide-vue-next'

const zones = [
  { name: 'Centre-Ville', hours: 4, status: 'mastered', color: 'bg-emerald-500' },
  { name: 'Autoroute A7', hours: 2, status: 'in-progress', color: 'bg-indigo-500' },
  { name: 'Parkings', hours: 1, status: 'to-do', color: 'bg-slate-300' },
]
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[400px]">
    <!-- Header -->
    <div class="p-6 border-b border-slate-50 flex items-center gap-4">
      <div class="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
        <Compass :size="20" />
      </div>
      <div>
        <h3 class="font-bold text-slate-900 leading-tight">Zones Practiquées</h3>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Secteur Marseille</p>
      </div>
    </div>

    <!-- Map Simulation -->
    <div class="relative flex-1 bg-slate-100 min-h-[220px]">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11598.66614131!2d5.37!3d43.3!2m3!1f0!2f45!3f0!3m2!1i1024!2i768!4f35!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr&maptype=satellite" 
        class="absolute inset-0 w-full h-full border-0 grayscale-[0.2]" 
        allowfullscreen="" 
        loading="lazy" 
      ></iframe>
      
      <!-- Overlays -->
      <div class="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-lg border border-white/20 shadow-lg">
        <div class="flex justify-between items-center text-[9px] font-black text-slate-500 mb-1.5 uppercase tracking-widest">
          <span>Maîtrise du secteur</span>
          <span class="text-indigo-600">65%</span>
        </div>
        <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-indigo-600 rounded-full" style="width: 65%"></div>
        </div>
      </div>
    </div>

    <!-- Zones List -->
    <div class="p-6 space-y-4">
      <div v-for="zone in zones" :key="zone.name" class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 rounded-full" :class="zone.color"></div>
          <span class="text-xs font-bold text-slate-700">{{ zone.name }}</span>
        </div>
        <span class="text-[9px] font-black text-slate-400 tabular-nums uppercase">{{ zone.hours }}H</span>
      </div>
    </div>
  </div>
</template>
