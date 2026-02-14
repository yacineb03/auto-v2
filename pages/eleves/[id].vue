<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  User, Mail, Phone, MapPin, Calendar, 
  Clock, FileText, Wallet, Star, 
  TrendingUp, CheckCircle2, AlertCircle,
  ChevronLeft, MoreHorizontal, MessageCircle,
  Clock3, Car, GraduationCap, Award
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
const route = useRoute()
const router = useRouter()

const studentId = route.params.id

// Mock data pour l'élève (sera remplacé par un fetch API)
const student = ref({
  id: studentId,
  firstname: 'Yacine',
  lastname: 'B.',
  email: 'yacine@exemple.com',
  phone: '06 12 34 56 78',
  address: '123 Avenue de la République, 75011 Paris',
  avatar: 'YB',
  status: 'active',
  rank: 1,
  registrationDate: '15 Sep 2025',
  licenseType: 'Permis B (Manuelle)',
  formula: 'Pack Zen (20h + Code)',
  
  stats: {
    hoursDone: 15,
    hoursTotal: 20,
    progress: 75,
    averageRating: 4.8,
    codeStatus: 'valid'
  }
})

const activeTab = ref('overview')

const tabs = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: 'solar:user-bold' },
  { id: 'pedagogy', label: 'Suivi Pédagogique', icon: 'solar:notebook-bold' },
  { id: 'documents', label: 'Documents', icon: 'solar:file-text-bold' },
  { id: 'payments', label: 'Historique Paiements', icon: 'solar:wallet-money-bold' }
]

const recentLessons = [
  { id: 1, date: 'Aujourd\'hui', time: '14:00 - 15:00', instructor: 'Marc Leblanc', topic: 'Régulateur et limitations', status: 'completed', rating: 5 },
  { id: 2, date: '05 Fév', time: '10:00 - 11:00', instructor: 'Marc Leblanc', topic: 'Insertion autoroute', status: 'completed', rating: 4 },
  { id: 3, date: 'Log Fév', time: '16:00 - 17:00', instructor: 'Marc Leblanc', topic: 'Créneaux et stationnement', status: 'completed', rating: 5 },
]

const pendingDocuments = [
  { id: 1, name: 'Justificatif de domicile', status: 'pending', date: '08 Fév' },
]

const payments = [
  { id: 1, amount: 1200, label: 'Forfait 20h + Code', status: 'paid', date: '15 Sep 2025' },
  { id: 2, amount: 45, label: 'Heure supplémentaire', status: 'paid', date: '02 Jan 2026' },
]
</script>

