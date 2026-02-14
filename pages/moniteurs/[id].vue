<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  User, Mail, Phone, Calendar, 
  Clock, Star, TrendingUp, CheckCircle2,
  ChevronLeft, MoreHorizontal, MessageCircle,
  Car, Users, Award, ShieldCheck, 
  ArrowUpRight, BarChart3, Clock3
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
const route = useRoute()
const router = useRouter()

const instructorId = route.params.id

// Mock data pour le moniteur
const instructor = ref({
  id: instructorId,
  name: 'Marc Leblanc',
  email: 'marc.leblanc@driveflow.fr',
  phone: '06 98 76 54 32',
  avatar: 'ML',
  status: 'available',
  seniority: '5 ans',
  specialty: 'Boîte Manuelle / Éco-conduite',
  
  stats: {
    passRate: 92,
    activeStudents: 24,
    monthlyHours: 145,
    rating: 4.9
  }
})

const activeTab = ref('overview')

const tabs = [
  { id: 'overview', label: 'Performance', icon: 'solar:chart-square-bold' },
  { id: 'students', label: 'Mes Élèves', icon: 'solar:users-group-rounded-bold' },
  { id: 'planning', label: 'Planning Hebdo', icon: 'solar:calendar-bold' }
]

const assignedStudents = [
  { id: 1, name: 'Yacine B.', progress: 75, nextLesson: 'Demain 14:00', avatar: 'YB' },
  { id: 2, name: 'Sophie L.', progress: 40, nextLesson: 'Mer 10:00', avatar: 'SL' },
  { id: 3, name: 'Thomas M.', progress: 95, nextLesson: 'Jeu 11:30', avatar: 'TM' },
  { id: 4, name: 'Emma R.', progress: 20, nextLesson: 'Ven 09:00', avatar: 'ER' },
]

const recentHistory = [
  { id: 1, event: 'Examen Pratique : Yacine B.', status: 'success', date: 'Hier' },
  { id: 2, event: 'Nouvelle Inscription : Emma R.', status: 'neutral', date: '05 Fév' },
  { id: 3, event: 'Examen de Code : Thomas M.', status: 'success', date: '02 Fév' },
]
</script>

