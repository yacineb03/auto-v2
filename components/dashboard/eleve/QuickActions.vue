<script setup lang="ts">
import { CalendarPlus, BookOpenCheck, Map as MapIcon, CreditCard, ArrowRight, Sparkles, Zap, Target } from 'lucide-vue-next'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
    
    <!-- 1. RÉSERVER UNE HEURE -->
    <NuxtLink to="/planning" class="relative group bg-white rounded-xl p-8 border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:border-indigo-100">
      <div class="absolute top-0 right-0 p-6 opacity-20 group-hover:rotate-12 transition-transform">
        <CalendarPlus :size="100" class="text-white" />
      </div>
      <div class="relative z-10 h-full flex flex-col">
        <div class="bg-indigo-50 text-indigo-600 w-fit p-3 rounded-lg mb-6">
          <CalendarPlus :size="24" />
        </div>
        <h3 class="text-lg font-black text-slate-900 mb-2 uppercase tracking-tight italic">Réserver<br/>une leçon</h3>
        <p class="text-slate-500 text-[11px] font-medium leading-relaxed mb-8 max-w-[180px]">Prochains créneaux disponibles demain matin.</p>
        <div class="mt-auto flex items-center gap-2 bg-slate-900 text-white w-fit px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg group-hover:bg-indigo-600 transition-colors">
          Voir le planning <Zap :size="12" fill="currentColor" />
        </div>
      </div>
    </NuxtLink>

    <!-- 2. SÉRIE DE CODE -->
    <NuxtLink to="/code-quiz" class="relative group bg-white rounded-xl p-8 border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:border-blue-100">
      <div class="flex flex-col h-full">
        <div class="flex justify-between items-start mb-6">
          <div class="bg-blue-50 text-blue-600 p-3 rounded-lg">
            <BookOpenCheck :size="24" />
          </div>
          <div class="text-right">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dernier score</p>
            <p class="text-xl font-black text-blue-600">34/40</p>
          </div>
        </div>
        <h3 class="text-lg font-black text-slate-900 mb-2">Entraînement Code</h3>
        <p class="text-slate-500 text-[11px] font-medium leading-relaxed mb-6">3 thèmes recommandés par l'IA aujourd'hui.</p>
        
        <!-- Mini Progress Bar -->
        <div class="mt-auto space-y-2">
          <div class="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <span>Objectif examen</span>
            <span>85%</span>
          </div>
          <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-blue-500 rounded-full" style="width: 85%"></div>
          </div>
        </div>
      </div>
    </NuxtLink>

    <!-- 3. CARTE DES ZONES -->
    <NuxtLink to="/historique" class="relative group bg-indigo-600 rounded-xl p-8 overflow-hidden shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02]">
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      <div class="relative z-10 flex flex-col h-full">
        <div class="flex items-center gap-3 mb-6">
          <div class="bg-emerald-500 text-white p-2.5 rounded-lg shadow-lg shadow-emerald-900/20">
            <MapIcon :size="20" />
          </div>
          <span class="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Exploration</span>
        </div>
        <h3 class="text-xl font-black text-white mb-2">Carte des zones</h3>
        <p class="text-slate-400 text-xs font-medium mb-8">Découvre les 12 points de passage obligatoires.</p>
        
        <div class="mt-auto flex items-center gap-4">
          <div class="flex -space-x-2">
            <div v-for="i in 3" :key="i" class="w-6 h-6 rounded-full border-2 border-indigo-600 bg-indigo-400 flex items-center justify-center text-[8px] font-bold text-white">
              {{ i }}
            </div>
          </div>
          <span class="text-[9px] font-black text-indigo-200 uppercase tracking-widest">+9 zones</span>
        </div>
      </div>
    </NuxtLink>

    <!-- 4. RECHARGER HEURES -->
    <NuxtLink to="/settings" class="relative group bg-rose-50 rounded-xl p-8 border border-rose-100 transition-all hover:bg-rose-100 hover:shadow-lg">
      <div class="flex flex-col h-full">
        <div class="flex justify-between items-center mb-6">
          <div class="bg-rose-500 text-white p-3 rounded-lg shadow-lg shadow-rose-200">
            <CreditCard :size="24" />
          </div>
          <div class="bg-white px-3 py-1 rounded-full border border-rose-200 shadow-sm">
             <span class="text-[10px] font-black text-rose-600 uppercase tracking-widest">Solde: 5h</span>
          </div>
        </div>
        <h3 class="text-lg font-black text-slate-900 mb-2">Recharger mon pack</h3>
        <p class="text-slate-500 text-[11px] font-medium leading-relaxed mb-6">Économise 15% sur les packs de 10h ce mois-ci.</p>
        
        <div class="mt-auto flex items-center justify-between">
          <span class="text-[10px] font-black text-rose-600 uppercase tracking-widest">Voir les offres</span>
          <div class="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg group-hover:translate-x-1 transition-transform">
            <ArrowRight :size="16" />
          </div>
        </div>
      </div>
    </NuxtLink>

  </div>
</template>
