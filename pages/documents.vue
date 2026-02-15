<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  CheckCircle2, Clock3, AlertCircle, 
  Upload, Eye, ShieldCheck, 
  ArrowUpRight, FileText, Smartphone, Info,
  Search, MoreHorizontal, Download
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

interface Document {
  id: number;
  name: string;
  fullName: string;
  type: string;
  status: string;
  date: string;
}

const documents = ref<Document[]>([
  { 
    id: 1, 
    name: 'Identité', 
    fullName: 'Carte Nationale d\'Identité ou Passeport',
    type: 'PDF, JPG, PNG',
    status: 'valid', 
    date: '15 Jan 2026'
  },
  { 
    id: 2, 
    name: 'Domicile', 
    fullName: 'Justificatif de domicile (- de 6 mois)',
    type: 'Facture, Quittance',
    status: 'pending', 
    date: 'En cours'
  },
  { 
    id: 3, 
    name: 'Recensement', 
    fullName: 'Attestation de recensement citoyen',
    type: 'Document Cerfa',
    status: 'missing', 
    date: '-'
  },
  { 
    id: 4, 
    name: 'Photos ANTS', 
    fullName: 'Code photo d\'identité numérique',
    type: 'Code 22 caractères',
    status: 'valid', 
    date: '12 Jan 2026'
  },
])

const selectedDoc = ref<Document | null>(null)
</script>

