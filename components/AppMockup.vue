<template>
  <section id="solution" class="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
    <div class="bg-neutral-900 rounded-[2.5rem] p-8 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[500px]">
      
      <div class="relative z-10 w-full md:w-1/2">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/20 text-[#818cf8] text-xs font-semibold border border-[#4F46E5]/20 mb-6">
          <iconify-icon icon="solar:star-stars-bold" width="12"></iconify-icon>
          Pour vos élèves
        </div>
        <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6 leading-tight">
          L'application qu'ils <br> vont adorer.
        </h2>
        <p class="text-neutral-400 text-lg mb-8 max-w-sm">Offrez une expérience moderne. Liste d'attente intelligente, météo intégrée pour les séances, et score de préparation à l'examen.</p>
      </div>

      <!-- Floating Feature Card -->
      <div class="relative z-10 mt-12 md:mt-0 w-full max-w-sm transform md:translate-x-10">
        <div class="bg-white rounded-3xl p-6 shadow-2xl relative">
          <div class="flex justify-between items-center mb-6">
            <span class="text-sm font-bold text-neutral-900">Planning de la semaine</span>
            <div class="bg-indigo-50 text-[#4F46E5] px-2 py-1 rounded-md text-xs font-bold">Liste d'attente active</div>
          </div>

          <!-- Calendar Days -->
          <div class="flex justify-between text-center mb-6 px-2">
            <div class="flex flex-col gap-1 items-center">
              <span class="text-xs text-neutral-400">Lun</span>
              <span class="text-sm font-semibold text-neutral-900">12</span>
            </div>
            <div class="flex flex-col gap-1 items-center">
              <span class="text-xs text-neutral-400">Mar</span>
              <div class="w-8 h-8 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-sm font-semibold shadow-lg shadow-indigo-500/30">
                13
              </div>
            </div>
            <div class="flex flex-col gap-1 items-center">
              <span class="text-xs text-neutral-400">Mer</span>
              <span class="text-sm font-semibold text-neutral-900">14</span>
            </div>
            <div class="flex flex-col gap-1 items-center">
              <span class="text-xs text-neutral-400">Jeu</span>
              <span class="text-sm font-semibold text-neutral-900">15</span>
            </div>
            <div class="flex flex-col gap-1 items-center opacity-50">
              <span class="text-xs text-neutral-400">Ven</span>
              <span class="text-sm font-semibold text-neutral-900">16</span>
            </div>
          </div>

          <!-- Slot Card -->
          <div class="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-full bg-[#ccf32f] flex items-center justify-center text-neutral-900">
                <iconify-icon icon="solar:steering-wheel-bold" width="20"></iconify-icon>
              </div>
              <div>
                <p class="text-xs text-neutral-500">Créneau disponible !</p>
                <p class="text-sm font-bold text-neutral-900">Mardi, 10:00 - 11:00</p>
              </div>
            </div>
            <button class="w-full mt-2 bg-neutral-900 text-white py-2 rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors">
              Réserver instantanément
            </button>
          </div>
        </div>
      </div>

      <!-- Background Abstract -->
      <div class="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900 to-[#1e1b4b]">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4F46E5]/20 rounded-full blur-[100px]"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
// App Mockup Section
</script>
