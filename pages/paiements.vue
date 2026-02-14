<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Search, Filter, Plus, Wallet, 
  ChevronRight, ArrowUpRight, ArrowDownRight,
  MoreHorizontal, Calendar, Download, CheckCircle2,
  Clock, AlertCircle
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

const searchQuery = ref('')

const transactions = ref([
  { id: 1, student: 'Yacine B.', amount: 1200, type: 'Forfait 20h', method: 'CB', status: 'completed', date: 'Aujourd\'hui 14:30', avatar: 'YB' },
  { id: 2, student: 'Sophie L.', amount: 45, type: 'Heure sup', method: 'Virement', status: 'pending', date: 'Hier 09:15', avatar: 'SL' },
  { id: 3, student: 'Thomas M.', amount: 800, type: 'Forfait Code + 10h', method: 'CB', status: 'completed', date: '02 Fév 2026', avatar: 'TM' },
  { id: 4, student: 'Léa D.', amount: 30, type: 'Examen Code', method: 'Espèces', status: 'refunded', date: '01 Fév 2026', avatar: 'LD' },
])

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-emerald-50 text-emerald-600'
    case 'pending': return 'bg-amber-50 text-amber-600'
    case 'refunded': return 'bg-rose-50 text-rose-600'
    default: return 'bg-slate-50 text-slate-600'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed': return 'Validé'
    case 'pending': return 'En attente'
    case 'refunded': return 'Remboursé'
    default: return status
  }
}
</script>

<template>
  <LayoutDashboardLayout
    page-title="Finances & Paiements"
    page-subtitle="Suivez les transactions et le chiffre d'affaires de l'agence."
    :user="user"
  >
    <div class="animate-in fade-in duration-700 space-y-12 pt-4 pb-24 max-w-6xl mx-auto">
      
      <!-- ELITE STATS OVERVIEW -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-all">
          <!-- Decoration subtle -->
          <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
          
          <div class="relative z-10">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Chiffre d'Affaires</p>
            <h3 class="text-4xl font-black text-slate-900 italic tracking-tighter tabular-nums mb-4 leading-none">12.450 <span class="text-indigo-600 text-2xl">€</span></h3>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black italic border border-emerald-100 shadow-sm shadow-emerald-100/50">
              <TrendingUp :size="12" class="mb-0.5" /> +18.4% ce mois
            </div>
          </div>
        </div>

        <div class="bg-white p-8 rounded-xl border border-slate-100 shadow-sm group hover:border-amber-200 transition-all">
          <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Paiements en attente</p>
          <h3 class="text-4xl font-black text-slate-900 italic tracking-tighter tabular-nums mb-4 leading-none">1.280 <span class="text-amber-500 text-2xl">€</span></h3>
          <div class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <iconify-icon icon="solar:history-bold" width="14" class="text-amber-500" /> 8 dossiers à valider
          </div>
        </div>

        <div class="bg-white p-8 rounded-xl border border-slate-100 shadow-sm group hover:border-indigo-200 transition-all">
          <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Panier Moyen</p>
          <h3 class="text-4xl font-black text-slate-900 italic tracking-tighter tabular-nums mb-4 leading-none">645 <span class="text-slate-300 text-2xl">€</span></h3>
          <div class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <iconify-icon icon="solar:cart-large-bold" width="14" class="text-indigo-400" /> Stable vs Janvier
          </div>
        </div>
      </div>

      <!-- ELITE TRANSACTIONS LIST -->
      <div class="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 class="text-2xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Historique</h3>
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Dernières transactions validées</p>
          </div>
          <div class="flex items-center gap-3">
             <div class="relative group">
                <Search :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                <input type="text" placeholder="RECHERCHER..." class="bg-slate-50 border border-slate-100 py-3 pl-11 pr-4 rounded-lg text-[10px] font-black uppercase tracking-widest outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-sm" />
             </div>
             <button class="px-6 py-3 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 flex items-center gap-3">
               <Plus :size="16" /> Nouveau Paiement
             </button>
          </div>
        </div>
 
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30">
                <th class="px-8 py-5">Identité Élève</th>
                <th class="px-8 py-5 text-center">Formule</th>
                <th class="px-8 py-5 text-center">Date & Heure</th>
                <th class="px-8 py-5 text-right">Montant</th>
                <th class="px-8 py-5 text-center">Status</th>
                <th class="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="tx in transactions" :key="tx.id" class="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                <td class="px-8 py-6">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-lg bg-white border border-slate-100 shadow-sm shadow-slate-200/50 flex items-center justify-center font-black text-[10px] text-slate-900 italic transform transition-transform group-hover:scale-110">
                      {{ tx.avatar }}
                    </div>
                    <span class="text-[11px] font-black text-slate-900 uppercase tracking-tighter">{{ tx.student }}</span>
                  </div>
                </td>
                <td class="px-8 py-6 text-center">
                  <span class="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 uppercase tracking-widest italic">{{ tx.type }}</span>
                </td>
                <td class="px-8 py-6 text-center">
                  <span class="text-[10px] font-black text-slate-400 tabular-nums italic uppercase">{{ tx.date }}</span>
                </td>
                <td class="px-8 py-6 text-right">
                  <span class="text-sm font-black text-slate-900 tabular-nums">{{ tx.amount }} <span class="text-[10px] text-slate-300">€</span></span>
                </td>
                <td class="px-8 py-6 text-center">
                  <span :class="['px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 border', 
                    tx.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                    tx.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                    'bg-rose-50 text-rose-600 border-rose-100']">
                    <div class="w-1 h-1 rounded-full" :class="tx.status === 'completed' ? 'bg-emerald-500' : tx.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'"></div>
                    {{ getStatusLabel(tx.status) }}
                  </span>
                </td>
                <td class="px-8 py-6 text-right">
                  <div class="flex items-center justify-end gap-2 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    <button class="w-9 h-9 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 shadow-sm flex items-center justify-center">
                      <Download :size="14" />
                    </button>
                    <button class="w-9 h-9 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-rose-600 hover:border-rose-100 shadow-sm flex items-center justify-center">
                      <MoreHorizontal :size="14" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </LayoutDashboardLayout>
</template>
