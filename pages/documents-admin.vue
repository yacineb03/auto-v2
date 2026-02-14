<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  FileText, CheckCircle2, XCircle, Clock, 
  Search, Filter, Eye, Download, 
  ChevronRight, AlertCircle, ShieldCheck, Mail,
  Check, X
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

const searchQuery = ref('')
const selectedTab = ref('pending') // pending, validated, rejected

const submissions = ref([
  { 
    id: 1, 
    student: 'Yacine B.', 
    documentName: 'Pièce d\'identité', 
    type: 'Identity',
    date: 'Aujourd\'hui 10:24', 
    status: 'pending',
    avatar: 'YB',
    previewUrl: '#'
  },
  { 
    id: 2, 
    student: 'Sophie L.', 
    documentName: 'Justificatif de domicile', 
    type: 'Address',
    date: 'Hier 15:45', 
    status: 'pending',
    avatar: 'SL',
    previewUrl: '#'
  },
  { 
    id: 3, 
    student: 'Thomas M.', 
    documentName: 'Photo Signature Numérique', 
    type: 'Photo',
    date: '02 fév. 09:30', 
    status: 'pending',
    avatar: 'TM',
    previewUrl: '#'
  },
  { 
    id: 4, 
    student: 'Emma R.', 
    documentName: 'Certificat JDC', 
    type: 'JDC',
    date: '01 fév. 11:20', 
    status: 'validated',
    avatar: 'ER',
    previewUrl: '#'
  }
])

const filteredSubmissions = computed(() => {
  return submissions.value.filter(s => {
    const matchesSearch = s.student.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesTab = s.status === selectedTab.value
    return matchesSearch && matchesTab
  })
})

const counts = computed(() => ({
  pending: submissions.value.filter(s => s.status === 'pending').length,
  validated: submissions.value.filter(s => s.status === 'validated').length,
  rejected: submissions.value.filter(s => s.status === 'rejected').length,
}))

const approveDocument = (id: number) => {
  const doc = submissions.value.find(s => s.id === id)
  if (doc) doc.status = 'validated'
}

const rejectDocument = (id: number) => {
  const doc = submissions.value.find(s => s.id === id)
  if (doc) doc.status = 'rejected'
}
</script>

<template>
  <LayoutDashboardLayout
    page-title="Vérification Documents"
    page-subtitle="Validez les pièces justificatives envoyées par les élèves (ANTS)."
    :user="user"
  >
    <div class="animate-in fade-in duration-700 space-y-12 pt-4 pb-24 max-w-6xl mx-auto">
      
      <!-- TABS & SEARCH -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div class="flex p-1.5 bg-slate-100 rounded-xl w-fit">
          <button 
            @click="selectedTab = 'pending'"
            :class="selectedTab === 'pending' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
            class="px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
          >
            En attente <span class="bg-indigo-600 text-white w-5 h-5 rounded-md flex items-center justify-center text-[8px]">{{ counts.pending }}</span>
          </button>
          <button 
            @click="selectedTab = 'validated'"
            :class="selectedTab === 'validated' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
            class="px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Validés
          </button>
          <button 
            @click="selectedTab = 'rejected'"
            :class="selectedTab === 'rejected' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
            class="px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Refusés
          </button>
        </div>

        <div class="relative flex-1 max-w-md">
          <Search :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="RECHERCHER UN ÉLÈVE..." 
            class="w-full bg-white border border-slate-100 rounded-xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-indigo-400 transition-all shadow-sm"
          />
        </div>
      </div>

      <!-- DOCUMENTS LIST -->
      <div v-if="filteredSubmissions.length > 0" class="space-y-4">
        <div v-for="doc in filteredSubmissions" :key="doc.id" 
          class="bg-white p-8 rounded-xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:border-indigo-200 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-8"
        >
          <div class="flex items-center gap-8">
            <div class="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center font-black text-slate-400 italic text-sm shadow-inner border border-slate-100">
              {{ doc.avatar }}
            </div>
            
            <div class="space-y-1">
              <h3 class="text-xl font-black text-slate-900 uppercase tracking-tighter">{{ doc.student }}</h3>
              <div class="flex items-center gap-3">
                <FileText :size="12" class="text-indigo-600" />
                <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">{{ doc.documentName }}</p>
                <span class="w-1 h-1 rounded-full bg-slate-200"></span>
                <p class="text-[9px] font-bold text-slate-400 italic">{{ doc.date }}</p>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <!-- View / Download Actions -->
            <div class="flex items-center gap-2 border-r pr-6 border-slate-50">
               <button class="w-12 h-12 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center shadow-sm">
                  <Eye :size="20" />
               </button>
               <button class="w-12 h-12 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center shadow-sm">
                  <Download :size="20" />
               </button>
            </div>

            <!-- Approval Actions -->
            <div v-if="doc.status === 'pending'" class="flex items-center gap-3">
               <button 
                 @click="rejectDocument(doc.id)"
                 class="w-12 h-12 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center shadow-sm border border-rose-100"
               >
                  <X :size="20" stroke-width="3" />
               </button>
               <button 
                 @click="approveDocument(doc.id)"
                 class="h-12 px-8 rounded-lg bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-slate-950 transition-all shadow-lg shadow-emerald-100/50 flex items-center gap-2"
               >
                  <Check :size="16" stroke-width="3" /> Valider
               </button>
            </div>
            
            <!-- Status Label only -->
            <div v-else :class="['px-6 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest border', doc.status === 'validated' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100']">
              {{ doc.status === 'validated' ? 'Document Validé' : 'Document Refusé' }}
            </div>
          </div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-else class="text-center py-32 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
        <div class="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-sm">
          <ShieldCheck :size="40" stroke-width="1.5" />
        </div>
        <h3 class="text-2xl font-black text-slate-900 uppercase tracking-tighter">Tout est à jour !</h3>
        <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Aucun document en attente dans cette catégorie.</p>
      </div>

    </div>
  </LayoutDashboardLayout>
</template>

<style scoped>
.animate-in { animation-duration: 0.8s; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>
