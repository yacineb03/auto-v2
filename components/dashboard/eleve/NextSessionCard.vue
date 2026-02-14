<script setup lang="ts">
import { Calendar, MapPin, Clock, CloudRain, ShieldCheck, ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <div class="bg-indigo-600 rounded-xl p-6 text-white relative overflow-hidden mb-8 shadow-xl shadow-indigo-100 group">
    <!-- Cercles décoratifs (plus petits) -->
    <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
    
    <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      
      <!-- Info Principale -->
      <div class="flex flex-col md:flex-row items-center gap-6">
        <div class="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shrink-0">
          <Calendar :size="32" class="text-white" />
        </div>
        
        <div class="text-center md:text-left">
          <div class="inline-flex items-center gap-2 bg-indigo-500/30 px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-1 border border-white/10">
            Prochain RDV
          </div>
          <h2 class="text-2xl font-black tracking-tight">Demain à 14:00</h2>
          <div class="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
            <div class="flex items-center gap-1.5 text-indigo-100 text-[10px] font-bold">
              <MapPin :size="12" /> Gare St-Charles
            </div>
            <div class="flex items-center gap-1.5 text-indigo-100 text-[10px] font-bold">
              <Clock :size="12" /> 2h Intensive
            </div>
          </div>
        </div>
      </div>

      <!-- Météo & Action : Design Adaptatif -->
      <div class="flex items-center justify-between lg:justify-end gap-4 lg:gap-10 mt-6 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/10 w-full lg:w-auto">
        
        <!-- Bloc Météo (Visible partout maintenant) -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3">
             <span class="text-3xl lg:text-4xl font-black italic tabular-nums tracking-tighter leading-none">16<span class="text-lg lg:text-xl not-italic ml-0.5 opacity-60">°</span></span>
             <!-- Séparateur minimaliste -->
             <div class="w-px h-6 lg:h-8 bg-white/20 rounded-full"></div>
             <div class="text-left">
                <p class="text-[8px] lg:text-[9px] font-black uppercase leading-tight">Pluie <br/> <span class="text-indigo-200">Légère</span></p>
             </div>
          </div>
        </div>

        <!-- Bouton d'Action -->
        <button class="bg-slate-900 text-white w-12 h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center shadow-lg active:scale-95 transition-all group shrink-0 hover:bg-white hover:text-indigo-600">
          <ArrowRight :size="20" lg:size="24" stroke-width="3" class="group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </div>
  </div>
</template>
