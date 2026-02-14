<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Search, Filter, Plus, User, 
  ChevronRight, Phone, MessageCircle, 
  Clock, Target, Calendar, MoreVertical,
  Star, TrendingUp, ShieldCheck
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

const searchQuery = ref('')

const students = ref([
  { 
    id: 1, 
    name: 'Yacine B.', 
    progress: 75, 
    hoursDone: 15, 
    totalHours: 20, 
    nextLesson: 'Demain 09:00',
    status: 'active',
    avatar: 'YB',
    rating: 4.8
  },
  { 
    id: 2, 
    name: 'Sophie L.', 
    progress: 40, 
    hoursDone: 8, 
    totalHours: 20, 
    nextLesson: 'Mer 11:00',
    status: 'active',
    avatar: 'SL',
    rating: 4.5
  },
  { 
    id: 3, 
    name: 'Thomas M.', 
    progress: 95, 
    hoursDone: 19, 
    totalHours: 20, 
    nextLesson: 'Jeu 14:00',
    status: 'exam_ready',
    avatar: 'TM',
    rating: 4.9
  },
  { 
    id: 4, 
    name: 'Léa D.', 
    progress: 10, 
    hoursDone: 2, 
    totalHours: 25, 
    nextLesson: 'Jeu 16:00',
    status: 'active',
    avatar: 'LD',
    rating: 4.2
  },
])

const filteredStudents = computed(() => {
  return students.value.filter(s => 
    s.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const isModalOpen = ref(false)
const { success } = useToast()

const handleSuccess = () => {
  isModalOpen.value = false
  success('Élève inscrit avec succès ! 🎉')
}
</script>

<template>
  <LayoutDashboardLayout
    :page-title="user?.rank === 3 ? 'Gestion des Élèves' : 'Mes Élèves'"
    :page-subtitle="user?.rank === 3 ? 'Gérez l\'ensemble des élèves de l\'auto-école.' : 'Suivez la progression de vos élèves et planifiez leurs leçons.'"
    :user="user"
  >
    <div class="animate-in fade-in duration-700 space-y-12 pt-4 pb-24 max-w-6xl mx-auto">
      
      <!-- ELITE TOOLBAR -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <div class="relative flex-1 max-w-xl group">
          <Search :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="RECHERCHER UN ÉLÈVE (NOM, PRÉNOM...)" 
            class="w-full bg-slate-50 border border-slate-100 rounded-lg py-3.5 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest outline-none focus:border-indigo-400 focus:bg-white transition-all"
          />
        </div>
        
        <div class="flex items-center gap-3">
          <button class="flex items-center gap-2 bg-white border border-slate-100 px-6 py-3.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm">
            <Filter :size="14" /> Filtrer
          </button>
          
          <div class="h-8 w-px bg-slate-100 hidden sm:block"></div>

          <button 
            @click="isModalOpen = true"
            class="bg-indigo-600 text-white px-8 py-3.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all flex items-center gap-3"
          >
            <Plus :size="16" /> Nouvel Élève
          </button>
        </div>
      </div>

      <!-- ELITE STUDENTS GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="student in filteredStudents" :key="student.id" class="group">
          <div class="bg-white p-7 rounded-xl border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-xl transition-all duration-500 relative overflow-hidden">
            <!-- Decorative accent -->
            <div class="absolute right-0 top-0 w-24 h-24 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <!-- Header Card -->
            <div class="flex items-start justify-between mb-8 relative z-10">
               <div class="flex items-center gap-5">
                  <div class="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-xl font-black text-slate-900 italic group-hover:text-indigo-600 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all">
                    {{ student.avatar }}
                  </div>
                  <div>
                    <h3 class="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">{{ student.name }}</h3>
                    <div class="flex items-center gap-3">
                       <div class="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100">
                         <Star :size="10" fill="currentColor" />
                         <span class="text-[9px] font-black italic">{{ student.rating }}</span>
                       </div>
                       <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ student.hoursDone }} / {{ student.totalHours }}H</span>
                    </div>
                  </div>
               </div>
               <button class="w-10 h-10 rounded-lg bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-slate-100 transition-all flex items-center justify-center">
                 <MoreVertical :size="18" />
               </button>
            </div>
 
            <!-- Stats Elite Row -->
            <div class="grid grid-cols-2 gap-4 mb-8 relative z-10">
               <div class="bg-slate-50 p-4 rounded-lg border border-slate-100/50">
                  <div class="flex justify-between items-center mb-2">
                    <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Progression</p>
                    <span class="text-[10px] font-black text-slate-900 italic tabular-nums">{{ student.progress }}%</span>
                  </div>
                  <div class="w-full h-1.5 bg-white rounded-full overflow-hidden border border-slate-100">
                    <div class="h-full bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]" :style="{ width: student.progress + '%' }"></div>
                  </div>
               </div>
               <div class="bg-slate-50 p-4 rounded-lg border border-slate-100/50">
                  <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Prochain RDV</p>
                  <div class="flex items-center gap-2 text-slate-900 font-black italic text-[10px] uppercase">
                    <Calendar :size="12" class="text-indigo-600" />
                    {{ student.nextLesson }}
                  </div>
               </div>
            </div>
 
            <!-- Action Buttons Refined -->
            <div class="flex items-center gap-3 relative z-10">
               <div class="flex gap-2">
                 <button class="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 hover:text-indigo-600 hover:bg-white hover:border-indigo-100 transition-all flex items-center justify-center">
                   <MessageCircle :size="18" />
                 </button>
                 <button class="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 hover:text-indigo-600 hover:bg-white hover:border-indigo-100 transition-all flex items-center justify-center">
                   <Phone :size="18" />
                 </button>
               </div>
               <NuxtLink :to="`/eleves/${student.id}`" class="flex-1 h-12 rounded-lg bg-slate-900 text-white font-black text-[9px] uppercase tracking-widest hover:bg-indigo-600 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-3 group/link">
                 Fiche {{ user?.rank === 3 ? 'Complète' : 'Élève' }} 
                 <iconify-icon icon="solar:round-alt-arrow-right-bold" width="16" class="group-hover/link:translate-x-1 transition-transform" />
               </NuxtLink>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- MODAL INSCRIPTION -->
    <UiModal 
      v-model="isModalOpen" 
      title="Nouvel Inscrit" 
      subtitle="Configurez le profil et le forfait de votre nouvel élève."
      maxWidth="max-w-xl"
    >
      <ModalsStudentRegistration @success="handleSuccess" />
    </UiModal>
  </LayoutDashboardLayout>
</template>