<template>
  <LayoutDashboardLayout
    :page-title="`Fiche Moniteur : ${instructor.name}`"
    page-subtitle="Suivez la performance et les élèves de ce moniteur."
    :user="user"
  >
    <div class="max-w-[1400px] mx-auto pb-32 pt-4 animate-in fade-in duration-700">
      
      <!-- BACK BUTTON -->
      <button 
        @click="router.back()" 
        class="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all mb-8 group"
      >
        <div class="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
          <ChevronLeft :size="16" />
        </div>
        <span class="text-[10px] font-black uppercase tracking-widest">Retour à la liste</span>
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <!-- SIDEBAR INFO -->
        <div class="lg:col-span-4 space-y-8">
          <div class="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden">
             <!-- Status -->
             <div class="absolute top-10 right-10 flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span class="text-[9px] font-black text-emerald-500 uppercase tracking-widest">En poste</span>
             </div>

             <div class="flex flex-col items-center text-center">
                <div class="w-28 h-28 rounded-[2.8rem] bg-indigo-50 border-4 border-white shadow-2xl flex items-center justify-center text-4xl font-black text-indigo-600 italic mb-8">
                  {{ instructor.avatar }}
                </div>
                <h2 class="text-3xl font-black text-slate-900 uppercase tracking-tighter">{{ instructor.name }}</h2>
                <div class="flex items-center gap-2 mt-2">
                   <ShieldCheck :size="14" class="text-indigo-600" />
                   <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Moniteur Référent</p>
                </div>
                
                <div class="flex gap-2 mt-10 w-full">
                   <button class="flex-1 py-4 bg-slate-900 text-white rounded-[1.5rem] text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2">
                     <MessageCircle :size="14" /> Contacter
                   </button>
                   <button class="w-16 py-4 bg-slate-50 text-slate-400 rounded-[1.5rem] flex items-center justify-center hover:bg-slate-100 transition-all">
                     <MoreHorizontal :size="18" />
                   </button>
                </div>
             </div>

             <div class="mt-12 space-y-8 pt-10 border-t border-slate-50">
                <div class="grid grid-cols-2 gap-4">
                   <div class="p-5 bg-slate-50/50 rounded-3xl border border-transparent hover:border-slate-100 transition-all">
                      <p class="text-[8px] font-black text-slate-300 uppercase leading-none mb-2">Ancienneté</p>
                      <p class="text-xs font-black text-slate-900">{{ instructor.seniority }}</p>
                   </div>
                   <div class="p-5 bg-slate-50/50 rounded-3xl border border-transparent hover:border-slate-100 transition-all">
                      <p class="text-[8px] font-black text-slate-300 uppercase leading-none mb-2">Note Moyenne</p>
                      <div class="flex items-center gap-1">
                        <Star :size="10" fill="#4F46E5" class="text-indigo-600" />
                        <p class="text-xs font-black text-slate-900">{{ instructor.stats.rating }}</p>
                      </div>
                   </div>
                </div>
                <div class="flex items-center gap-4 px-2">
                   <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
                     <Mail :size="16" />
                   </div>
                   <p class="text-xs font-black text-slate-900 truncate">{{ instructor.email }}</p>
                </div>
                <div class="flex items-center gap-4 px-2">
                   <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
                     <Phone :size="16" />
                   </div>
                   <p class="text-xs font-black text-slate-900">{{ instructor.phone }}</p>
                </div>
             </div>
          </div>

          <!-- Quick Recap -->
          <div class="bg-slate-950 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
             <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
             <h4 class="text-lg font-black italic uppercase tracking-tighter mb-8">Derniers Événements</h4>
             <div class="space-y-6 relative z-10">
                <div v-for="item in recentHistory" :key="item.id" class="flex gap-4">
                   <div :class="['w-1.5 h-10 rounded-full', item.status === 'success' ? 'bg-emerald-500' : 'bg-slate-700']"></div>
                   <div>
                      <p class="text-[10px] font-black uppercase tracking-tight">{{ item.event }}</p>
                      <p class="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">{{ item.date }}</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <!-- MAIN CONTENT -->
        <div class="lg:col-span-8 space-y-10">
          
          <!-- Navigation -->
          <div class="flex p-2 bg-white rounded-[2.2rem] border border-slate-100 shadow-sm">
             <button 
               v-for="tab in tabs" 
               :key="tab.id"
               @click="activeTab = tab.id"
               :class="activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-900'"
               class="flex-1 px-8 py-4 rounded-[1.6rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3"
             >
                <iconify-icon :icon="tab.icon" width="16" />
                {{ tab.label }}
             </button>
          </div>

          <!-- Performance Tab -->
          <div v-if="activeTab === 'overview'" class="space-y-8 animate-in fade-in duration-500">
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                   <div class="absolute right-0 top-0 w-24 h-24 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                      <Award :size="22" />
                   </div>
                   <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Taux de Réussite</p>
                   <h4 class="text-4xl font-black text-slate-900 italic tracking-tighter tabular-nums">{{ instructor.stats.passRate }}%</h4>
                   <p class="text-[9px] font-black text-emerald-500 mt-2 flex items-center gap-1">
                      <ArrowUpRight :size="10" /> +4% ce mois-ci
                   </p>
                </div>

                <div class="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                   <div class="absolute right-0 top-0 w-24 h-24 bg-orange-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <div class="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                      <Users :size="22" />
                   </div>
                   <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Élèves Actifs</p>
                   <h4 class="text-4xl font-black text-slate-900 italic tracking-tighter tabular-nums">{{ instructor.stats.activeStudents }}</h4>
                   <p class="text-[9px] font-black text-slate-300 mt-2 uppercase tracking-widest">Capacité max : 30</p>
                </div>

                <div class="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                   <div class="absolute right-0 top-0 w-24 h-24 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                      <Clock3 :size="22" />
                   </div>
                   <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Heures (Mois)</p>
                   <h4 class="text-4xl font-black text-slate-900 italic tracking-tighter tabular-nums">{{ instructor.stats.monthlyHours }}h</h4>
                   <div class="h-1 w-full bg-slate-50 rounded-full mt-4 overflow-hidden">
                      <div class="h-full bg-indigo-600 w-[85%]"></div>
                   </div>
                </div>
             </div>

             <!-- Performance Graph Mockup -->
             <div class="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
                <div class="flex justify-between items-center mb-10">
                   <h3 class="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Activité Mensuelle</h3>
                   <div class="flex items-center gap-2">
                      <span class="w-3 h-3 rounded-full bg-indigo-600"></span>
                      <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Leçons données</span>
                   </div>
                </div>
                <div class="h-64 flex items-end gap-10 px-4 pt-10 border-b border-slate-50">
                   <div v-for="(h, i) in [40, 65, 50, 85, 95, 70]" :key="i" class="flex-1 bg-slate-50 hover:bg-indigo-600 transition-all cursor-pointer rounded-t-2xl relative group" :style="{ height: h + '%' }">
                      <div class="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                        {{ 120 + i * 5 }}h
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <!-- Students Tab -->
          <div v-if="activeTab === 'students'" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div v-for="student in assignedStudents" :key="student.id" class="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-indigo-200 transition-all group">
                <div class="flex items-center gap-5 mb-8">
                   <div class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-400 italic text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                      {{ student.avatar }}
                   </div>
                   <div>
                      <h4 class="text-base font-black text-slate-900 uppercase tracking-tight">{{ student.name }}</h4>
                      <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Prochain : {{ student.nextLesson }}</p>
                   </div>
                </div>
                <div class="space-y-2">
                   <div class="flex justify-between items-center">
                      <p class="text-[8px] font-black text-slate-300 uppercase tracking-widest">Progression</p>
                      <p class="text-[10px] font-black text-slate-900 italic">{{ student.progress }}%</p>
                   </div>
                   <div class="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div class="h-full bg-slate-900" :style="{ width: student.progress + '%' }"></div>
                   </div>
                </div>
             </div>
          </div>

          <!-- Planning Tab (Placeholder) -->
          <div v-if="activeTab === 'planning'" class="bg-white p-12 rounded-[3.5rem] border border-slate-100 text-center py-32 space-y-6 animate-in fade-in zoom-in-95 duration-500">
             <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
               <Calendar :size="40" />
             </div>
             <div>
               <h3 class="text-2xl font-black text-slate-900 uppercase tracking-tighter">Planning Hebdomadaire</h3>
               <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 max-w-sm mx-auto">Consultez l'agenda complet de Marc et déplacez les leçons en un clic.</p>
             </div>
             <button class="px-10 py-5 bg-slate-900 text-white rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">
               Ouvrir l'agenda complet
             </button>
          </div>

        </div>
      </div>

    </div>
  </LayoutDashboardLayout>
</template>

<style scoped>
.animate-in { animation-duration: 0.8s; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>
