<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Search, Filter, Plus, User, 
  ChevronRight, Phone, MessageCircle, 
  Clock, Target, Calendar, MoreVertical,
  Star, TrendingUp, ShieldCheck, MoreHorizontal
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
const { success } = useToast()

const searchQuery = ref('')
const isModalOpen = ref(false)

const instructors = ref([
  { id: 1, name: 'Marc Leblanc', students: 18, lessons: 42, passRate: 87, avatar: 'ML', status: 'available' },
  { id: 2, name: 'Sarah Dupont', students: 24, lessons: 48, passRate: 92, avatar: 'SD', status: 'busy' },
  { id: 3, name: 'Julie Martin', students: 20, lessons: 45, passRate: 89, avatar: 'JM', status: 'available' },
])

const filteredInstructors = computed(() => {
  return instructors.value.filter(i => 
    i.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const handleSuccess = () => {
  isModalOpen.value = false
  success('Moniteur ajouté avec succès ! 🎓')
}
</script>

<template>
  <LayoutDashboardLayout
    page-title="Gestion des Moniteurs"
    page-subtitle="Suivez la performance et le planning de vos moniteurs."
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
            placeholder="RECHERCHER UN MONITEUR (NOM...)" 
            class="w-full bg-slate-50 border border-slate-100 rounded-lg py-3.5 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest outline-none focus:border-indigo-400 focus:bg-white transition-all"
          />
        </div>
        
        <button 
          @click="isModalOpen = true"
          class="bg-indigo-600 text-white px-8 py-3.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all flex items-center gap-3"
        >
          <Plus :size="16" /> Ajouter un moniteur
        </button>
      </div>

      <!-- ELITE INSTRUCTORS GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="instructor in filteredInstructors" :key="instructor.id" class="group">
          <div class="bg-white p-7 rounded-xl border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-xl transition-all duration-500 relative overflow-hidden">
            <!-- Decorative accent -->
            <div class="absolute right-0 top-0 w-24 h-24 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="flex items-start justify-between mb-8 relative z-10">
               <div class="relative group/avatar">
                  <div class="w-20 h-20 rounded-xl bg-slate-50 flex items-center justify-center text-2xl font-black text-slate-900 italic border border-slate-100 group-hover:text-indigo-600 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all">
                    {{ instructor.avatar }}
                  </div>
                  <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white shadow-sm" :class="instructor.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'"></div>
               </div>
               <button class="w-10 h-10 rounded-lg bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-slate-100 transition-all flex items-center justify-center">
                 <MoreHorizontal :size="18" />
               </button>
            </div>
 
            <div class="mb-8 relative z-10">
               <h3 class="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">{{ instructor.name }}</h3>
               <div class="flex items-center gap-2">
                 <span class="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-widest">Expert Agréé</span>
                 <span class="w-1 h-1 rounded-full bg-slate-200"></span>
                 <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ID #0{{ instructor.id }}</span>
               </div>
            </div>
 
            <div class="grid grid-cols-3 gap-2 py-6 border-y border-slate-50 mb-8 relative z-10">
               <div class="text-center px-2">
                  <p class="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1.5">Élèves</p>
                  <p class="text-lg font-black text-slate-900 italic tabular-nums leading-none">{{ instructor.students }}</p>
               </div>
               <div class="text-center px-2 border-x border-slate-100">
                  <p class="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1.5">Leçons</p>
                  <p class="text-lg font-black text-slate-900 italic tabular-nums leading-none">{{ instructor.lessons }}</p>
               </div>
               <div class="text-center px-2">
                  <p class="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1.5">Passage</p>
                  <p class="text-lg font-black text-emerald-600 italic tabular-nums leading-none">{{ instructor.passRate }}%</p>
               </div>
            </div>
 
            <div class="flex items-center gap-3 relative z-10">
               <button class="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 hover:text-indigo-600 hover:bg-white hover:border-indigo-100 transition-all flex items-center justify-center">
                 <MessageCircle :size="18" />
               </button>
               <NuxtLink :to="`/moniteurs/${instructor.id}`" class="flex-1 h-12 rounded-lg bg-slate-900 text-white font-black text-[9px] uppercase tracking-widest hover:bg-indigo-600 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-3 group/link">
                 Fiche Profil 
                 <iconify-icon icon="solar:round-alt-arrow-right-bold" width="16" class="group-hover/link:translate-x-1 transition-transform" />
               </NuxtLink>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- MODAL AJOUT MONITEUR -->
    <UiModal 
      v-model="isModalOpen" 
      title="Nouveau Moniteur" 
      subtitle="Ajoutez un collaborateur à votre équipe pédagogique."
      maxWidth="max-w-xl"
    >
      <ModalsInstructorAdd @success="handleSuccess" />
    </UiModal>
  </LayoutDashboardLayout>
</template>