<template>
  <LayoutDashboardLayout
    :page-title="`Fiche Élève : ${student.firstname} ${student.lastname}`"
    page-subtitle="Gérez le parcours et les documents de cet élève."
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
        
        <!-- SIDEBAR INFO (4 COLS) -->
        <div class="lg:col-span-4 space-y-8">
          <!-- Profile Card -->
          <div class="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden">
             <!-- Status Badge -->
             <div class="absolute top-8 right-8">
                <span class="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[9px] font-black uppercase tracking-widest">Actif</span>
             </div>

             <div class="flex flex-col items-center text-center pt-4">
                <div class="w-24 h-24 rounded-[2.5rem] bg-indigo-50 border-4 border-white shadow-xl flex items-center justify-center text-3xl font-black text-indigo-600 italic mb-6">
                  {{ student.avatar }}
                </div>
                <h2 class="text-3xl font-black text-slate-900 uppercase tracking-tighter">{{ student.firstname }} {{ student.lastname }}</h2>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{{ student.licenseType }}</p>
                
                <div class="flex gap-2 mt-8 w-full">
                   <button class="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                     <MessageCircle :size="14" /> Message
                   </button>
                   <button class="w-14 py-4 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-all">
                     <MoreHorizontal :size="18" />
                   </button>
                </div>
             </div>

             <div class="mt-10 space-y-6 pt-10 border-t border-slate-50">
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
                     <Mail :size="16" />
                   </div>
                   <div class="flex-1">
                      <p class="text-[8px] font-black text-slate-300 uppercase leading-none mb-1">Email</p>
                      <p class="text-xs font-black text-slate-900 truncate">{{ student.email }}</p>
                   </div>
                </div>
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
                     <Phone :size="16" />
                   </div>
                   <div class="flex-1">
                      <p class="text-[8px] font-black text-slate-300 uppercase leading-none mb-1">Téléphone</p>
                      <p class="text-xs font-black text-slate-900">{{ student.phone }}</p>
                   </div>
                </div>
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
                     <MapPin :size="16" />
                   </div>
                   <div class="flex-1">
                      <p class="text-[8px] font-black text-slate-300 uppercase leading-none mb-1">Adresse</p>
                      <p class="text-xs font-bold text-slate-500 leading-tight">{{ student.address }}</p>
                   </div>
                </div>
             </div>
          </div>

          <!-- Shortcuts/Stats -->
          <div class="bg-indigo-600 rounded-[3rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
             <div class="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-1000"></div>
             <p class="text-[9px] font-black uppercase tracking-[0.2em] opacity-50 mb-6">Objectif Permis</p>
             <div class="flex items-baseline gap-2 mb-8">
               <span class="text-6xl font-black italic tracking-tighter">75<span class="text-xl not-italic ml-1 opacity-40">%</span></span>
             </div>
             <button class="w-full bg-white text-indigo-600 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                Plannifier un examen
             </button>
          </div>
        </div>

        <!-- MAIN CONTENT (8 COLS) -->
        <div class="lg:col-span-8 space-y-10">
          
          <!-- Tabs Navigation -->
          <div class="flex p-2 bg-white rounded-[2.2rem] border border-slate-100 shadow-sm overflow-x-auto scrollbar-hide">
             <button 
               v-for="tab in tabs" 
               :key="tab.id"
               @click="activeTab = tab.id"
               :class="activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'"
               class="px-8 py-4 rounded-[1.6rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-3"
             >
                <iconify-icon :icon="tab.icon" width="16" />
                {{ tab.label }}
             </button>
          </div>

          <!-- Tab Content: Overview -->
          <div v-if="activeTab === 'overview'" class="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
             
             <!-- Metrics Grid -->
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                   <div class="flex justify-between items-start mb-4">
                      <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                         <Clock :size="18" />
                      </div>
                      <span class="text-[10px] font-black text-slate-300 italic">CONDUITE</span>
                   </div>
                   <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Heures Effectuées</p>
                   <h4 class="text-3xl font-black text-slate-900 italic tracking-tighter">{{ student.stats.hoursDone }}<span class="text-sm not-italic text-slate-300 ml-1">/ {{ student.stats.hoursTotal }}H</span></h4>
                </div>

                <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                   <div class="flex justify-between items-start mb-4">
                      <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                         <CheckCircle2 :size="18" />
                      </div>
                      <span class="text-[10px] font-black text-emerald-600 italic">VALIDÉ</span>
                   </div>
                   <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Code de la route</p>
                   <h4 class="text-3xl font-black text-slate-900 italic tracking-tighter">Réussi</h4>
                </div>

                <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                   <div class="flex justify-between items-start mb-4">
                      <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                         <TrendingUp :size="18" />
                      </div>
                      <span class="text-[10px] font-black text-indigo-600 italic">+5%</span>
                   </div>
                   <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Score Pédagogique</p>
                   <h4 class="text-3xl font-black text-slate-900 italic tracking-tighter">{{ student.stats.averageRating }}<span class="text-sm not-italic text-slate-300 ml-1">/ 5</span></h4>
                </div>
             </div>

             <!-- Recent Lessons -->
             <div class="bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.02)] overflow-hidden">
                <div class="p-10 border-b border-slate-50 flex justify-between items-center">
                   <h3 class="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Dernières Leçons</h3>
                   <button class="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Voir tout</button>
                </div>
                <div class="divide-y divide-slate-50">
                   <div v-for="lesson in recentLessons" :key="lesson.id" class="p-8 hover:bg-slate-50 transition-all flex items-center justify-between gap-8 group">
                      <div class="flex items-center gap-6">
                         <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <Car :size="20" />
                         </div>
                         <div>
                            <p class="text-sm font-black text-slate-900 uppercase tracking-tight">{{ lesson.topic }}</p>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{{ lesson.date }} • {{ lesson.time }}</p>
                         </div>
                      </div>
                      <div class="text-right">
                         <p class="text-[9px] font-black text-slate-800 uppercase leading-none mb-1">{{ lesson.instructor }}</p>
                         <div class="flex gap-0.5 justify-end">
                            <Star v-for="i in 5" :key="i" :size="8" :fill="i <= lesson.rating ? '#4F46E5' : 'transparent'" :class="i <= lesson.rating ? 'text-indigo-600' : 'text-slate-200'" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>

          </div>

          <!-- Tab Content: Pedagogy (Simplified Example) -->
          <div v-if="activeTab === 'pedagogy'" class="bg-white p-12 rounded-[3.5rem] border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
             <div class="flex items-center justify-between mb-12">
                <h3 class="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Livret d'apprentissage</h3>
                <button class="px-6 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Imprimer CERFA</button>
             </div>
             
             <div class="space-y-12">
                <div v-for="comp in ['Compétence 1 : Maîtriser le véhicule', 'Compétence 2 : Appréhender la route', 'Compétence 3 : Circuler en sécurité']" :key="comp" class="space-y-6">
                   <div class="flex justify-between items-center">
                      <h4 class="font-black text-sm uppercase text-slate-900 tracking-tight">{{ comp }}</h4>
                      <span class="text-[10px] font-black text-emerald-500 italic">Validé</span>
                   </div>
                   <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div class="h-full bg-emerald-500 w-full"></div>
                   </div>
                </div>
             </div>
          </div>

          <!-- Tab Content: Documents -->
          <div v-if="activeTab === 'documents'" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
             <div v-for="doc in ['CNI / Passeport', 'Justificatif Domicile', 'Photos ANTS', 'Attestation JDC']" :key="doc" class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-indigo-200 transition-all">
                <div class="flex justify-between items-start mb-6">
                   <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                      <FileText :size="20" />
                   </div>
                   <span class="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-xl text-[8px] font-black uppercase tracking-widest">Validé</span>
                </div>
                <h4 class="text-sm font-black text-slate-900 uppercase tracking-tight">{{ doc }}</h4>
                <p class="text-[9px] font-bold text-slate-400 mt-1 italic">Mis à jour le 15 Jan 2026</p>
             </div>
          </div>

          <!-- Tab Content: Payments -->
          <div v-if="activeTab === 'payments'" class="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
             <div v-for="pay in payments" :key="pay.id" class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
                <div class="flex items-center gap-6">
                   <div class="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                      <Wallet :size="20" />
                   </div>
                   <div>
                      <p class="text-sm font-black text-slate-900 uppercase tracking-tight">{{ pay.label }}</p>
                      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{{ pay.date }}</p>
                   </div>
                </div>
                <div class="text-right">
                   <p class="text-xl font-black text-slate-900 tabular-nums">{{ pay.amount }} €</p>
                   <p class="text-[9px] font-black text-emerald-500 uppercase italic">Paiement CB</p>
                </div>
             </div>
          </div>

        </div>
      </div>

    </div>
  </LayoutDashboardLayout>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.animate-in { animation-duration: 0.8s; }
</style>
