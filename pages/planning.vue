<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  ChevronLeft, ChevronRight, Clock, User, MapPin, 
  Calendar as CalendarIcon, CheckCircle2, 
  ArrowRight, X, Plus, Filter, MoreHorizontal,
  MessageCircle, Search
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

// --- LOGIQUE ÉLÈVE (Réservation) ---
const selectedDay = ref('11')
const selectedSlot = ref(null)
const selectedDuration = ref('2h')

const days = [
  { day: 'Lun', date: '09', available: true },
  { day: 'Mar', date: '10', available: true },
  { day: 'Mer', date: '11', available: true },
  { day: 'Jeu', date: '12', available: true },
  { day: 'Ven', date: '13', available: true },
  { day: 'Sam', date: '14', available: false },
]

const slots = [
  { id: 1, time: '08:00', instructor: 'Marc L.', location: 'Gare St-Charles', status: 'available' },
  { id: 2, time: '10:00', instructor: 'Marc L.', location: 'Gare St-Charles', status: 'available' },
  { id: 3, time: '14:00', instructor: 'Sarah M.', location: 'Prado', status: 'available' },
  { id: 4, time: '16:00', instructor: 'Sarah M.', location: 'Prado', status: 'booked' },
  { id: 5, time: '18:00', instructor: 'Marc L.', location: 'Castellane', status: 'available' },
]

// --- LOGIQUE STAFF (Agenda) ---
const instructorLessons = ref([
  { id: 1, student: 'Yacine B.', studentId: 'S001', time: '09:00 - 11:00', type: 'Ville & Autoroute', location: 'Gare St-Charles', status: 'completed', instructor: 'Moi', instructorId: 'M001' },
  { id: 2, student: 'Sophie L.', studentId: 'S002', time: '11:00 - 13:00', type: 'Manœuvres', location: 'Place Castellane', status: 'active', instructor: 'Moi', instructorId: 'M001' },
  { id: 3, student: 'Thomas M.', studentId: 'S003', time: '14:00 - 16:00', type: 'Évaluation', location: 'Vieux-Port', status: 'pending', instructor: 'Moi', instructorId: 'M001' },
  { id: 4, student: 'Léa D.', studentId: 'S004', time: '16:00 - 18:00', type: 'Première Leçon', location: 'Agence', status: 'pending', instructor: 'Moi', instructorId: 'M001' },
])

// --- LOGIQUE ADMIN (Vue Globale & Edition) ---
const searchQuery = ref('')
const isEditModalOpen = ref(false)
const isAddModalOpen = ref(false)
const editingLesson = ref<any>(null)

const newLesson = ref({
  student: '',
  instructor: '',
  time: '08:00 - 10:00',
  location: 'Agence',
  type: 'Ville'
})

const allLessons = ref([
  { id: 1, student: 'Yacine B.', studentId: 'S001', time: '09:00 - 11:00', type: 'Ville & Autoroute', location: 'Gare St-Charles', status: 'completed', instructor: 'Marc L.', instructorId: 'M001', rating: 5, comment: "Bonne séance globalement." },
  { id: 2, student: 'Sophie L.', studentId: 'S002', time: '11:00 - 13:00', type: 'Manœuvres', location: 'Place Castellane', status: 'active', instructor: 'Marc L.', instructorId: 'M001' },
  { id: 3, student: 'Thomas M.', studentId: 'S003', time: '14:00 - 16:00', type: 'Évaluation', location: 'Vieux-Port', status: 'pending', instructor: 'Sarah M.', instructorId: 'M002' },
  { id: 4, student: 'Léa D.', studentId: 'S004', time: '16:00 - 18:00', type: 'Première Leçon', location: 'Agence', status: 'pending', instructor: 'Sarah M.', instructorId: 'M002' },
  { id: 5, student: 'Maxime P.', studentId: 'S005', time: '08:00 - 10:00', type: 'Code', location: 'Agence', status: 'completed', instructor: 'Sarah D.', instructorId: 'M003', rating: 4, comment: "Série presque sans fautes." },
  { id: 6, student: 'Julie V.', studentId: 'S006', time: '13:00 - 15:00', type: 'Autoroute', location: 'A7', status: 'pending', instructor: 'Marc L.', instructorId: 'M001' },
])

