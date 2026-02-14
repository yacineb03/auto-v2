<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  History, Calendar, User, MapPin, 
  Star, ChevronRight, FileText, CheckCircle2,
  TrendingUp, Clock, Target, ArrowLeft
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

const stats = [
  { label: 'Heures totales', value: '12h', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Score Moyen Code', value: '34/40', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Objectifs validés', value: '8/24', icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50' },
]

const historyItems = ref([
  { 
    id: 1, 
    type: 'lesson',
    title: 'Conduite : Ville & Autoroute', 
    date: 'Hier, 14:00', 
    instructor: 'Marc L.', 
    duration: '2h',
    rating: 5,
    status: 'completed',
    comment: "Aujourd'hui, bonne maîtrise du volant, mais attention aux contrôles d'angle mort.",
    details: [
      { label: "Installation au poste", score: 5 },
      { label: "Utilisation des rétros", score: 3 },
      { label: "Dynamisme", score: 4 }
    ]
  },
  { 
    id: 2, 
    type: 'code',
    title: 'Examen Blanc #12', 
    date: '07 Fév, 18:30', 
    score: '36/40',
    status: 'passed'
  },
  { 
    id: 3, 
    type: 'lesson',
    title: 'Conduite : Manœuvres', 
    date: '05 Fév, 10:00', 
    instructor: 'Sarah M.', 
    duration: '1h',
    rating: 4,
    status: 'completed',
    comment: "Bien, mais le stationnement en épi reste à perfectionner. La gestion de l'embrayage est fluide.",
    details: [
      { label: "Angle mort", score: 5 },
      { label: "Rangement bataille", score: 4 },
      { label: "Rangement épi", score: 2 }
    ]
  },
])

const selectedItem = ref<any>(null)
const isModalOpen = ref(false)

const openDetails = (item: any) => {
  if (item.type === 'lesson') {
    selectedItem.value = item
    isModalOpen.value = true
  }
}

const menuItems = computed(() => {
  const baseItems = [{ to: '/dashboard', icon: 'solar:home-smile-bold', label: 'Tableau de bord' }]
  if (user.value?.rank === 1) {
    return [
      ...baseItems,
      { to: '/planning', icon: 'solar:calendar-linear', label: 'Planning' },
      { to: '/code-quiz', icon: 'solar:notebook-linear', label: 'Code & Quiz' },
      { to: '/historique', icon: 'solar:history-linear', label: 'Historique' },
      { to: '/documents', icon: 'solar:file-text-linear', label: 'Documents' },
      { to: '/messages', icon: 'solar:chat-round-line-linear', label: 'Messages', badge: 2 }
    ]
  }
  return baseItems
})
</script>

<template>
  <LayoutDashboardLayout
    page-title="Historique"
    page-subtitle="Retrouve l'ensemble de ton parcours et tes progrès."
    :menu-items="menuItems"
    :user="user"
  >
    <div class="max-w-5xl mx-auto space-y-12 pt-4 pb-24 animate-in fade-in duration-700">
      
      <!-- TOP STATS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="stat in stats" :key="stat.label" class="bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
          <div :class="['w-14 h-14 rounded-lg flex items-center justify-center transition-all', stat.bg, stat.color]">
            <component :is="stat.icon" :size="28" />
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{{ stat.label }}</p>
            <p class="text-3xl font-black text-slate-900 italic tabular-nums leading-none">{{ stat.value }}</p>
          </div>
        </div>
      </div>

      <!-- TIMELINE -->
      <div class="space-y-8">
        <div class="flex items-center justify-between px-2">
          <h2 class="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Flux d'activité</h2>
          <div class="flex gap-2">
             <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest">Tout</button>
             <button class="bg-white text-slate-400 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100 group hover:text-indigo-600 transition-all">Conduite</button>
             <button class="bg-white text-slate-400 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100 group hover:text-indigo-600 transition-all">Code</button>
          </div>
        </div>

        <div class="relative space-y-4">
          <!-- Central Line (Desktop) -->
          <div class="absolute left-8 top-0 bottom-0 w-px bg-slate-100 hidden md:block"></div>

          <div v-for="item in historyItems" :key="item.id" class="relative pl-0 md:pl-20 group">
            <!-- Timeline Node -->
            <div class="absolute left-7 top-10 w-2 h-2 rounded-full border-2 border-indigo-600 bg-white z-10 hidden md:block group-hover:scale-150 transition-transform"></div>

            <div 
              @click="openDetails(item)"
              class="bg-white p-6 md:p-8 rounded-xl border border-slate-100 shadow-sm hover:border-indigo-100 hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
            >
              <div class="flex items-center gap-8">
                <!-- Type Icon -->
                <div :class="['w-16 h-16 rounded-lg flex items-center justify-center shrink-0 border border-white shadow-sm', item.type === 'lesson' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600']">
                  <iconify-icon :icon="item.type === 'lesson' ? 'solar:steering-wheel-bold' : 'solar:notebook-bold'" width="28" />
                </div>

                <div class="space-y-1">
                  <div class="flex items-center gap-3">
                    <h3 class="text-lg font-black text-slate-900 uppercase tracking-tighter">{{ item.title }}</h3>
                    <span v-if="item.status === 'passed'" class="text-[9px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-md uppercase">Réussi</span>
                  </div>
                  <div class="flex flex-wrap items-center gap-4">
                    <div class="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
                      <Calendar :size="12" /> {{ item.date }}
                    </div>
                    <div v-if="item.instructor" class="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
                      <User :size="12" /> {{ item.instructor }}
                    </div>
                    <div v-if="item.duration" class="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold italic">
                      <Clock :size="12" /> {{ item.duration }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0 border-slate-50">
                <div v-if="item.rating" class="flex flex-col items-center md:items-end">
                   <p class="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1.5">Note Moniteur</p>
                   <div class="flex gap-0.5">
                     <Star v-for="i in 5" :key="i" :size="12" :fill="i <= item.rating ? '#4F46E5' : 'none'" :class="i <= item.rating ? 'text-indigo-600' : 'text-slate-200'" />
                   </div>
                </div>

                <div v-if="item.score" class="text-right">
                   <p class="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Score</p>
                   <p class="text-2xl font-black text-emerald-600 italic tabular-nums leading-none">{{ item.score }}</p>
                </div>

                <button class="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:translate-x-1 transition-all">
                   <FileText v-if="item.comment" :size="18" />
                   <ChevronRight v-else :size="18" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- MODAL DE RAPPORT DÉTAILLÉ -->
    <UiModal 
      v-model="isModalOpen" 
      title="Rapport de Séance" 
      subtitle="Détails et commentaires de ton moniteur."
      maxWidth="max-w-2xl"
    >
      <div v-if="selectedItem" class="space-y-8 py-4">
         <div class="flex items-center justify-between p-6 bg-slate-50 rounded-xl border border-slate-100">
            <div class="flex items-center gap-4">
               <div class="w-12 h-12 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-lg">
                  <iconify-icon icon="solar:steering-wheel-bold" width="24" />
               </div>
               <div>
                  <h4 class="text-lg font-black text-slate-900 uppercase tracking-tight italic">{{ selectedItem.title }}</h4>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ selectedItem.date }} • {{ selectedItem.instructor }}</p>
               </div>
            </div>
            <div class="text-right">
               <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Évaluation globale</p>
               <div class="flex gap-1">
                  <Star v-for="i in 5" :key="i" :size="14" :fill="i <= selectedItem.rating ? '#4F46E5' : 'none'" :class="i <= selectedItem.rating ? 'text-indigo-600' : 'text-slate-200'" />
               </div>
            </div>
         </div>

         <div class="space-y-4">
            <h5 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Commentaire du moniteur</h5>
            <div class="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100/50 relative">
               <span class="absolute -top-3 left-6 bg-white px-3 py-1 rounded-full border border-indigo-100 text-[10px] font-black text-indigo-600 uppercase">Avis pédagogique</span>
               <p class="text-slate-700 font-medium leading-relaxed italic text-lg">"{{ selectedItem.comment }}"</p>
            </div>
         </div>

         <div class="space-y-4">
            <h5 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Détail des compétences</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div v-for="skill in selectedItem.details" :key="skill.label" class="p-4 bg-white border border-slate-100 rounded-lg flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-600">{{ skill.label }}</span>
                  <div class="flex gap-0.5">
                     <Star v-for="i in 5" :key="i" :size="10" :fill="i <= skill.score ? '#4F46E5' : 'none'" :class="i <= skill.score ? 'text-indigo-600' : 'text-slate-200'" />
                  </div>
               </div>
            </div>
         </div>

         <button @click="isModalOpen = false" class="w-full py-4 bg-slate-900 text-white rounded-lg font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all">
            Fermer le rapport
         </button>
      </div>
    </UiModal>
  </LayoutDashboardLayout>
</template>
