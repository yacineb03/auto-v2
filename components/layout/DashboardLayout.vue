<template>
  <div class="flex h-screen overflow-hidden bg-[#F8F8FA] text-neutral-900 font-sans">
    
    <!-- Sidebar (Visible pour Staff et Admin sur Desktop) -->
    <aside 
      v-if="user?.rank !== 1"
      class="hidden md:flex w-64 flex-col border-r border-neutral-100 h-full bg-white transition-colors duration-500 text-neutral-900"
    >
      <!-- Logo -->
      <div class="px-8 py-6 flex items-center gap-3 border-b border-neutral-50">
        <div class="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
          <iconify-icon icon="solar:steering-wheel-linear" width="18" />
        </div>
        <span class="text-lg font-bold tracking-tight text-neutral-900">DriveFlow</span>
      </div>

      <!-- Navigation Side -->
      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <p class="px-4 text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-400">Menu</p>
        
        <NuxtLink
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all"
          :class="isActive(item.to) 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
            : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'"
        >
          <iconify-icon :icon="item.icon" width="20" />
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Settings & Logout Side -->
      <div class="p-4 space-y-2 border-t" :class="user?.rank === 2 ? 'border-slate-800' : 'border-neutral-100'">
        <NuxtLink 
          to="/settings"
          class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
        >
          <iconify-icon icon="solar:settings-linear" width="20" />
          <span>Paramètres</span>
        </NuxtLink>
        <button 
          @click="handleLogout" 
          class="w-full flex items-center gap-3 px-4 py-3 transition-colors rounded-xl text-left text-neutral-500 hover:text-red-600 hover:bg-red-50"
        >
          <iconify-icon icon="solar:logout-2-linear" width="20" />
          <span class="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col h-full overflow-hidden relative">
      
      <!-- TOP NAVIGATION PC (Élève) -->
      <header 
        v-if="user?.rank === 1"
        class="hidden md:flex h-20 bg-white border-b border-neutral-100 px-8 items-center justify-between z-30 shadow-sm"
      >
        <div class="flex items-center gap-3 w-48">
          <div class="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
            <iconify-icon icon="solar:steering-wheel-linear" width="18" />
          </div>
          <span class="text-lg font-bold tracking-tight text-neutral-900">DriveFlow</span>
        </div>

        <!-- MENU CENTRÉ -->
        <nav class="flex items-center justify-center gap-2 flex-1">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            class="px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all"
            :class="isActive(item.to) 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
              : 'text-neutral-400 hover:bg-slate-50 hover:text-neutral-900'"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-6 w-48 justify-end">
          <div class="relative">
            <button 
              @click="isNotificationOpen = !isNotificationOpen"
              class="relative p-2 text-neutral-400 hover:text-indigo-600 transition-colors"
            >
              <iconify-icon icon="solar:bell-linear" width="22" />
              <span v-if="notifications.filter(n => !n.read).length > 0" class="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <!-- Notification Dropdown -->
            <Transition name="fade">
              <div v-if="isNotificationOpen" class="absolute top-12 right-0 w-80 bg-white rounded-[2rem] shadow-2xl border border-slate-100 z-[60] overflow-hidden">
                <div class="p-6 border-b border-slate-50 flex justify-between items-center">
                   <h4 class="text-[10px] font-black uppercase tracking-widest text-slate-900">Notifications</h4>
                   <button @click="markAllAsRead" class="text-[8px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Tout lire</button>
                </div>
                <div class="max-h-96 overflow-y-auto scrollbar-hide">
                   <div v-for="notif in notifications" :key="notif.id" :class="!notif.read ? 'bg-slate-50/50' : ''" class="p-5 border-b border-slate-50 hover:bg-slate-50 transition-all flex gap-4 items-start group">
                      <div :class="notif.color" class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-white">
                         <iconify-icon :icon="notif.icon" width="18" />
                      </div>
                      <div class="flex-1 space-y-1">
                         <p class="text-[10px] font-black text-slate-900 leading-tight">{{ notif.title }}</p>
                         <p class="text-[9px] font-medium text-slate-400 leading-relaxed">{{ notif.message }}</p>
                         <p class="text-[8px] font-black text-slate-300 uppercase italic">{{ notif.time }}</p>
                      </div>
                      <div v-if="!notif.read" class="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2"></div>
                   </div>
                </div>
                <div class="p-4 bg-slate-50 text-center">
                   <button class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900 transition-all">Voir tout l'historique</button>
                </div>
              </div>
            </Transition>
          </div>
          
          <NuxtLink to="/settings" class="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs hover:bg-indigo-100 transition-colors">
            {{ initials }}
          </NuxtLink>
        </div>
      </header>

      <!-- MOBILE TOP HEADER (All Roles) -->
      <header class="md:hidden bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between z-20">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
            <iconify-icon icon="solar:steering-wheel-linear" width="18" />
          </div>
          <span class="text-lg font-bold text-neutral-900">DriveFlow</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative">
            <button @click="isNotificationOpen = !isNotificationOpen" class="text-slate-400 pt-2"><iconify-icon icon="solar:bell-linear" width="22" /></button>
            <span v-if="notifications.filter(n => !n.read).length > 0" class="absolute top-1 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </div>
          <NuxtLink to="/settings" class="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-[10px] font-bold border border-indigo-100 hover:bg-indigo-100 transition-colors">
            {{ initials }}
          </NuxtLink>
        </div>
      </header>

      <!-- Notification Dropdown MOBILE -->
      <Transition name="slide">
        <div v-if="isNotificationOpen && mobileMenuOpen === false" class="md:hidden fixed top-20 inset-x-0 bg-white z-50 border-b border-slate-100 shadow-xl max-h-[60vh] overflow-y-auto">
           <div v-for="notif in notifications" :key="notif.id" class="p-6 border-b border-slate-50 flex gap-4 items-start">
             <div :class="notif.color" class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
               <iconify-icon :icon="notif.icon" width="18" />
             </div>
             <div>
               <p class="text-xs font-black text-slate-900 leading-tight mb-1">{{ notif.title }}</p>
               <p class="text-[10px] font-medium text-slate-400 leading-relaxed italic">{{ notif.time }}</p>
             </div>
           </div>
        </div>
      </Transition>
      
      <!-- Desktop Sub-Header (Staff & Admin) -->
      <div 
        v-if="user?.rank !== 1"
        class="hidden md:flex justify-between items-center px-8 py-6 mb-2"
      >
        <div>
          <h1 class="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{{ pageTitle }}</h1>
          <p class="text-slate-400 text-xs font-medium mt-1">{{ pageSubtitle }}</p>
        </div>
      </div>

      <!-- Scrollable Content -->
      <div 
        class="flex-1 overflow-y-auto w-full px-4 md:px-8 pb-32 md:pb-8"
        :class="user?.rank === 1 ? 'pt-8' : ''"
      >
        <slot />
      </div>

      <!-- MOBILE BOTTOM NAV BAR (Fixe en bas sur mobile) -->
      <nav 
        class="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 px-6 flex items-center justify-between z-50 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.03)]"
      >
        <NuxtLink
          v-for="item in menuItems.slice(0, 5)"
          :key="item.to"
          :to="item.to"
          class="flex flex-col items-center justify-center gap-1 transition-all"
          :class="isActive(item.to) ? 'text-indigo-600' : 'text-slate-400'"
        >
          <iconify-icon :icon="item.icon" :width="isActive(item.to) ? 24 : 22" />
          <span class="text-[9px] font-bold uppercase tracking-tighter">{{ item.label.split(' ')[0] }}</span>
        </NuxtLink>
      </nav>
    </main>

    <!-- Mobile Menu Overlay -->
    <Transition name="fade">
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden fixed inset-0 bg-black/50 z-30"
        @click="mobileMenuOpen = false"
      />
    </Transition>

    <!-- Mobile Menu -->
    <Transition name="slide">
      <div v-if="mobileMenuOpen" class="md:hidden fixed inset-y-0 left-0 w-72 bg-white z-40 shadow-xl">
        <!-- Mobile menu content here -->
      </div>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  pageTitle: { type: String, required: true },
  pageSubtitle: String,
  notificationCount: Number
})