const filteredLessons = computed(() => {
  if (user.value?.rank === 2) return instructorLessons.value
  if (!searchQuery.value) return allLessons.value
  
  const query = searchQuery.value.toLowerCase()
  return allLessons.value.filter(l => 
    l.student.toLowerCase().includes(query) || 
    l.instructor?.toLowerCase().includes(query) ||
    l.type.toLowerCase().includes(query)
  )
})

const openEditModal = (lesson: any) => {
  editingLesson.value = { ...lesson }
  isEditModalOpen.value = true
}

const saveLessonChanges = () => {
  if (!editingLesson.value) return
  const index = allLessons.value.findIndex(l => l.id === editingLesson.value?.id)
  if (index !== -1) {
    allLessons.value[index] = { ...editingLesson.value } as any
  }
  isEditModalOpen.value = false
}

const addNewLesson = () => {
  allLessons.value.push({
    id: Date.now(),
    studentId: 'S' + Math.floor(Math.random() * 1000),
    instructorId: 'M001', // Default or from selection
    status: 'pending',
    ...newLesson.value
  } as any)
  isAddModalOpen.value = false
  newLesson.value = { student: '', instructor: '', time: '08:00 - 10:00', location: 'Agence', type: 'Ville' }
}

// --- LOGIQUE CRÉDITS (Nouveau) ---
const studentCredits = ref({
  used: 14,
  total: 20
})

const remainingHours = computed(() => studentCredits.value.total - studentCredits.value.used)

const canBook = computed(() => {
  const duration = parseInt(selectedDuration.value)
  return remainingHours.value >= duration
})

// --- LOGIQUE DISPONIBILITÉS ---
const instructorWorkingHours = ref([
  { day: 'Lun', start: '08:00', end: '18:00', active: true },
  { day: 'Mar', start: '08:00', end: '18:00', active: true },
  { day: 'Mer', start: '08:00', end: '18:00', active: true },
  { day: 'Jeu', start: '08:00', end: '18:00', active: true },
  { day: 'Ven', start: '08:00', end: '17:00', active: true },
  { day: 'Sam', start: '09:00', end: '12:00', active: false },
])

const isAvailabilityModalOpen = ref(false)

// Génération dynamique des créneaux pour les élèves
const generatedSlots = computed(() => {
  const currentDay = days.find(d => d.date === selectedDay.value)
  if (!currentDay) return []
  
  const currentDayName = currentDay.day
  const workDay = instructorWorkingHours.value.find(h => h.day === currentDayName)
  
  if (!workDay || !workDay.active) return []

  const startHour = parseInt(workDay.start.split(':')[0])
  const endHour = parseInt(workDay.end.split(':')[0])
  const step = selectedDuration.value === '1h' ? 1 : 2
  
  const availableSlots: any[] = []
  for (let h = startHour; h < endHour; h += step) {
    const timeStr = `${h.toString().padStart(2, '0')}:00`
    
    // Vérifier si une leçon existe déjà à cette heure (pour simuler la réservation)
    const isBooked = allLessons.value.some(l => 
      l.time.startsWith(timeStr) && (user.value?.rank === 1 ? true : l.instructor === 'Marc L.')
    )

    availableSlots.push({
      id: Math.random(),
      time: timeStr,
      instructor: 'Marc L.', 
      location: 'Gare St-Charles',
      status: isBooked ? 'booked' : 'available'
    })
  }
  return availableSlots
})

