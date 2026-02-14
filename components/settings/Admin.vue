<template>
  <div class="flex h-screen overflow-hidden bg-[#F8F8FA] text-neutral-900 font-sans">
    
    <!-- Desktop Sidebar -->
    <aside class="hidden md:flex w-64 flex-col bg-neutral-900 text-white border-r border-neutral-800 h-full">
      <div class="px-8 py-6 flex items-center gap-3 border-b border-neutral-800">
        <div class="w-8 h-8 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white shadow-lg shadow-[#4F46E5]/20">
          <iconify-icon icon="solar:steering-wheel-linear" width="18" height="18"></iconify-icon>
        </div>
        <span class="text-lg font-bold tracking-tight text-white">DriveFlow Admin</span>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <p class="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Principal</p>
        <NuxtLink to="/dashboard" class="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-xl font-medium transition-colors">
          <iconify-icon icon="solar:widget-linear" width="20"></iconify-icon>
          Vue d'ensemble
        </NuxtLink>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-xl font-medium transition-colors">
          <iconify-icon icon="solar:users-group-rounded-linear" width="20"></iconify-icon>
          Utilisateurs
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-xl font-medium transition-colors">
          <iconify-icon icon="solar:calendar-linear" width="20"></iconify-icon>
          Planning Global
        </a>

        <p class="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 mt-6">Gestion</p>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-xl font-medium transition-colors">
          <iconify-icon icon="solar:wallet-linear" width="20"></iconify-icon>
          Finances
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-xl font-medium transition-colors">
          <iconify-icon icon="solar:car-linear" width="20"></iconify-icon>
          Flotte
        </a>
        <NuxtLink to="/settings" class="flex items-center gap-3 px-4 py-3 bg-[#4F46E5] text-white rounded-xl font-medium transition-colors shadow-lg shadow-[#4F46E5]/20">
          <iconify-icon icon="solar:settings-linear" width="20"></iconify-icon>
          Paramètres
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-neutral-800">
        <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-red-400 transition-colors rounded-xl hover:bg-red-500/10 text-left">
          <iconify-icon icon="solar:logout-2-linear" width="20"></iconify-icon>
          <span class="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col h-full overflow-hidden relative">
      <!-- Mobile Header (Admin Dark Style) -->
      <header class="md:hidden bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between z-20">
        <div class="flex items-center gap-2">
            <NuxtLink to="/dashboard" class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white">
              <iconify-icon icon="solar:steering-wheel-linear" width="18"></iconify-icon>
            </div>
            <span class="text-lg font-bold text-white">Admin Settings</span>
          </NuxtLink>
        </div>
      </header>

      <!-- Scrollable Area -->
       <div class="flex-1 overflow-y-auto w-full p-4 md:p-8 pb-24 md:pb-8">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-2xl font-bold text-neutral-900 mb-6">Paramètres de l'auto-école</h1>
          
           <!-- School Info -->
          <div class="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-neutral-100 mb-8">
            <h2 class="text-xl font-bold text-neutral-900 mb-6">Informations de l'établissement</h2>
             <form class="space-y-6" @submit.prevent>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Inputs -->
                <div class="space-y-2">
                  <label class="text-sm font-medium text-neutral-700">Nom de l'école</label>
                  <input type="text" value="Auto-École DriveFlow" class="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none">
                </div>
                 <div class="space-y-2">
                  <label class="text-sm font-medium text-neutral-700">Email de contact</label>
                  <input type="email" value="contact@driveflow.fr" class="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none">
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-neutral-700">Adresse</label>
                  <input type="text" value="38 Avenue de la République" class="w-full px-4 py-3 rounded-xl border border-neutral-200 outline-none">
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
const handleLogout = async () => {
  auth.value = null
  await navigateTo('/login')
}
</script>