const route = useRoute()
const router = useRouter()
const { user } = useAuth()
const mobileMenuOpen = ref(false)
const isNotificationOpen = ref(false)

const notifications = ref([
  { 
    id: 1, 
    title: 'Nouveau Document', 
    message: 'Yacine B. a déposé sa pièce d\'identité.', 
    time: 'Il y a 10 min', 
    read: false, 
    icon: 'solar:file-bold', 
    color: 'bg-indigo-50 text-indigo-600' 
  },
  { 
    id: 2, 
    title: 'Paiement Reçu', 
    message: 'Sophie L. a réglé son forfait Zen.', 
    time: 'Il y a 1h', 
    read: false, 
    icon: 'solar:wallet-money-bold', 
    color: 'bg-emerald-50 text-emerald-600' 
  },
  { 
    id: 3, 
    title: 'Leçon Annulée', 
    message: 'Thomas M. a annulé sa leçon de demain.', 
    time: 'Il y a 3h', 
    read: true, 
    icon: 'solar:calendar-minimalistic-bold', 
    color: 'bg-rose-50 text-rose-600' 
  },
])

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const menuItems = computed(() => {
  const baseItems = [
    { to: '/dashboard', icon: 'solar:home-smile-bold', label: 'Tableau de bord' }
  ]

  if (user.value?.rank === 1) { // Élève
    return [
      ...baseItems,
      { to: '/planning', icon: 'solar:calendar-linear', label: 'Planning' },
      { to: '/code-quiz', icon: 'solar:notebook-linear', label: 'Code & Quiz' },
      { to: '/documents', icon: 'solar:file-text-linear', label: 'Documents' },
      { to: '/messages', icon: 'solar:chat-round-line-linear', label: 'Messages', badge: 2 }
    ]
  } else if (user.value?.rank === 2) { // Moniteur
    return [
      ...baseItems,
      { to: '/planning', icon: 'solar:calendar-linear', label: 'Planning' },
      { to: '/eleves', icon: 'solar:users-group-rounded-linear', label: 'Mes Élèves' },
      { to: '/messages', icon: 'solar:chat-round-line-linear', label: 'Messages' }
    ]
  } else if (user.value?.rank === 3) { // Admin
    return [
      ...baseItems,
      { to: '/eleves', icon: 'solar:users-group-rounded-linear', label: 'Élèves' },
      { to: '/moniteurs', icon: 'solar:user-id-linear', label: 'Moniteurs' },
      { to: '/planning', icon: 'solar:calendar-linear', label: 'Planning' },
      { to: '/flotte', icon: 'solar:car-linear', label: 'Flotte' },
      { to: '/documents-admin', icon: 'solar:file-text-linear', label: 'Documents' },
      { to: '/paiements', icon: 'solar:wallet-money-linear', label: 'Paiements' },
      { to: '/statistiques', icon: 'solar:chart-square-linear', label: 'Statistiques' }
    ]
  }
  return baseItems
})

const isActive = (path) => {
  return route.path === path
}

const roleLabel = computed(() => {
  const labels = {
    1: 'Élève',
    2: 'Moniteur',
    3: 'Administrateur'
  }
  return labels[user.value?.rank || 1]
})

const initials = computed(() => {
  if (!user.value) return '?'
  return (user.value.firstname[0] + user.value.lastname[0]).toUpperCase()
})

const handleLogout = async () => {
  user.value = null
  await router.push('/login')
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}
</style>
