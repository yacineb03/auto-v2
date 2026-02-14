<script setup lang="ts">
import { ref } from 'vue'
import { 
  User, Mail, Phone, MapPin, 
  Car, GraduationCap, Calendar, 
  Check, CreditCard, ShieldCheck, Zap
} from 'lucide-vue-next'
import UiInput from '../ui/Input.vue'

const emit = defineEmits(['close', 'success'])

const step = ref(1)
const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  formula: 'zen',
  license: 'B',
  examDate: ''
})

const formulas = [
  { id: 'zen', label: 'Pack Zen (20h)', price: '1200€', icon: ShieldCheck },
  { id: 'express', label: 'Pack Express (30h)', price: '1650€', icon: Zap },
  { id: 'code', label: 'Code en ligne', price: '49€', icon: GraduationCap },
]

const loading = ref(false)

const handleNext = () => {
  if (step.value < 3) step.value++
  else submit()
}

const submit = async () => {
  loading.value = true
  // Simulation API
  setTimeout(() => {
    loading.value = false
    emit('success')
  }, 1500)
}
</script>

<template>
  <div class="space-y-8">
    <!-- Progress Indicator -->
    <div class="flex items-center gap-4 mb-2">
       <div v-for="i in 3" :key="i" class="flex-1 h-1.5 rounded-full transition-all duration-500" :class="step >= i ? 'bg-indigo-600' : 'bg-slate-100'"></div>
    </div>

    <form @submit.prevent="handleNext" class="space-y-10">
      
      <!-- STEP 1: Personal Info -->
      <div v-if="step === 1" class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
         <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <UiInput v-model="form.firstname" label="Prénom" icon="solar:user-bold" placeholder="ex: Jean" required />
            <UiInput v-model="form.lastname" label="Nom" icon="solar:user-bold" placeholder="ex: Dupont" required />
         </div>
         <UiInput v-model="form.email" type="email" label="Adresse Email" icon="solar:letter-bold" placeholder="jean.dupont@exemple.com" required />
         <UiInput v-model="form.phone" type="tel" label="Numéro Téléphone" icon="solar:phone-bold" placeholder="06 .. .. .. .." required />
      </div>

      <!-- STEP 2: Formula & License -->
      <div v-if="step === 2" class="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
         <div class="space-y-4">
            <label class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Type de Permis</label>
            <div class="grid grid-cols-2 gap-4">
               <button type="button" @click="form.license = 'B'" :class="form.license === 'B' ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-100/30' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-indigo-200'" class="flex flex-col items-center gap-3 p-8 rounded-2xl border-2 transition-all group">
                  <Car :size="24" class="group-hover:scale-110 transition-transform" />
                  <span class="text-[10px] font-black uppercase tracking-widest">Permis B</span>
               </button>
               <button type="button" @click="form.license = 'A'" :class="form.license === 'A' ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-100/30' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-indigo-200'" class="flex flex-col items-center gap-3 p-8 rounded-2xl border-2 transition-all group">
                  <iconify-icon icon="solar:bike-bold" width="24" class="group-hover:scale-110 transition-transform" />
                  <span class="text-[10px] font-black uppercase tracking-widest">Permis A</span>
               </button>
            </div>
         </div>

         <div class="space-y-4">
            <label class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Forfait Choisi</label>
            <div class="space-y-3">
               <div v-for="f in formulas" :key="f.id" @click="form.formula = f.id" :class="form.formula === f.id ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100/20' : 'border-slate-100 hover:border-indigo-200'" class="flex items-center justify-between p-6 rounded-xl border-2 cursor-pointer transition-all group">
                  <div class="flex items-center gap-5">
                     <div :class="form.formula === f.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'" class="w-12 h-12 rounded-lg flex items-center justify-center transition-all">
                        <component :is="f.icon" :size="20" />
                     </div>
                     <div>
                        <p class="text-xs font-black text-slate-900 uppercase tracking-tighter">{{ f.label }}</p>
                        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Contrat Standard</p>
                     </div>
                  </div>
                  <p class="text-base font-black text-indigo-600 italic tracking-tighter">{{ f.price }}</p>
               </div>
            </div>
         </div>
      </div>

      <!-- STEP 3: Summary & Finalization -->
      <div v-if="step === 3" class="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
         <div class="bg-slate-900 p-8 rounded-2xl text-white space-y-6 relative overflow-hidden shadow-2xl">
            <!-- Subtle decoration -->
            <div class="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[60px]"></div>
            
            <div class="flex items-center justify-between relative z-10 border-b border-white/10 pb-4">
               <h4 class="text-lg font-black italic uppercase tracking-tighter">Récapitulatif</h4>
               <span class="text-[8px] font-black text-indigo-400 uppercase tracking-[0.3em]">Brouillon Officiel</span>
            </div>

            <div class="space-y-5 relative z-10">
               <div class="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                  <span class="text-[9px] font-black text-white/40 uppercase tracking-widest">Identité</span>
                  <span class="text-xs font-black uppercase italic">{{ form.firstname }} {{ form.lastname }}</span>
               </div>
               <div class="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                  <span class="text-[9px] font-black text-white/40 uppercase tracking-widest">Type Permis</span>
                  <span class="text-xs font-black uppercase text-indigo-400">Permis {{ form.license }}</span>
               </div>
               <div class="flex justify-between items-center bg-indigo-600/20 p-5 rounded-xl border border-indigo-500/30">
                  <span class="text-[9px] font-black text-white/40 uppercase tracking-widest">Montant Total</span>
                  <span class="text-2xl font-black italic tabular-nums text-white">{{ formulas.find(f => f.id === form.formula)?.price }}</span>
               </div>
            </div>
         </div>

         <div class="flex items-start gap-4 p-5 bg-indigo-50 border border-indigo-100 rounded-xl relative overflow-hidden group">
            <div class="shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
               <ShieldCheck :size="20" />
            </div>
            <div class="space-y-1">
               <p class="text-[10px] font-black text-indigo-900 uppercase tracking-tight">Sécurisé & Conforme ANTS</p>
               <p class="text-[10px] font-bold text-indigo-600/70 leading-relaxed italic">L'élève recevra ses accès et son livret numérique dès la validation.</p>
            </div>
         </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-4 pt-6 border-t border-slate-50">
         <button v-if="step > 1" type="button" @click="step--" class="flex-1 py-4.5 bg-slate-50 text-slate-400 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">Retour</button>
         <button type="submit" :disabled="loading" class="flex-[2] py-4.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-3">
            <template v-if="loading">
               <iconify-icon icon="solar:restart-bold" width="16" class="animate-spin" /> Traitement en cours...
            </template>
            <template v-else>
               {{ step === 3 ? 'Confirmer l\'Inscription' : 'Étape Suivante' }}
               <iconify-icon v-if="step < 3" icon="solar:arrow-right-bold" width="16" />
               <iconify-icon v-else icon="solar:check-circle-bold" width="16" />
            </template>
         </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.animate-in { animation-duration: 0.5s; }
</style>
