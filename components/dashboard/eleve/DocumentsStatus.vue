<script setup lang="ts">
import { CheckCircle2, Clock3, AlertCircle, Files } from 'lucide-vue-next'

const docs = ref([
  { id: 'cni', name: 'Carte d\'Identité', status: 'valid', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'dom', name: 'Justificatif Domicile', status: 'pending', icon: Clock3, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'assr', name: 'ASSR 2 / ASR', status: 'missing', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
])

const fileInput = ref<HTMLInputElement | null>(null)
const activeDocId = ref<string | null>(null)
const isUploading = ref(false)

const triggerUpload = (docId: string) => {
  activeDocId.value = docId
  fileInput.value?.click()
}

const handleFile = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files?.length || !activeDocId.value) return

  isUploading.value = true
  
  // Simulation de l'upload
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const doc = docs.value.find(d => d.id === activeDocId.value)
  if (doc) {
    doc.status = 'pending'
    doc.icon = Clock3
    doc.color = 'text-amber-500'
    doc.bg = 'bg-amber-50'
  }
  
  isUploading.value = false
  activeDocId.value = null
}
</script>

<template>
  <div class="bg-white p-8 rounded-xl border border-slate-100 shadow-sm h-full flex flex-col relative overflow-hidden">
    <!-- Overlay Upload -->
    <div v-if="isUploading" class="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
       <div class="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
       <p class="text-[10px] font-black text-slate-900 uppercase tracking-widest">Envoi en cours...</p>
    </div>

    <input 
      type="file" 
      ref="fileInput" 
      class="hidden" 
      accept="image/*,.pdf" 
      @change="handleFile"
    />

    <div class="flex items-center gap-4 mb-8">
      <div class="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
        <Files :size="24" />
      </div>
      <div>
        <h3 class="font-bold text-slate-900 leading-none">Mes Documents</h3>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">État des pièces</p>
      </div>
    </div>

    <div class="space-y-3 flex-1">
      <div 
        v-for="doc in docs" 
        :key="doc.name"
        class="group flex items-center justify-between p-4 rounded-xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-indigo-100 transition-all"
      >
        <div class="flex flex-col gap-1">
           <span class="text-xs font-bold text-slate-700">{{ doc.name }}</span>
           <div 
             class="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest"
             :class="doc.color"
           >
             <component :is="doc.icon" :size="10" />
             {{ doc.status === 'valid' ? 'Validé' : doc.status === 'pending' ? 'En attente' : 'Manquant' }}
           </div>
        </div>
        
        <button 
          v-if="doc.status !== 'valid'"
          @click="triggerUpload(doc.id)"
          class="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all"
        >
          <iconify-icon icon="solar:upload-linear" width="18" />
        </button>
        <div v-else class="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100">
           <iconify-icon icon="solar:check-circle-bold" width="18" />
        </div>
      </div>
    </div>

    <div class="mt-6 pt-6 border-t border-slate-50 text-center">
      <p class="text-[9px] font-medium text-slate-400 mb-4 px-4">
        Veille à ce que tes documents soient bien lisibles (format PDF ou JPG).
      </p>
      <NuxtLink to="/dashboard" class="inline-flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:underline">
        Tout voir <iconify-icon icon="solar:arrow-right-linear" />
      </NuxtLink>
    </div>
  </div>
</template>
