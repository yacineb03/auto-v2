<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Car, Gauge, Calendar, AlertTriangle, 
  Plus, Search, Filter, Fuel, Wrench, 
  ShieldCheck, MoreHorizontal, ChevronRight,
  TrendingUp, MapPin, Settings
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
const { success } = useToast()

const searchQuery = ref('')
const isModalOpen = ref(false)

const vehicles = ref([
  { 
    id: 1, 
    model: 'Peugeot 208', 
    plate: 'AA-123-BB', 
    year: '2023', 
    type: 'Manuelle', 
    mileage: '12 500', 
    status: 'available', 
    nextService: '8 500 km',
    lastFueling: 'Hier',
    assignedTo: 'Marc L.',
    image: '🚗'
  },
  { 
    id: 2, 
    model: 'Renault Clio 5', 
    plate: 'CC-456-DD', 
    year: '2022', 
    type: 'Automatique', 
    mileage: '45 200', 
    status: 'maintenance', 
    nextService: 'À faire',
    lastFueling: '3j',
    assignedTo: 'Sarah D.',
    image: '🚙'
  },
  { 
    id: 3, 
    model: 'Peugeot 208', 
    plate: 'EE-789-FF', 
    year: '2024', 
    type: 'Électrique', 
    mileage: '2 100', 
    status: 'available', 
    nextService: '15 000 km',
    lastFueling: 'Ce matin',
    assignedTo: 'Julie M.',
    image: '⚡'
  },
])