<template>
  <LayoutDashboardLayout
    page-title="Documents Officiels"
    page-subtitle="Gère l'avancée de ton inscription et dépose tes justificatifs."
    :user="user"
  >
    <div class="max-w-5xl mx-auto pb-32 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      <!-- ELITE STATUS OVERVIEW -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden mb-8 sm:mb-12">
        <!-- Decoration side -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

        <div class="flex flex-wrap items-center gap-6 sm:gap-10 relative z-10">
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-100 shrink-0">
               <ShieldCheck :size="20" />
            </div>
            <div>
              <p class="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 sm:mb-1.5">Dossier</p>
              <p class="text-sm sm:text-xl font-black text-slate-900 uppercase italic">Partiel</p>
            </div>
          </div>

          <div class="hidden sm:block h-10 w-px bg-slate-100"></div>

          <div class="flex items-center gap-6">
            <div class="space-y-2">
               <div class="flex justify-between items-center text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-400">
                  <span>Progression</span>
                  <span class="text-indigo-600">60%</span>
               </div>
               <div class="flex gap-1.5">
                 <div v-for="i in 5" :key="i" :class="['w-5 sm:w-6 h-1.5 rounded-full transition-all duration-700', i <= 3 ? 'bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)]' : 'bg-slate-100']"></div>
               </div>
            </div>
          </div>
        </div>

        <button class="relative z-10 px-6 py-3.5 bg-slate-900 text-white rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg flex items-center justify-center gap-3 w-full lg:w-auto">
          Guide Inscription <iconify-icon icon="solar:document-text-bold" width="16" />
        </button>
      </div>

      <!-- ELITE DOCUMENT GRID -->
      <div class="grid grid-cols-1 gap-6">
        <div v-for="doc in documents" :key="doc.id" class="group relative">
          <div class="bg-white p-6 rounded-xl border border-slate-100 hover:border-indigo-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
             <!-- Status bar vertical refined -->
             <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-100 group-hover:w-2 transition-all" :class="{ 'bg-emerald-500': doc.status === 'valid', 'bg-amber-400': doc.status === 'pending', 'bg-rose-500': doc.status === 'missing' }"></div>

             <div class="flex items-center gap-8 flex-1">
                <!-- Icon Box -->
                <div :class="['w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-500 shadow-sm border', doc.status === 'valid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100 group-hover:text-indigo-600 group-hover:bg-indigo-50 group-hover:border-indigo-100']">
                  <FileText :size="24" stroke-width="2.5" />
                </div>

                <div class="space-y-2">
                   <div class="flex items-center gap-3">
                      <h3 class="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none">{{ doc.name }}</h3>
                      <span v-if="doc.status === 'pending'" class="px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded text-[7px] font-black uppercase tracking-widest">Examen en cours</span>
                   </div>
                   <div class="flex items-center gap-3">
                      <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{{ doc.fullName }}</p>
                      <span class="w-1 h-1 rounded-full bg-slate-200"></span>
                      <span class="text-[9px] font-black text-indigo-500 uppercase italic">{{ doc.type }}</span>
                   </div>
                </div>
             </div>

             <!-- Action Column -->
             <div class="flex items-center gap-4">
                <div class="text-right hidden xl:block mr-4">
                   <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Mise à jour</p>
                   <p class="text-[10px] font-black text-slate-900 italic">{{ doc.date }}</p>
                </div>
                
                <div class="flex items-center gap-3">
                   <button v-if="doc.status !== 'missing'" class="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 hover:text-indigo-600 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all flex items-center justify-center">
                     <Eye :size="18" />
                   </button>
                   
                   <button 
                     v-if="doc.status !== 'valid'"
                     @click="selectedDoc = doc"
                     class="h-12 px-8 rounded-lg bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 shadow-lg shadow-indigo-100 transition-all flex items-center gap-3 group/btn"
                   >
                     {{ doc.status === 'missing' ? 'Téléverser' : 'Remplacer' }}
                     <iconify-icon icon="solar:cloud-upload-bold" width="16" class="group-hover:-translate-y-0.5 transition-transform" />
                   </button>
                   
                   <div v-else class="h-12 px-6 rounded-lg bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border border-emerald-100">
                     <iconify-icon icon="solar:check-circle-bold" width="16" /> Validé
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <!-- SCANNER PROMO -->
      <div class="mt-20 px-2">
        <div class="relative bg-slate-900 rounded-xl p-10 md:p-14 overflow-hidden group shadow-2xl">
          <div class="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px]"></div>
          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div class="space-y-4">
              <h2 class="text-3xl font-black text-white italic uppercase tracking-tight">Scanner <span class="text-indigo-400">Instantané</span></h2>
              <p class="text-slate-400 text-sm font-medium max-w-sm">Capture tes documents directement avec ton téléphone.</p>
            </div>
            <button class="bg-white text-slate-900 px-10 py-5 rounded-lg font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:shadow-2xl active:scale-95 flex items-center gap-4">
              Ouvrir la Caméra <Smartphone :size="16" />
            </button>
          </div>
        </div>
      </div>

      <!-- REFINED MODAL -->
      <div v-if="selectedDoc" class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
        <div class="bg-white w-full max-w-sm rounded-xl p-4 shadow-2xl animate-in zoom-in duration-300">
          <div class="bg-slate-50/50 rounded-xl p-10 space-y-8">
             <div class="flex justify-between items-start">
                <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm text-indigo-600">
                   <Upload :size="20" />
                </div>
                <button @click="selectedDoc = null" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-slate-900">
                   <ArrowUpRight :size="18" style="transform: rotate(45deg)" />
                </button>
             </div>
             <div class="space-y-2">
                <h2 class="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{{ selectedDoc.name }}</h2>
                <p class="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{{ selectedDoc.fullName }}</p>
             </div>
             <div class="aspect-square border-2 border-dashed border-slate-200 rounded-xl bg-white flex flex-col items-center justify-center gap-4 hover:border-indigo-400 cursor-pointer transition-all">
                <FileText :size="24" class="text-slate-300" />
                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Parcourir...</p>
             </div>
             <button @click="selectedDoc = null" class="w-full py-5 rounded-lg bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">Téléverser Maintenant</button>
          </div>
        </div>
      </div>

    </div>
  </LayoutDashboardLayout>
</template>

<style scoped>
@keyframes pulse-soft {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
}
.animate-pulse {
  animation: pulse-soft 2s infinite ease-in-out;
}
</style>
