<template>
  <div class="flex h-screen overflow-hidden bg-[#F8F8FA] text-neutral-900 font-sans">
    
    <!-- Desktop Sidebar -->
    <aside class="hidden md:flex w-64 flex-col bg-white border-r border-neutral-100 h-full">
      <div class="px-8 py-6 flex items-center gap-3 border-b border-neutral-50">
        <div class="w-8 h-8 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white shadow-lg shadow-[#4F46E5]/20">
          <iconify-icon icon="solar:steering-wheel-linear" width="18" height="18"></iconify-icon>
        </div>
        <span class="text-lg font-bold tracking-tight text-neutral-900">DriveFlow Staff</span>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <p class="px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Gestion</p>
        <NuxtLink to="/dashboard" class="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 rounded-xl font-medium transition-colors">
          <iconify-icon icon="solar:calendar-linear" width="20"></iconify-icon>
          Planning
        </NuxtLink>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 rounded-xl font-medium transition-colors">
          <iconify-icon icon="solar:users-group-rounded-linear" width="20"></iconify-icon>
          Mes Élèves
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 rounded-xl font-medium transition-colors">
          <iconify-icon icon="solar:map-point-linear" width="20"></iconify-icon>
          Parcours & Cartes
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 rounded-xl font-medium transition-colors">
          <iconify-icon icon="solar:clipboard-check-linear" width="20"></iconify-icon>
          Examens Blancs
        </a>

        <p class="px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 mt-6">Compte</p>
        <NuxtLink to="/settings" class="flex items-center gap-3 px-4 py-3 bg-[#4F46E5]/10 text-[#4F46E5] rounded-xl font-medium transition-colors">
          <iconify-icon icon="solar:settings-linear" width="20"></iconify-icon>
          Paramètres
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-neutral-100">
        <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-3 text-neutral-500 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50 text-left">
          <iconify-icon icon="solar:logout-2-linear" width="20"></iconify-icon>
          <span class="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col h-full overflow-hidden relative">
      <!-- Mobile Header -->
      <header class="md:hidden bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between z-20">
        <div class="flex items-center gap-2">
           <NuxtLink to="/dashboard" class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white">
              <iconify-icon icon="solar:steering-wheel-linear" width="18"></iconify-icon>
            </div>
            <span class="text-lg font-bold text-neutral-900">Paramètres</span>
          </NuxtLink>
        </div>
      </header>

      <!-- Scrollable Area -->
       <div class="flex-1 overflow-y-auto w-full p-4 md:p-8 pb-24 md:pb-8">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-2xl font-bold text-neutral-900 mb-6">Paramètres Moniteur</h1>
          
           <!-- Profile Card -->
          <div class="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-neutral-100 mb-8">
            <div class="flex items-center gap-6 mb-8">
              <div class="w-20 h-20 rounded-full bg-neutral-100 overflow-hidden border-4 border-white shadow-lg flex items-center justify-center text-[#4F46E5] text-2xl font-bold">
                 {{ user.initials }}
              </div>
              <div>
                <h2 class="text-xl font-bold text-neutral-900">{{ user.firstname }} {{ user.lastname }}</h2>
                <p class="text-sm text-neutral-500">Moniteur • {{ user.email }}</p>
              </div>
            </div>
            <!-- Formulaires identiques (simplifiés pour Staff) -->
             <form class="space-y-6" @submit.prevent>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Inputs -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-neutral-700">Email</label>
                  <input type="email" :value="user.email" readonly class="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-500 cursor-not-allowed">
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-neutral-700">Téléphone pro</label>
                  <div class="flex gap-3 relative z-20">
                    <div class="relative shrink-0">
                      <button type="button" @click.stop="showCountryDropdown = !showCountryDropdown" class="h-[52px] px-4 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center gap-2 hover:bg-white transition-colors focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none min-w-[120px]">
                        <span class="text-2xl leading-none">{{ selectedCountry.flag }}</span>
                        <span class="text-sm font-medium text-neutral-600">{{ selectedCountry.code }}</span>
                        <iconify-icon icon="solar:alt-arrow-down-linear" width="12" class="text-neutral-400 ml-auto"></iconify-icon>
                      </button>
                      
                      <div v-if="showCountryDropdown" class="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-neutral-100 z-50 py-1 max-h-60 overflow-y-auto">
                          <button v-for="country in countries" :key="country.code" type="button" @click="selectCountry(country)" class="w-full px-4 py-3 text-left hover:bg-neutral-50 flex items-center gap-3 text-sm border-b border-neutral-50 last:border-0 transition-colors">
                              <span class="text-xl">{{ country.flag }}</span>
                              <span class="flex-1 text-neutral-900 font-medium">{{ country.name }}</span>
                              <span class="text-neutral-400 font-mono">{{ country.code }}</span>
                          </button>
                      </div>
                    </div>
                
                    <div class="relative flex-1">
                      <input v-model="userPhone" @input="formatPhone" type="tel" id="phone" maxlength="14" class="h-[52px] w-full px-4 rounded-xl border border-neutral-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none transition-all pl-11" placeholder="6 12 34 56 78">
                      <iconify-icon icon="solar:phone-linear" class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" width="20"></iconify-icon>
                    </div>
                  </div>
                </div>
              </div>
               <div class="pt-6 border-t border-neutral-100 flex justify-end">
                <button class="px-6 py-3 bg-[#4F46E5] text-white font-semibold rounded-xl hover:bg-[#4338ca] transition-colors shadow-lg shadow-indigo-500/20">
                  Enregistrer
                </button>
              </div>
             </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const auth = useCookie('auth')
const user = ref(auth.value || { firstname: 'Moniteur', lastname: '', email: '', phone: '', initials: 'ST' })
if (!user.value.initials) user.value.initials = (user.value.firstname[0] || 'S') + (user.value.lastname[0] || 'T')

// Phone Logic
const userPhone = ref(user.value.phone || '')
const formatPhone = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.startsWith('0')) value = value.substring(1)
  if (value.length > 9) value = value.substring(0, 9)

  let formatted = value
  if (value.length > 1) {
    const part1 = value.substring(0, 1)
    const part2 = value.substring(1).match(/.{1,2}/g)?.join(' ') || ''
    formatted = part1 + (part2 ? ' ' + part2 : '')
  }
  userPhone.value = formatted
}

const countries = [
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Royaume-Uni', code: '+44', flag: '🇬🇧' },
  { name: 'Belgique', code: '+32', flag: '🇧🇪' },
  { name: 'Suisse', code: '+41', flag: '🇨🇭' },
  { name: 'Espagne', code: '+34', flag: '🇪🇸' },
  { name: 'Allemagne', code: '+49', flag: '🇩🇪' },
  { name: 'Italie', code: '+39', flag: '🇮🇹' },
  { name: 'Portugal', code: '+351', flag: '🇵🇹' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'États-Unis', code: '+1', flag: '🇺🇸' },
  { name: 'Maroc', code: '+212', flag: '🇲🇦' },
  { name: 'Algérie', code: '+213', flag: '🇩🇿' },
  { name: 'Tunisie', code: '+216', flag: '🇹🇳' }
]

const selectedCountry = ref(countries[0])
const showCountryDropdown = ref(false)

const selectCountry = (country) => {
  selectedCountry.value = country
  showCountryDropdown.value = false
}

const handleLogout = async () => {
  auth.value = null
  await navigateTo('/login')
}
</script>
