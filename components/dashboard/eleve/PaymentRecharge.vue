<script setup lang="ts">
import { CreditCard, Zap, ArrowRight, ShieldCheck } from 'lucide-vue-next'

const packs = [
  { hours: 5, price: 235, promo: null },
  { hours: 10, price: 450, promo: '-5%' },
  { hours: 20, price: 850, promo: '-10%' },
]
</script>

<template>
  <div class="bg-white rounded-xl p-8 border border-slate-100 shadow-sm overflow-hidden relative group">
    <!-- Fond décoratif discret -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/2 -z-0"></div>

    <div class="relative z-10">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div class="max-w-md">
           <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                <CreditCard :size="24" />
              </div>
              <div>
                <h3 class="text-xl font-black text-slate-900 uppercase tracking-tight italic">Recharger mes crédits</h3>
                <p class="text-slate-400 text-xs font-bold uppercase tracking-widest leading-none mt-1">Paiement sécurisé par Stripe</p>
              </div>
           </div>
           <p class="text-slate-500 text-sm font-medium leading-relaxed">
             Besoin d'heures supplémentaires pour ta formation ? Choisis un pack et reprends le volant immédiatement.
           </p>
           
           <div class="flex items-center gap-4 mt-6">
              <div class="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg">
                 <ShieldCheck :size="14" class="text-emerald-600" />
                 <span class="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Transaction sécurisée</span>
              </div>
              <div class="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                 <Zap :size="14" class="text-amber-500" fill="currentColor" />
                 <span class="text-[9px] font-black text-slate-500 uppercase tracking-widest">Activation instantanée</span>
              </div>
           </div>
        </div>

        <div class="w-full lg:w-auto flex flex-col sm:flex-row gap-4 flex-1 lg:max-w-xl">
           <div v-for="pack in packs" :key="pack.hours" class="flex-1 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-indigo-100 border border-transparent p-6 rounded-xl transition-all cursor-pointer group/pack relative overflow-hidden">
              <div v-if="pack.promo" class="absolute top-3 right-3 px-2 py-0.5 bg-indigo-600 text-white text-[8px] font-black rounded-lg uppercase tracking-widest">
                {{ pack.promo }}
              </div>
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Pack Conduite</p>
              <h4 class="text-2xl font-black text-slate-900 italic mb-2 tracking-tighter">{{ pack.hours }}H</h4>
              <p class="text-lg font-black text-indigo-600 tabular-nums">{{ pack.price }}€</p>
              
              <button class="mt-4 w-full py-2 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 hover:bg-slate-900">
                Choisir <ArrowRight :size="12" />
              </button>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>
