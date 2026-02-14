<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Car, Gauge, Calendar, AlertTriangle, 
  MapPin, Fuel, Wrench, ShieldCheck, 
  ChevronLeft, MoreHorizontal, Settings,
  History, Droplets, Zap, Info, Clock,
  ArrowUpRight, BarChart3
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
const route = useRoute()
const router = useRouter()

const vehicleId = route.params.id

// Mock data pour le véhicule
const vehicle = ref({
  id: vehicleId,
  model: 'Peugeot 208',
  plate: 'AA-123-BB',
  year: '2023',
  type: 'Manuelle',
  fuel: 'Diesel',
  mileage: '12 500',
  status: 'available',
  nextService: '8 500 km',
  assignedTo: 'Marc Leblanc',
  image: '🚗',
  insuranceExpiry: '15 Sep 2026',
  lastControl: '10 Jan 2026'
})

const items = [
  { label: 'Révision', date: '10 Oct 2025', cost: '150€', km: '10 200 km' },
  { label: 'Pneumatiques', date: '05 Juil 2025', cost: '210€', km: '8 400 km' },
  { label: 'Vidange', date: '12 Fév 2025', cost: '85€', km: '5 100 km' }
]

const recentTrips = [
  { id: 1, driver: 'Marc L.', date: 'Aujourd\'hui', duration: '4h 30m', km: '45 km' },
  { id: 2, driver: 'Marc L.', date: 'Hier', duration: '6h 15m', km: '82 km' },
]
</script>

