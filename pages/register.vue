<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-neutral-900 font-sans">
    
    <!-- Left Side: Branding & Social Proof -->
    <div class="hidden lg:flex flex-col justify-between bg-[#F8F8FA] p-12 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ccf32f]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4F46E5]/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>

      <!-- Logo -->
      <div class="relative z-10 flex items-center gap-2">
        <div class="w-10 h-10 rounded-xl bg-[#ccf32f] flex items-center justify-center text-neutral-900 shadow-lg shadow-[#ccf32f]/20">
          <iconify-icon icon="solar:steering-wheel-linear" width="24"></iconify-icon>
        </div>
        <span class="text-xl font-bold tracking-tight text-neutral-900">DriveFlow</span>
      </div>

      <!-- Testimonial/Hero Content -->
      <div class="relative z-10 max-w-md">
        <h2 class="text-3xl font-semibold mb-6">Rejoignez 150+ auto-écoles qui ont modernisé leur activité.</h2>
        <ul class="space-y-4 text-neutral-600 mb-8">
          <li class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <iconify-icon icon="solar:check-circle-bold" width="14"></iconify-icon>
            </div>
            <span>Essai gratuit de 14 jours, sans engagement</span>
          </li>
          <li class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <iconify-icon icon="solar:check-circle-bold" width="14"></iconify-icon>
            </div>
            <span>Configuration accompagnée par un expert</span>
          </li>
          <li class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <iconify-icon icon="solar:check-circle-bold" width="14"></iconify-icon>
            </div>
            <span>Importation de vos données existantes</span>
          </li>
        </ul>
      </div>

      <!-- Copyright -->
      <div class="relative z-10 text-xs text-neutral-400">
        &copy; 2024 DriveFlow SAS. Tous droits réservés.
      </div>
    </div>

    <!-- Right Side: Register Form -->
    <div class="flex items-center justify-center p-6 sm:p-12 relative">
      <!-- Mobile Back Button -->
      <NuxtLink to="/" class="absolute top-6 left-6 lg:hidden flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors">
        <iconify-icon icon="solar:arrow-left-linear" width="20"></iconify-icon>
        Retour
      </NuxtLink>

      <div class="w-full max-w-md space-y-8">
        <div class="text-center lg:text-left">
          <h1 class="text-3xl font-bold tracking-tight text-neutral-900">Commencer maintenant 🚀</h1>
          <p class="text-neutral-500 mt-2">Créez votre compte auto-école en quelques secondes.</p>
        </div>

        <form class="space-y-4" @submit.prevent="handleRegister">
          
          <!-- Civilité -->
          <div class="flex gap-6 mb-2">
             <label class="flex items-center gap-2 cursor-pointer group">
               <div class="relative flex items-center">
                 <input type="radio" v-model="form.civility" value="M." class="peer sr-only">
                 <div class="w-5 h-5 rounded-full border-2 border-neutral-300 peer-checked:border-[#4F46E5] peer-checked:bg-[#4F46E5] transition-all flex items-center justify-center">
                   <div class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                 </div>
               </div>
               <span class="text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">Monsieur</span>
             </label>

             <label class="flex items-center gap-2 cursor-pointer group">
               <div class="relative flex items-center">
                 <input type="radio" v-model="form.civility" value="Mme" class="peer sr-only">
                 <div class="w-5 h-5 rounded-full border-2 border-neutral-300 peer-checked:border-[#4F46E5] peer-checked:bg-[#4F46E5] transition-all flex items-center justify-center">
                    <div class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                 </div>
               </div>
               <span class="text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">Madame</span>
             </label>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <!-- First Name -->
            <div class="space-y-1">
              <label for="firstname" class="text-sm font-medium text-neutral-700">Prénom</label>
              <input v-model="form.firstname" type="text" id="firstname" required class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none transition-all" placeholder="Jean">
            </div>
            <!-- Last Name -->
            <div class="space-y-1">
              <label for="lastname" class="text-sm font-medium text-neutral-700">Nom</label>
              <input v-model="form.lastname" type="text" id="lastname" required class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none transition-all" placeholder="Dupont">
            </div>
          </div>

          <!-- School Name -->
          <div class="space-y-1">
            <label for="school" class="text-sm font-medium text-neutral-700">Nom de l'auto-école</label>
            <div class="relative">
              <input v-model="form.school_name" type="text" id="school" required class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none transition-all pl-11" placeholder="Auto-école Excellence">
              <iconify-icon icon="solar:shop-linear" class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" width="20"></iconify-icon>
            </div>
          </div>

          <!-- Email -->
          <div class="space-y-1">
            <label for="email" class="text-sm font-medium text-neutral-700">Email professionnel</label>
            <div class="relative">
              <input v-model="form.email" type="email" id="email" required class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none transition-all pl-11" placeholder="contact@auto-ecole.fr">
              <iconify-icon icon="solar:letter-linear" class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" width="20"></iconify-icon>
            </div>
          </div>

          <!-- Password -->
          <div class="space-y-1">
            <label for="password" class="text-sm font-medium text-neutral-700">Mot de passe</label>
            <div class="relative">
              <input v-model="form.password" type="password" id="password" required minlength="8" class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none transition-all pl-11" placeholder="8+ caractères">
              <iconify-icon icon="solar:lock-password-linear" class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" width="20"></iconify-icon>
            </div>
          </div>

          <!-- Phone with Country Code -->
          <div class="space-y-1">
            <label for="phone" class="text-sm font-medium text-neutral-700">Téléphone Mobile</label>
            <div class="flex gap-3 relative z-20">
              
              <!-- Country Selector -->
              <div class="relative shrink-0">
                <button type="button" @click.stop="showCountryDropdown = !showCountryDropdown" class="h-[52px] px-4 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center gap-2 hover:bg-white transition-colors focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none min-w-[120px]">
                  <span class="text-2xl leading-none">{{ selectedCountry.flag }}</span>
                  <span class="text-sm font-medium text-neutral-600">{{ selectedCountry.code }}</span>
                  <iconify-icon icon="solar:alt-arrow-down-linear" width="12" class="text-neutral-400 ml-auto"></iconify-icon>
                </button>
                
                <!-- Dropdown -->
                <div v-if="showCountryDropdown" class="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-neutral-100 z-50 py-1 max-h-60 overflow-y-auto">
                    <button v-for="country in countries" :key="country.code" type="button" @click="selectCountry(country)" class="w-full px-4 py-3 text-left hover:bg-neutral-50 flex items-center gap-3 text-sm border-b border-neutral-50 last:border-0 transition-colors">
                        <span class="text-xl">{{ country.flag }}</span>
                        <span class="flex-1 text-neutral-900 font-medium">{{ country.name }}</span>
                        <span class="text-neutral-400 font-mono">{{ country.code }}</span>
                    </button>
                </div>
              </div>

              <!-- Phone Input -->
              <div class="relative flex-1">
                <input v-model="form.phone" @input="formatPhone" type="tel" id="phone" maxlength="14" class="h-[52px] w-full px-4 rounded-xl border border-neutral-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none transition-all pl-11" placeholder="6 12 34 56 78">
                <iconify-icon icon="solar:phone-linear" class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" width="20"></iconify-icon>
              </div>
            </div>
          </div>

          <!-- Checkbox -->
          <div class="flex items-start gap-3 mt-4">
            <input type="checkbox" id="terms" required class="mt-1 w-4 h-4 text-[#4F46E5] border-neutral-300 rounded focus:ring-[#4F46E5]">
            <label for="terms" class="text-xs text-neutral-500">
              J'accepte les <a href="#" class="text-[#4F46E5] hover:underline">Conditions Générales d'Utilisation</a> et la <a href="#" class="text-[#4F46E5] hover:underline">Politique de Confidentialité</a>.
            </label>
          </div>
          
          <!-- Error Message -->
          <div v-if="errorMsg" class="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
            {{ errorMsg }}
          </div>
          
          <!-- Success Message -->
           <div v-if="successMsg" class="text-green-500 text-sm text-center bg-green-50 p-2 rounded-lg">
            {{ successMsg }}
          </div>

          <!-- Submit Button -->
          <button :disabled="loading" class="w-full bg-[#ccf32f] text-neutral-900 font-bold py-3.5 rounded-xl hover:bg-[#bce62b] transition-all hover:scale-[1.02] shadow-lg shadow-[#ccf32f]/20 flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="!loading">Créer mon compte</span>
            <span v-else>Création en cours...</span>
            <iconify-icon v-if="!loading" icon="solar:arrow-right-linear" width="20"></iconify-icon>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative mt-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-neutral-100"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-neutral-400">Déjà inscrit ?</span>
          </div>
        </div>

        <!-- Login Link -->
        <p class="text-center text-sm text-neutral-500">
          <NuxtLink to="/login" class="font-semibold text-[#4F46E5] hover:underline">Se connecter à mon compte</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

