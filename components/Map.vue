<template>
  <section class="max-w-7xl mx-auto px-6 mb-32 flex flex-col md:flex-row items-center gap-16">
    <div class="w-full md:w-1/2 relative">
      <!-- BG Shape -->
      <div class="absolute -top-4 -left-4 w-full h-full bg-[#ccf32f] rounded-[2rem] transform -rotate-2"></div>
      <!-- Map Card -->
      <div class="relative bg-white rounded-[2rem] overflow-hidden shadow-xl h-80 border border-neutral-100 flex flex-col">
        <div class="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur p-3 rounded-xl shadow-md flex items-center gap-3 border border-neutral-100">
          <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
            <iconify-icon icon="solar:map-point-linear" width="20"></iconify-icon>
          </div>
          <div>
            <p class="text-xs text-neutral-500">Zone d'examen</p>
            <p class="text-sm font-bold text-neutral-900">Centre Noisy-le-Grand</p>
          </div>
        </div>

        <!-- Simplified Map SVG -->
        <svg class="w-full h-full bg-[#e5e7eb]" viewBox="0 0 400 300">
          <rect width="400" height="300" fill="#f3f4f6"></rect>
          <path d="M 0 100 H 400 M 0 200 H 400 M 100 0 V 300 M 300 0 V 300" stroke="white" stroke-width="12"></path>
          <!-- Path -->
          <path d="M 100 100 Q 200 150 300 100 T 350 200" stroke="#4F46E5" stroke-width="4" fill="none" stroke-dasharray="8 4"></path>
          <circle cx="350" cy="200" r="8" fill="#4F46E5"></circle>
          <circle cx="350" cy="200" r="20" fill="#4F46E5" fill-opacity="0.2" class="animate-pulse"></circle>
        </svg>

        <!-- Bottom Tooltip -->
        <div class="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg text-xs font-semibold text-neutral-700 flex items-center gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full"></span>
          En cours: Sarah L.
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2">
      <h2 class="text-3xl md:text-5xl font-semibold tracking-tight mb-6 text-neutral-900">Cartographie & Suivi</h2>
      <p class="text-lg text-neutral-500 leading-relaxed">
        Visualisez les zones travaillées. Les moniteurs peuvent noter les parcours d'examen et les élèves
        retrouvent leurs trajets sur la carte interactive pour réviser les points critiques.
      </p>
    </div>
  </section>
</template>

<script setup>
// Map Section
</script>
