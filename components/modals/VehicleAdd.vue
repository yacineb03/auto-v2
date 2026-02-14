<script setup lang="ts">
import { ref } from 'vue'
import { Car, Gauge, Fuel, Check, Info } from 'lucide-vue-next'

const emit = defineEmits(['close', 'success'])
const loading = ref(false)

const form = ref({
  model: '',
  plate: '',
  type: 'manuelle',
  fuel: 'diesel'
})

const submit = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    emit('success')
  }, 1000)
}
</script>

<template>
  <form @submit.prevent="submit" class="space-y-8">
    <div class="space-y-2">
       <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Modèle du véhicule</label>
       <input v-model="form.model" type="text" placeholder="ex: Peugeot 208" class="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-400 outline-none transition-all" required />
    </div>

    <div class="space-y-2">
       <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Plaque d'immatriculation</label>
       <input v-model="form.plate" type="text" placeholder="AA-123-BB" class="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-400 outline-none transition-all uppercase" required />
    </div>

    <div class="grid grid-cols-2 gap-8">
       <div class="space-y-4">
          <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Transmission</label>
          <div class="space-y-2">
             <button type="button" @click="form.type = 'manuelle'" :class="form.type === 'manuelle' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400'" class="w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Manuelle</button>
             <button type="button" @click="form.type = 'auto'" :class="form.type === 'auto' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400'" class="w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Automatique</button>
          </div>
       </div>
       <div class="space-y-4">
          <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Énergie</label>
          <div class="space-y-2">
             <button type="button" @click="form.fuel = 'diesel'" :class="form.fuel === 'diesel' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'" class="w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Diesel</button>
             <button type="button" @click="form.fuel = 'electrique'" :class="form.fuel === 'electrique' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'" class="w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Électrique</button>
          </div>
       </div>
    </div>

    <div class="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex gap-4">
       <Info :size="20" class="text-slate-400 shrink-0" />
       <p class="text-[10px] font-bold text-slate-500 leading-relaxed italic">
          Une fois ajouté, vous pourrez configurer les rappels de maintenance et assigner un moniteur par défaut depuis la fiche du véhicule.
       </p>
    </div>

    <button type="submit" :disabled="loading" class="w-full py-5 bg-slate-900 text-white rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest hover:bg-slate-950 shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3">
       <template v-if="loading">
          <iconify-icon icon="solar:restart-bold" width="16" class="animate-spin" /> Enregistrement...
       </template>
       <template v-else>
          Ajouter à la flotte <Check :size="16" stroke-width="3" />
       </template>
    </button>
  </form>
</template>
