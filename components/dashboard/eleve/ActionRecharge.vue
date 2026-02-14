<script setup lang="ts">
import { CreditCard } from 'lucide-vue-next'
</script>

<template>
  <NuxtLink to="/settings" class="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[160px] group transition-all hover:shadow-md hover:-translate-y-1">
    <div class="flex justify-between items-start">
      <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center p-3">
        <CreditCard :size="24" />
      </div>
      <div class="bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">
        <span class="text-[10px] font-black text-rose-600 uppercase">Solde : 5h</span>
      </div>
    </div>
    
    <div>
      <h3 class="font-bold text-slate-900 leading-tight">Recharger Heures</h3>
      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Packs promo dispo</p>
    </div>
  </NuxtLink>
</template>
