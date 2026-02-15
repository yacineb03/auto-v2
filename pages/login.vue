<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-neutral-900 font-sans">
    
    <!-- Left Side: Branding -->
    <div class="hidden lg:flex flex-col justify-between bg-[#F8F8FA] p-12 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4F46E5]/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ccf32f]/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

      <!-- Logo -->
      <div class="relative z-10 flex items-center gap-2">
        <div class="w-10 h-10 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white shadow-lg shadow-[#4F46E5]/20">
          <iconify-icon icon="solar:steering-wheel-linear" width="24" />
        </div>
        <span class="text-xl font-bold tracking-tight text-neutral-900">DriveFlow</span>
      </div>

      <!-- Testimonial -->
      <div class="relative z-10 max-w-md">
        <h2 class="text-3xl font-semibold mb-6">Gérez votre auto-école comme une startup tech.</h2>
        <UiCard variant="elevated" padding="lg">
          <div class="flex gap-1 text-[#ccf32f] mb-3">
            <iconify-icon v-for="i in 5" :key="i" icon="solar:star-bold" width="16" />
          </div>
          <p class="text-neutral-600 mb-4">"Depuis qu'on utilise DriveFlow, nos élèves sont autonomes pour réserver. On a divisé par 3 le temps passé au téléphone."</p>
          <div class="flex items-center gap-3">
            <img src="https://ui-avatars.com/api/?name=Thomas+L&background=4F46E5&color=fff" alt="User" class="w-10 h-10 rounded-full">
            <div>
              <p class="text-sm font-bold text-neutral-900">Thomas Lemar</p>
              <p class="text-xs text-neutral-500">Gérant @ PermisSud</p>
            </div>
          </div>
        </UiCard>
      </div>

      <!-- Copyright -->
      <div class="relative z-10 text-xs text-neutral-400">
        &copy; 2024 DriveFlow SAS. Tous droits réservés.
      </div>
    </div>

    <!-- Right Side: Login Form -->
    <div class="flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
      <div class="w-full max-w-sm space-y-8">
        <div class="text-center lg:text-left">
          <h1 class="text-3xl font-bold tracking-tight text-neutral-900">Bon retour !</h1>
          <p class="text-neutral-500 mt-2">Connectez-vous pour accéder à votre espace de gestion.</p>
        </div>

        <form class="space-y-6" @submit.prevent="handleLogin">
          <!-- Email -->
          <UiInput
            v-model="form.email"
            type="email"
            label="Email professionnel"
            icon="solar:letter-linear"
            placeholder="nom@auto-ecole.fr"
            :error="errors.email"
            required
          />

          <!-- Password -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="text-sm font-medium text-neutral-700">Mot de passe</label>
              <a href="#" class="text-xs font-medium text-[#4F46E5] hover:underline">Mot de passe oublié ?</a>
            </div>
            <UiInput
              v-model="form.password"
              type="password"
              icon="solar:lock-password-linear"
              placeholder="••••••••"
              :error="errors.password"
              required
            />
          </div>

          <!-- Submit Button -->
          <UiButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="loading"
            :disabled="loading"
            full-width
            icon="solar:login-2-linear"
          >
            {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
          </UiButton>
        </form>

        <!-- Divider -->
        <div class="relative mt-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-neutral-100" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-neutral-400">Ou continuer avec</span>
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-4 mt-4">
          <UiButton variant="outline" icon="logos:google-icon">
            Google
          </UiButton>
          <UiButton variant="outline" icon="logos:microsoft-icon">
            Microsoft
          </UiButton>
        </div>

        <!-- Quick Demo Access -->
        <div class="space-y-4 pt-4 border-t border-neutral-100">
          <p class="text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Accès Rapide Démo</p>
          <div class="grid grid-cols-3 gap-3">
            <button @click="form.email = 'admin@driveflow.fr'; form.password = 'password'; handleLogin()" class="py-3 px-2 bg-slate-900 text-white rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">Admin</button>
            <button @click="form.email = 'moniteur@driveflow.fr'; form.password = 'password'; handleLogin()" class="py-3 px-2 bg-slate-100 text-slate-600 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all">Moniteur</button>
            <button @click="form.email = 'eleve@driveflow.fr'; form.password = 'password'; handleLogin()" class="py-3 px-2 bg-slate-100 text-slate-600 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all">Élève</button>
          </div>
        </div>

        <!-- Register Link -->
        <p class="text-center text-sm text-neutral-500 mt-6 pt-4 border-t border-neutral-50">
          Pas encore de compte ? 
          <NuxtLink to="/register" class="font-semibold text-[#4F46E5] hover:underline">Créer une auto-école</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Demo mode enabled
definePageMeta({
  layout: false
})

useHead({
  title: 'Connexion - DriveFlow'
})

const { login, user } = useAuth()
const { success, error: showError } = useToast()

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  errors.email = ''
  errors.password = ''

  try {
    await login(form.email, form.password)
    success('Connexion réussie !')
    await navigateTo('/dashboard')
  } catch (err: any) {
    showError(err.data?.statusMessage || 'Email ou mot de passe incorrect')
  } finally {
    loading.value = false
  }
}
</script>