<template>
  <LayoutDashboardLayout
    :page-title="`Détails Véhicule : ${vehicle.model}`"
    page-subtitle="Suivez l'état mécanique et l'utilisation de ce véhicule."
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
        <span class="text-[10px] font-black uppercase tracking-widest">Retour au parc</span>
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <!-- SIDEBAR INFO (4 COLS) -->
        <div class="lg:col-span-4 space-y-8">
          <div class="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden">
             <!-- Status Badge -->
             <div class="absolute top-10 right-10">
                <span class="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[9px] font-black uppercase tracking-widest">Opérationnel</span>
             </div>

             <div class="flex flex-col items-center text-center">
                <div class="w-32 h-32 rounded-[3.5rem] bg-slate-50 border border-slate-100 shadow-inner flex items-center justify-center text-6xl mb-8">
                  {{ vehicle.image }}
                </div>
                <h2 class="text-3xl font-black text-slate-900 uppercase tracking-tighter">{{ vehicle.model }}</h2>
                <div class="flex items-center gap-2 mt-2">
                   <p class="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 tracking-widest">{{ vehicle.plate }}</p>
                   <span class="text-slate-200">|</span>
                   <p class="text-[10px] font-bold text-slate-400 uppercase italic">{{ vehicle.year }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-2 mt-10 w-full">
                   <button class="py-4 bg-slate-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                     <Wrench :size="14" /> Entretien
                   </button>
                   <button class="py-4 bg-slate-50 text-slate-400 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                     <Settings :size="14" /> Gérer
                   </button>
                </div>
             </div>

             <div class="mt-12 space-y-6 pt-10 border-t border-slate-50 text-left">
                <div class="flex justify-between items-center px-2">
                   <p class="text-[8px] font-black text-slate-300 uppercase tracking-widest">Type Boîte</p>
                   <p class="text-[10px] font-black text-slate-900 uppercase italic">{{ vehicle.type }}</p>
                </div>
                <div class="flex justify-between items-center px-2">
                   <p class="text-[8px] font-black text-slate-300 uppercase tracking-widest">Carburant</p>
                   <p class="text-[10px] font-black text-slate-900 uppercase italic">{{ vehicle.fuel }}</p>
                </div>
                <div class="flex justify-between items-center px-2">
                   <p class="text-[8px] font-black text-slate-300 uppercase tracking-widest">Assigné à</p>
                   <p class="text-[10px] font-black text-indigo-600 uppercase italic underline decoration-indigo-200 underline-offset-4">{{ vehicle.assignedTo }}</p>
                </div>
             </div>
          </div>

          <!-- Alert Contextual Box -->
          <div class="bg-rose-50 border border-rose-100 rounded-[3rem] p-8 space-y-6">
             <div class="flex items-center gap-4 text-rose-600">
                <AlertTriangle :size="20" />
                <h4 class="font-black text-[10px] uppercase tracking-widest">Alerte Entretien</h4>
             </div>
             <p class="text-xs font-bold text-rose-900/70 leading-relaxed italic">
                La prochaine révision est programmée dans <span class="text-rose-600 font-black">2 400 km</span>. Pensez à bloquer le véhicule sur le planning.
             </p>
             <button class="w-full bg-rose-600 text-white py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-200/50">
                Réserver à l'atelier
             </button>
          </div>
        </div>

        <!-- MAIN CONTENT (8 COLS) -->
        <div class="lg:col-span-8 space-y-10">
          
          <!-- Metrics Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:border-indigo-200">
                <div class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center mb-6">
                   <Gauge :size="20" />
                </div>
                <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Kilométrage Actuel</p>
                <h4 class="text-4xl font-black text-slate-900 italic tracking-tighter tabular-nums">{{ vehicle.mileage }} <span class="text-sm not-italic text-slate-300 ml-1">km</span></h4>
             </div>

             <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:border-indigo-200">
                <div class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center mb-6">
                   <ShieldCheck :size="20" />
                </div>
                <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Assurance expire le</p>
                <h4 class="text-xl font-black text-slate-900 italic tracking-tighter uppercase">{{ vehicle.insuranceExpiry }}</h4>
             </div>

             <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:border-indigo-200">
                <div class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center mb-6">
                   <History :size="20" />
                </div>
                <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Contrôle Technique</p>
                <h4 class="text-xl font-black text-slate-900 italic tracking-tighter uppercase">{{ vehicle.lastControl }}</h4>
             </div>
          </div>

          <!-- Usage History -->
          <div class="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
             <div class="p-10 border-b border-slate-50 flex justify-between items-center">
                <h3 class="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Journal de Maintenance</h3>
                <button class="px-6 py-3 bg-slate-50 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Télécharger Factures</button>
             </div>
             <div class="divide-y divide-slate-50">
                <div v-for="item in items" :key="item.date" class="p-8 hover:bg-slate-50/50 transition-all flex items-center justify-between gap-8 group">
                   <div class="flex items-center gap-6">
                      <div class="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-600 transition-all">
                         <Wrench :size="18" />
                      </div>
                      <div>
                         <p class="text-sm font-black text-slate-900 uppercase tracking-tight">{{ item.label }}</p>
                         <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{{ item.date }} • {{ item.km }}</p>
                      </div>
                   </div>
                   <div class="text-right">
                      <p class="text-lg font-black text-slate-900 tabular-nums italic">{{ item.cost }}</p>
                      <p class="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Payé</p>
                   </div>
                </div>
             </div>
          </div>

          <!-- Usage Graph Mockup -->
          <div class="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
             <div class="absolute right-0 top-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] -translate-y-10 translate-x-10"></div>
             
             <div class="flex justify-between items-center mb-10 relative z-10">
                <div>
                   <h3 class="text-2xl font-black italic uppercase tracking-tighter">Utilisation Flotte</h3>
                   <p class="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Évolution du kilométrage mensuel</p>
                </div>
                <div class="flex gap-2">
                   <div v-for="i in 3" :key="i" class="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                </div>
             </div>

             <div class="h-48 flex items-end gap-6 relative z-10 px-4">
                <div v-for="h in [30, 45, 35, 60, 55, 80, 75, 90, 85, 95]" :key="h" class="flex-1 bg-white/5 hover:bg-indigo-500/50 transition-all cursor-pointer rounded-t-lg" :style="{ height: h + '%' }"></div>
             </div>
             
             <div class="flex justify-between mt-8 px-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 relative z-10">
                <span>Janvier</span>
                <span>Juin</span>
                <span>Décembre</span>
             </div>
          </div>

        </div>
      </div>

    </div>
  </LayoutDashboardLayout>
</template>

<style scoped>
.animate-in { animation-duration: 0.8s; }
</style>
