<script setup lang="ts">
import { ref } from 'vue'
import { User, Mail, Phone, Calendar, ShieldCheck, Check } from 'lucide-vue-next'

import UiInput from '../ui/Input.vue'

const emit = defineEmits(['close', 'success'])
const loading = ref(false)

const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  specialty: 'manuelle'
})

const submit = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    emit('success')
  }, 1200)
}
</script>

<template>
  <form @submit.prevent="submit" class="space-y-8">
    <div class="grid grid-cols-2 gap-4">
       <UiInput v-model="form.firstname" label="Prénom" placeholder="Marc" required />
       <UiInput v-model="form.lastname" label="Nom" placeholder="Leblanc" required />
    </div>

    <UiInput v-model="form.email" type="email" label="Email Professionnel" placeholder="m.leblanc@driveflow.fr" required />
    <UiInput v-model="form.phone" type="tel" label="Téléphone" placeholder="06 .. .. .. .." required />

    <div class="space-y-3">
       <label class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Spécialité Principale</label>
       <div class="grid grid-cols-2 gap-3">
          <button type="button" @click="form.specialty = 'manuelle'" :class="form.specialty === 'manuelle' ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-indigo-200'" class="py-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all">Boîte Manuelle</button>
          <button type="button" @click="form.specialty = 'auto'" :class="form.specialty === 'auto' ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-indigo-200'" class="py-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all">Boîte Auto</button>
       </div>
    </div>

    <div class="flex items-start gap-4 bg-emerald-50 p-5 rounded-xl border border-emerald-100 group">
       <div class="shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110">
          <ShieldCheck :size="20" />
       </div>
       <div class="space-y-1">
          <p class="text-[10px] font-black text-emerald-900 uppercase tracking-tight">Vérification Automatique</p>
          <p class="text-[10px] font-bold text-emerald-600/70 leading-relaxed italic">Un mail d'invitation sera envoyé pour configurer ses disponibilités.</p>
       </div>
    </div>

    <button type="submit" :disabled="loading" class="w-full py-4.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-3">
       <template v-if="loading">
          <iconify-icon icon="solar:restart-bold" width="16" class="animate-spin" /> Traitement...
       </template>
       <template v-else>
          Enregistrer le Moniteur <Check :size="16" stroke-width="3" />
       </template>
    </button>
  </form>
</template>