const confirmBooking = () => {
  if (!canBook.value) return
  
  // Simuler la mise à jour
  studentCredits.value.used += parseInt(selectedDuration.value)
  selectedSlot.value = null
  // En prod, ici on ferait un appel API
}

const pageTitle = computed(() => {
  if (user.value?.rank === 1) return 'Réserver une leçon'
  if (user.value?.rank === 2) return 'Mon Agenda'
  return 'Planning Global'
})

const pageSubtitle = computed(() => {
  if (user.value?.rank === 1) return 'Gère ton temps, valide ton permis.'
  if (user.value?.rank === 2) return 'Gérez votre emploi du temps et vos leçons.'
  return 'Visualisez et modifiez l\'activité de tous vos moniteurs.'
})
</script>

<template>
  <LayoutDashboardLayout
    :page-title="pageTitle"
    :page-subtitle="pageSubtitle"
    :user="user"
  >
    <!-- VUE ÉLÈVE : RÉSERVATION ELITE -->
    <div v-if="user?.rank === 1" class="animate-in fade-in duration-700 space-y-10 pt-4 pb-20">
      
      <!-- TOP STATUS BAR -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
        <!-- Decoration subtle -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

        <div class="flex flex-wrap items-center gap-6 sm:gap-10 relative z-10">
          <!-- Crédits -->
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-100 shrink-0">
              <Clock :size="20" class="sm:hidden" />
              <Clock :size="22" class="hidden sm:block" />
            </div>
            <div>
              <p class="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 sm:mb-1.5">Crédits</p>
              <p class="text-xl sm:text-2xl font-black text-slate-900 tabular-nums italic">
                <span :class="remainingHours < 2 ? 'text-rose-500' : 'text-indigo-600'">{{ remainingHours }}</span>
                <span class="text-slate-300 text-xs sm:text-sm not-italic ml-1">/ {{ studentCredits.total }}h</span>
              </p>
            </div>
          </div>

          <div class="hidden sm:block h-10 w-px bg-slate-100"></div>

          <!-- Prochain RDV Rapide -->
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="w-10 h-10 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
              <CalendarIcon :size="18" />
            </div>
            <div class="min-w-0">
              <p class="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 sm:mb-1.5">Prochain RDV</p>
              <p class="text-xs sm:text-sm font-black text-slate-900 uppercase truncate">09 Fév. • 09:00</p>
            </div>
          </div>
        </div>

        <!-- Duration Switcher -->
        <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 relative z-10 w-full lg:w-auto">
           <button @click="selectedDuration = '1h'" :class="selectedDuration === '1h' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'" class="flex-1 lg:flex-none px-4 sm:px-6 py-2 rounded-md text-[9px] sm:text-[10px] font-black transition-all uppercase">1H</button>
           <button @click="selectedDuration = '2h'" :class="selectedDuration === '2h' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'" class="flex-1 lg:flex-none px-4 sm:px-6 py-2 rounded-md text-[9px] sm:text-[10px] font-black transition-all uppercase">2H</button>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
        <!-- Sidebar Calendar -->
        <div class="xl:col-span-3">
          <div class="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div class="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
               <h3 class="text-[11px] font-black text-slate-900 uppercase tracking-widest italic">Calendrier</h3>
               <div class="flex gap-1">
                 <button class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all"><ChevronLeft :size="14" /></button>
                 <button class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all"><ChevronRight :size="14" /></button>
               </div>
            </div>
            
            <div class="p-6 grid grid-cols-1 gap-2">
               <button 
                 v-for="day in days" 
                 :key="day.date"
                 @click="selectedDay = day.date"
                 :disabled="!day.available"
                 class="group flex items-center justify-between p-4 rounded-xl border transition-all duration-300"
                 :class="[
                   selectedDay === day.date ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/30',
                   !day.available && 'opacity-20 cursor-not-allowed grayscale'
                 ]"
               >
                 <div class="flex flex-col items-start translate-x-0 group-hover:translate-x-1 transition-transform">
                   <span class="text-[9px] font-black uppercase tracking-widest mb-0.5" :class="selectedDay === day.date ? 'text-indigo-400' : 'text-slate-400'">{{ day.day }}</span>
                   <span class="text-lg font-black italic">{{ day.date }} Fév.</span>
                 </div>
                 <div v-if="selectedDay === day.date" class="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div>
                 <ChevronRight v-else :size="14" class="opacity-0 group-hover:opacity-100 transition-all text-indigo-400" />
               </button>
            </div>
          </div>
        </div>

        <!-- Main Slots List -->
        <div class="xl:col-span-9 space-y-4 pt-1">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Créneaux Disponibles</h2>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">Total : {{ generatedSlots.filter(s => s.status === 'available').length }} libres</p>
          </div>
          <div v-for="slot in generatedSlots" :key="slot.id" class="group">
            <div 
              @click="slot.status === 'available' && canBook && (selectedSlot = slot)"
              class="bg-white p-6 rounded-xl border transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
              :class="[
                slot.status === 'available' && canBook ? 'border-slate-100 hover:border-indigo-200 hover:shadow-xl cursor-pointer' : 'bg-slate-50 border-transparent opacity-60 grayscale cursor-not-allowed',
              ]"
            >
              <!-- Info Highlighting -->
              <div v-if="slot.status === 'available' && canBook" class="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-all"></div>

              <div class="flex items-center gap-10">
                <div class="w-24 text-center py-2 px-3 bg-slate-50 rounded-lg border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all">
                  <span class="block text-2xl font-black text-slate-900 tabular-nums italic">{{ slot.time }}</span>
                  <span class="text-[9px] font-black text-slate-400 mt-1 uppercase tracking-widest group-hover:text-indigo-600">{{ selectedDuration }}</span>
                </div>
                
                <div class="h-10 w-px bg-slate-100 hidden md:block"></div>

                <div class="flex flex-col gap-2">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-white">
                      <User :size="16" />
                    </div>
                    <div>
                      <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Moniteur</p>
                      <p class="text-xs font-black text-slate-900 uppercase italic">{{ slot.instructor }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-4">
                <div v-if="slot.status === 'available'">
                  <button 
                    v-if="canBook"
                    class="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-lg font-black text-[10px] uppercase tracking-widest group-hover:bg-indigo-600 transition-all shadow-lg flex items-center justify-center gap-3"
                  >
                    Réserver <iconify-icon icon="solar:round-alt-arrow-right-bold" width="16" />
                  </button>
                  <div v-else class="flex flex-col items-center gap-1 bg-rose-50 px-4 py-2 rounded-lg border border-rose-100">
                     <span class="text-[9px] font-black text-rose-500 uppercase tracking-widest">Heures insuffisantes</span>
                     <button class="text-[8px] font-black text-indigo-600 uppercase underline decoration-indigo-200 hover:text-slate-900">Recharger Crédit</button>
                  </div>
                </div>
                <div v-else class="px-6 py-3 rounded-lg bg-slate-200/50 text-slate-400 text-[9px] font-black uppercase tracking-widest border border-slate-200">
                  Déjà réservé
                </div>
              </div>
            </div>
          </div>

          <div v-if="generatedSlots.length === 0" class="py-20 text-center bg-white rounded-xl border border-dashed border-slate-200">
             <iconify-icon icon="solar:calendar-slash-linear" width="48" class="text-slate-200 mb-4" />
             <p class="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Aucun créneau disponible ce jour</p>
          </div>
        </div>
      </div>
    </div>

    <!-- VUE STAFF / ADMIN : AGENDA ELITE -->
    <div v-else class="animate-in fade-in duration-700 space-y-10 pt-4 pb-20">
      
      <!-- TOP STATUS BAR (Agenda Control) -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 relative z-10">
          <!-- Date Navigator -->
          <div class="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-100 justify-between sm:justify-start">
            <button class="w-10 h-10 rounded-lg hover:bg-white hover:text-indigo-600 transition-all flex items-center justify-center text-slate-400">
              <ChevronLeft :size="20" />
            </button>
            <div class="px-4 sm:px-6 flex flex-col items-center">
              <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Planning</span>
              <span class="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-900 whitespace-nowrap">Lundi 09 Fév.</span>
            </div>
            <button class="w-10 h-10 rounded-lg hover:bg-white hover:text-indigo-600 transition-all flex items-center justify-center text-slate-400">
              <ChevronRight :size="20" />
            </button>
          </div>

          <!-- Search -->
          <div class="relative group w-full sm:min-w-[240px]">
            <Search :size="14" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="RECHERCHE..." 
              class="w-full bg-slate-50 border border-slate-100 py-3 pl-10 pr-4 rounded-lg text-[10px] font-black uppercase tracking-widest outline-none focus:border-indigo-400 transition-all" 
            />
          </div>
        </div>
        
        <div class="flex flex-row items-center gap-2 sm:gap-3 relative z-10 w-full lg:w-auto">
           <button v-if="user?.rank === 2" @click="isAvailabilityModalOpen = true" class="flex-1 lg:flex-none px-4 py-3 bg-white border border-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 shadow-sm">
              <iconify-icon icon="solar:settings-bold" width="14" /> <span class="hidden sm:inline">Mes Horaires</span><span class="sm:hidden">Horaires</span>
           </button>
           
           <button v-if="user?.rank === 2 || user?.rank === 3" @click="isAddModalOpen = true" class="flex-1 lg:flex-none bg-indigo-600 text-white px-4 sm:px-6 py-3 rounded-lg font-black text-[9px] uppercase tracking-widest shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 hover:bg-slate-900 transition-all">
             <Plus :size="14" /> <span class="hidden sm:inline">Nouveau Créneau</span><span class="sm:hidden">Ajouter</span>
           </button>
        </div>
      </div>

      <!-- QUICK STATS (Admin Only) -->
      <div v-if="user?.rank === 3" class="grid grid-cols-2 lg:grid-cols-4 gap-6">
         <div v-for="(val, label) in { 'Séances' : '24', 'Moniteurs' : '8', 'Occupation' : '92%', 'Annulations' : '2' }" :key="label" class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm group hover:border-indigo-200 transition-all">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-indigo-600 transition-colors">{{ label }}</p>
            <div class="flex items-end justify-between">
               <span class="text-3xl font-black text-slate-900 italic tracking-tighter leading-none">{{ val }}</span>
               <div v-if="label === 'Occupation'" class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
               <span v-else-if="label === 'Séances'" class="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">+12%</span>
            </div>
         </div>
      </div>

      <!-- Agenda List -->
      <div class="grid grid-cols-1 gap-6">
        <div v-for="lesson in filteredLessons" :key="lesson.id" class="group">
           <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-xl transition-all duration-500 flex flex-col xl:flex-row xl:items-center justify-between gap-8 relative overflow-hidden">
             <!-- Status bar vertical refined -->
             <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-100 group-hover:w-2 transition-all" :class="{ 'bg-emerald-500': lesson.status === 'completed', 'bg-indigo-600': lesson.status === 'active', 'bg-amber-400': lesson.status === 'pending' }"></div>

             <div class="flex flex-col sm:flex-row items-center gap-10 flex-1">
                <!-- Time Box -->
                <div class="w-24 text-center py-2 px-3 bg-slate-50 rounded-lg border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all shrink-0">
                   <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-500">Début</p>
                   <p class="text-2xl font-black text-slate-900 italic tabular-nums leading-none">{{ lesson.time.split(' ')[0] }}</p>
                   <p class="text-[9px] font-black text-slate-400 mt-1 uppercase tracking-tighter">{{ lesson.time.split(' ')[2] }}</p>
                </div>
                
                <div class="h-12 w-px bg-slate-100 hidden sm:block"></div>

                <div class="flex flex-col lg:flex-row lg:items-center gap-10 flex-1">
                   <!-- Élève Info -->
                   <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-900 font-black text-sm italic group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
                         {{ lesson.student.split(' ')[0][0] }}{{ (lesson.student.split(' ')[1] || ' ')[0] }}
                      </div>
                      <div>
                         <div class="flex items-center gap-3">
                            <h3 class="text-lg font-black text-slate-900 uppercase tracking-tighter">{{ lesson.student }}</h3>
                            <span v-if="lesson.status === 'active'" class="flex items-center gap-1.5 px-2 py-0.5 bg-slate-900 text-white rounded text-[7px] font-black uppercase tracking-widest animate-pulse">
                              <span class="w-1 h-1 rounded-full bg-emerald-400"></span> Live
                            </span>
                         </div>
                         <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">ID #{{ lesson.studentId || '...' }} | {{ lesson.type }}</p>
                      </div>
                   </div>

                   <!-- Moniteur / Location (Always visible) -->
                   <div class="flex flex-wrap items-center gap-8">
                      <div v-if="user?.rank === 3" class="flex items-center gap-2">
                        <div class="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                          <User :size="14" />
                        </div>
                        <p class="text-[10px] font-black text-slate-900 uppercase italic">{{ lesson.instructor }}</p>
                      </div>
                      
                      <div class="flex items-center gap-2">
                        <div class="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                          <MapPin :size="14" />
                        </div>
                        <p class="text-[10px] font-black text-slate-500 uppercase tracking-tight">{{ lesson.location }}</p>
                      </div>
                   </div>
                </div>
             </div>

             <!-- CTA Group -->
             <div class="flex items-center gap-3">
                <button v-if="user?.rank === 3" @click="openEditModal(lesson)" class="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 hover:text-indigo-600 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all flex items-center justify-center">
                   <iconify-icon icon="solar:pen-bold" width="18" />
                </button>
                <button class="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 hover:text-indigo-600 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all flex items-center justify-center">
                   <iconify-icon icon="solar:chat-round-line-linear" width="18" />
                </button>
                <button class="h-12 px-6 rounded-lg bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg flex items-center gap-3 group/cta">
                   Détails <iconify-icon icon="solar:round-alt-arrow-right-bold" width="16" class="group-hover/cta:translate-x-1 transition-transform" />
                </button>
             </div>
           </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredLessons.length === 0" class="py-20 text-center space-y-4">
           <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
              <iconify-icon icon="solar:magnifer-linear" width="32" />
           </div>
           <div>
              <p class="text-lg font-black text-slate-900 uppercase tracking-tight">Aucun résultat</p>
              <p class="text-xs text-slate-400">Essayez une autre recherche pour trouver un élève ou un moniteur.</p>
           </div>
           <button @click="searchQuery = ''" class="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline">Réinitialiser</button>
        </div>
      </div>
    </div>


    <!-- MODAL EDITION (Admin) -->
    <UiModal 
      v-model="isEditModalOpen" 
      title="Modifier la Leçon" 
      subtitle="Ajustez les détails de la séance de conduite."
      maxWidth="max-w-xl"
    >
      <div v-if="editingLesson" class="space-y-6 pt-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Élève</label>
            <input v-model="editingLesson.student" class="w-full bg-slate-50 border border-slate-100 rounded-lg py-4 px-5 text-sm font-bold outline-none focus:border-indigo-400 transition-all" />
            
            <!-- Alert Admin Crédit -->
            <div v-if="editingLesson.studentId === 'S001' && remainingHours <= 0" class="mt-2 p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-2">
               <iconify-icon icon="solar:danger-bold" class="text-rose-500" width="14" />
               <p class="text-[9px] font-black text-rose-600 uppercase">Alerte : Cet élève n'a plus de crédits d'heures</p>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Moniteur</label>
            <input v-model="editingLesson.instructor" class="w-full bg-slate-50 border border-slate-100 rounded-lg py-4 px-5 text-sm font-bold outline-none focus:border-indigo-400 transition-all" />
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Horaire</label>
          <input v-model="editingLesson.time" placeholder="ex: 09:00 - 11:00" class="w-full bg-slate-50 border border-slate-100 rounded-lg py-4 px-5 text-sm font-bold outline-none focus:border-indigo-400 transition-all" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Type</label>
            <input v-model="editingLesson.type" class="w-full bg-slate-50 border border-slate-100 rounded-lg py-4 px-5 text-sm font-bold outline-none focus:border-indigo-400 transition-all" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Lieu</label>
            <input v-model="editingLesson.location" class="w-full bg-slate-50 border border-slate-100 rounded-lg py-4 px-5 text-sm font-bold outline-none focus:border-indigo-400 transition-all" />
          </div>
        </div>

        <!-- RAPPORT PÉDAGOGIQUE (Si terminé) -->
        <div v-if="editingLesson.status === 'completed'" class="space-y-6 pt-6 border-t border-slate-100">
           <div class="flex items-center gap-2">
              <Star :size="16" class="text-indigo-600" />
              <h4 class="text-[10px] font-black text-slate-900 uppercase tracking-widest">Rapport de séance</h4>
           </div>
           
           <div class="space-y-2">
              <label class="text-[8px] font-black text-slate-400 uppercase tracking-widest px-1">Note de la séance</label>
              <div class="flex gap-2">
                 <button 
                   v-for="i in 5" :key="i"
                   @click="editingLesson.rating = i"
                   :class="i <= (editingLesson.rating || 0) ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-300 border-slate-100'"
                   class="w-10 h-10 rounded-lg border flex items-center justify-center transition-all"
                 >
                    <Star :size="16" :fill="i <= (editingLesson.rating || 0) ? 'currentColor' : 'none'" />
                 </button>
              </div>
           </div>

           <div class="space-y-2">
             <label class="text-[8px] font-black text-slate-400 uppercase tracking-widest px-1">Commentaire moniteur</label>
             <textarea 
               v-model="editingLesson.comment" 
               placeholder="Observations sur la conduite de l'élève..."
               rows="3"
               class="w-full bg-slate-50 border border-slate-100 rounded-lg py-4 px-5 text-sm font-bold outline-none focus:border-indigo-400 transition-all resize-none"
             ></textarea>
           </div>
        </div>

        <div class="flex gap-3 pt-6">
          <button @click="isEditModalOpen = false" class="flex-1 py-4 rounded-lg border border-slate-100 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Annuler</button>
          <button @click="saveLessonChanges" class="flex-1 py-4 rounded-lg bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100">Enregistrer</button>
        </div>
      </div>
    </UiModal>

    <!-- MODAL AJOUT (Admin) -->
    <UiModal 
      v-model="isAddModalOpen" 
      title="Nouveau Créneau" 
      subtitle="Planifiez une nouvelle séance de conduite."
      maxWidth="max-w-xl"
    >
      <div class="space-y-6 pt-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nom de l'élève</label>
            <input v-model="newLesson.student" placeholder="ex: Yacine B." class="w-full bg-slate-50 border border-slate-100 rounded-lg py-4 px-5 text-sm font-bold outline-none focus:border-indigo-400 transition-all" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Moniteur</label>
            <input v-model="newLesson.instructor" placeholder="ex: Marc L." class="w-full bg-slate-50 border border-slate-100 rounded-lg py-4 px-5 text-sm font-bold outline-none focus:border-indigo-400 transition-all" />
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Horaire</label>
          <input v-model="newLesson.time" placeholder="ex: 10:00 - 12:00" class="w-full bg-slate-50 border border-slate-100 rounded-lg py-4 px-5 text-sm font-bold outline-none focus:border-indigo-400 transition-all" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Type de leçon</label>
            <input v-model="newLesson.type" placeholder="ex: Autoroute" class="w-full bg-slate-50 border border-slate-100 rounded-lg py-4 px-5 text-sm font-bold outline-none focus:border-indigo-400 transition-all" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Point de RDV</label>
            <input v-model="newLesson.location" placeholder="ex: Gare St-Charles" class="w-full bg-slate-50 border border-slate-100 rounded-lg py-4 px-5 text-sm font-bold outline-none focus:border-indigo-400 transition-all" />
          </div>
        </div>
        <div class="flex gap-3 pt-6">
          <button @click="isAddModalOpen = false" class="flex-1 py-4 rounded-lg border border-slate-100 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Annuler</button>
          <button @click="addNewLesson" class="flex-1 py-4 rounded-lg bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100">Planifier</button>
        </div>
      </div>
    </UiModal>

    <!-- MODAL DISPONIBILITÉS (Moniteur) -->
    <UiModal 
      v-model="isAvailabilityModalOpen" 
      title="Mes Horaires de Travail" 
      subtitle="Définissez vos plages horaires pour générer vos créneaux."
      maxWidth="max-w-2xl"
    >
      <div class="space-y-6 pt-6">
        <div v-for="day in instructorWorkingHours" :key="day.day" class="flex items-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
           <div class="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-black text-slate-900 text-xs">
              {{ day.day }}
           </div>
           
           <div class="flex-1 flex items-center gap-4">
              <div class="flex-1 space-y-1">
                 <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Début</p>
                 <input v-model="day.start" :disabled="!day.active" type="time" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-bold outline-none focus:border-indigo-400 disabled:opacity-30" />
              </div>
              <div class="flex-1 space-y-1">
                 <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Fin</p>
                 <input v-model="day.end" :disabled="!day.active" type="time" class="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-bold outline-none focus:border-indigo-400 disabled:opacity-30" />
              </div>
           </div>

           <button 
             @click="day.active = !day.active"
             :class="day.active ? 'bg-indigo-600 text-white shadow-indigo-100 shadow-lg' : 'bg-slate-200 text-slate-400'"
             class="w-12 h-12 rounded-lg flex items-center justify-center transition-all"
           >
              <iconify-icon :icon="day.active ? 'solar:check-read-bold' : 'solar:forbidden-bold'" width="20" />
           </button>
        </div>

        <div class="pt-4">
           <button @click="isAvailabilityModalOpen = false" class="w-full py-4 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 shadow-xl transition-all">
              Valider mes horaires
           </button>
        </div>
      </div>
    </UiModal>

    <!-- Confirmation Modal (Élève) -->
    <div v-if="selectedSlot" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
       <div @click="selectedSlot = null" class="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
       <div class="relative bg-white w-full max-w-sm rounded-[1rem] p-10 shadow-2xl animate-in zoom-in duration-300">
          <div class="text-center space-y-6">
            <div class="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 :size="32" />
            </div>
            <div>
              <h2 class="text-2xl font-black text-slate-900 tracking-tight">Confirmer ?</h2>
              <p class="text-xs text-slate-400 font-medium mt-2">Leçon à {{ (selectedSlot as any).time }} avec {{ (selectedSlot as any).instructor }}</p>
            </div>
            <div class="flex gap-3 pt-4">
              <button @click="selectedSlot = null" class="flex-1 py-4 rounded-xl border border-slate-100 text-slate-900 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all">Non</button>
              <button @click="selectedSlot = null" class="flex-1 py-4 rounded-xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[10px] hover:bg-slate-950 transition-all shadow-lg shadow-indigo-100">Oui</button>
            </div>
          </div>
       </div>
    </div>
  </LayoutDashboardLayout>
</template>