const filteredVehicles = computed(() => {
  return vehicles.value.filter(v => 
    v.model.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    v.plate.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'available': return 'bg-emerald-50 text-emerald-600 border-emerald-100'
    case 'maintenance': return 'bg-rose-50 text-rose-600 border-rose-100'
    case 'booked': return 'bg-indigo-50 text-indigo-600 border-indigo-100'
    default: return 'bg-slate-50 text-slate-500'
  }
}

const handleSuccess = () => {
  isModalOpen.value = false
  success('Véhicule ajouté à la flotte ! 🚗')
}
</script>

<template>
  <LayoutDashboardLayout
    page-title="Gestion de la Flotte"
    page-subtitle="Suivez l'état, l'entretien et l'utilisation de vos véhicules."
    :user="user"
  >
    <div class="animate-in fade-in duration-700 space-y-12 pt-4 pb-24 max-w-6xl mx-auto">
      
      <!-- TOP STATS -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
           <div class="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Car :size="20" />
           </div>
           <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Total Véhicules</p>
           <h4 class="text-3xl font-black text-slate-900 tabular-nums italic">08</h4>
        </div>
        <div class="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
           <div class="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck :size="20" />
           </div>
           <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">En service</p>
           <h4 class="text-3xl font-black text-slate-900 tabular-nums italic">07</h4>
        </div>
        <div class="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
           <div class="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <Wrench :size="20" />
           </div>
           <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">À l'atelier</p>
           <h4 class="text-3xl font-black text-slate-900 tabular-nums italic">01</h4>
        </div>
        <div class="bg-slate-900 p-8 rounded-xl shadow-2xl text-white relative overflow-hidden">
           <div class="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
           <div class="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center mb-4 relative z-10">
              <Fuel :size="20" />
           </div>
           <p class="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1 relative z-10">Conso. Moyenne</p>
           <h4 class="text-3xl font-black tabular-nums italic relative z-10">5.4<span class="text-xs ml-1 opacity-40">L/100</span></h4>
        </div>
      </div>

      <!-- TOOLBAR -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="relative flex-1 max-w-md">
          <Search :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="RECHERCHER UN VÉHICULE..." 
            class="w-full bg-white border border-slate-100 rounded-xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-indigo-400 transition-all shadow-sm"
          />
        </div>
        <button 
          @click="isModalOpen = true"
          class="bg-slate-900 text-white px-8 py-4 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-600 transition-all flex items-center gap-3"
        >
          <Plus :size="16" /> Nouveau véhicule
        </button>
      </div>

      <!-- VEHICLE CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="vehicle in filteredVehicles" :key="vehicle.id" class="group">
           <div class="bg-white p-8 rounded-xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:border-indigo-200 transition-all duration-500 relative">
              
              <!-- Status Badge -->
              <div class="absolute top-8 right-8">
                 <span :class="['px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border', getStatusStyle(vehicle.status)]">
                   {{ vehicle.status === 'available' ? 'Disponible' : 'En révision' }}
                 </span>
              </div>

              <!-- Vehicle Icon/Image -->
              <div class="w-24 h-24 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-4xl mb-8 shadow-inner group-hover:scale-110 transition-transform duration-700">
                {{ vehicle.image }}
              </div>

              <div class="space-y-1 mb-8">
                 <h3 class="text-2xl font-black text-slate-900 uppercase tracking-tighter">{{ vehicle.model }}</h3>
                 <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-black text-slate-500 tracking-widest">{{ vehicle.plate }}</span>
                    <span class="w-1 h-1 rounded-full bg-slate-200"></span>
                    <span class="text-[10px] font-bold text-slate-400 italic">{{ vehicle.year }}</span>
                 </div>
              </div>

              <!-- Stats Grid -->
              <div class="grid grid-cols-2 gap-4 py-6 border-y border-slate-50 mb-8">
                 <div class="space-y-1">
                    <p class="text-[8px] font-black text-slate-300 uppercase leading-none">Kilométrage</p>
                    <div class="flex items-center gap-1.5">
                       <Gauge :size="12" class="text-indigo-600" />
                       <span class="text-xs font-black text-slate-900 tabular-nums">{{ vehicle.mileage }} km</span>
                    </div>
                 </div>
                 <div class="space-y-1">
                    <p class="text-[8px] font-black text-slate-300 uppercase leading-none">Entretien</p>
                    <div class="flex items-center gap-1.5">
                       <AlertTriangle v-if="vehicle.nextService === 'À faire'" :size="12" class="text-rose-500" />
                       <Calendar v-else :size="12" class="text-slate-400" />
                       <span :class="['text-xs font-black tabular-nums', vehicle.nextService === 'À faire' ? 'text-rose-500' : 'text-slate-900']">{{ vehicle.nextService }}</span>
                    </div>
                 </div>
              </div>

              <!-- Action Footer -->
              <div class="flex items-center justify-between">
                 <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-indigo-50 border border-white flex items-center justify-center text-[8px] font-black text-indigo-600">
                       {{ vehicle.assignedTo.split(' ')[0][0] }}{{ vehicle.assignedTo.split(' ')[1][0] }}
                    </div>
                    <div>
                       <p class="text-[7px] font-black text-slate-300 uppercase leading-none">Assigné à</p>
                       <p class="text-[9px] font-black text-slate-800 uppercase tracking-tighter">{{ vehicle.assignedTo }}</p>
                    </div>
                 </div>
                 <NuxtLink :to="`/flotte/${vehicle.id}`" class="w-11 h-11 rounded-lg bg-slate-900 text-white hover:bg-indigo-600 transition-all flex items-center justify-center shadow-lg active:scale-95">
                    <ChevronRight :size="18" />
                 </NuxtLink>
              </div>

           </div>
        </div>
      </div>

    </div>

    <!-- MODAL AJOUT VÉHICULE -->
    <UiModal 
      v-model="isModalOpen" 
      title="Nouveau Véhicule" 
      subtitle="Enregistrez une nouvelle voiture ou moto dans votre parc."
      maxWidth="max-w-xl"
    >
      <ModalsVehicleAdd @success="handleSuccess" />
    </UiModal>
  </LayoutDashboardLayout>
</template>

<style scoped>
.animate-in { animation-duration: 0.8s; }
</style>