useHead({
  title: 'Inscription - DriveFlow'
})

const form = reactive({
  firstname: '',
  lastname: '',
  school_name: '',
  email: '',
  password: '',
  phone: '',
  civility: 'M.'
})

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

const selectedCountry = ref(countries[0]) // Default to France
const showCountryDropdown = ref(false)

const selectCountry = (country) => {
  selectedCountry.value = country
  showCountryDropdown.value = false
}

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
  form.phone = formatted
}

const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const handleRegister = async () => {
  loading.value = true
  errorMsg.value = ''
  successMsg.value = ''
  
  try {
    // Prepare payload with country code
    const payload = { ...form }
    if (payload.phone) {
      // Remove leading 0 if present (common mistake when using international format)
      const cleanPhone = payload.phone.startsWith('0') ? payload.phone.substring(1) : payload.phone
      payload.phone = `${selectedCountry.value.code} ${cleanPhone}`
    }

    await $fetch('/api/auth/register', {
      method: 'POST',
      body: payload
    })
    
    successMsg.value = 'Compte créé avec succès ! Redirection...'
    setTimeout(() => {
      navigateTo('/login')
    }, 1500)
    
  } catch (error) {
    errorMsg.value = error.data?.statusMessage || 'Une erreur est survenue.'
  } finally {
    loading.value = false
  }
}
</script>
