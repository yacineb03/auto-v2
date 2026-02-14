<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
    <div class="relative bg-[#4F46E5] rounded-3xl p-8 md:p-16 overflow-hidden min-h-[850px] flex flex-col md:block shadow-2xl shadow-[#4F46E5]/20">
      
      <!-- Hero Content -->
      <div class="relative z-10 max-w-xl mt-8 md:mt-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20 mb-6 backdrop-blur-sm">
          <span class="w-2 h-2 rounded-full bg-[#ccf32f]"></span>
          Nouvelle version admin v2.0
        </div>
        <h1 class="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6 text-white">
          L'UX premium d'Ornikar,<br>
          le contrôle total pour vous.
        </h1>
        <p class="text-lg md:text-xl font-normal text-white/80 mb-10 max-w-md leading-relaxed">
          Réservations intelligentes, suivi pédagogique en temps réel, et gestion simplifiée pour élèves,
          moniteurs et administrateurs.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-start gap-4">
          <a href="#" class="bg-white text-[#4F46E5] px-6 py-3 rounded-xl hover:bg-neutral-50 transition-transform hover:scale-105 flex items-center gap-3 shadow-lg">
            <iconify-icon icon="solar:laptop-linear" width="24"></iconify-icon>
            <span class="text-base font-semibold leading-tight">Découvrir la démo</span>
          </a>
          <a href="#" class="bg-black/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-black/30 transition-transform hover:scale-105 flex items-center gap-3 border border-white/10">
            <iconify-icon icon="solar:phone-calling-linear" width="24"></iconify-icon>
            <span class="text-base font-semibold leading-tight">Nous contacter</span>
          </a>
        </div>
      </div>

      <!-- App Mockups -->
      <div class="relative md:absolute md:top-10 md:-right-24 mt-16 md:mt-0 flex justify-center md:block transform scale-90 md:scale-100">
        
        <!-- Back Phone (Instructor/Admin View) -->
        <div class="absolute top-10 -left-16 md:-left-44 w-[320px] h-[680px] bg-white rounded-3xl border-[10px] border-white shadow-2xl rotate-[-8deg] overflow-hidden hidden lg:block z-0 ring-1 ring-black/5">
          <div class="w-full h-full bg-[#F8F8FA] flex flex-col relative font-sans overflow-hidden">
            <!-- Header -->
            <div class="px-6 pt-12 pb-4 bg-white flex justify-between items-center shadow-sm z-10">
              <span class="font-semibold text-neutral-900">Planning Moniteur</span>
              <div class="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                <iconify-icon icon="solar:user-linear" width="18"></iconify-icon>
              </div>
            </div>

            <!-- Calendar View -->
            <div class="flex-1 bg-[#F8F8FA] p-4">
              <div class="flex justify-between mb-4 text-xs text-neutral-400 px-2">
                <span>08:00</span>
                <span>12:00</span>
                <span>16:00</span>
              </div>
              
              <!-- Slot 1 -->
              <div class="bg-white p-4 rounded-xl border-l-4 border-[#4F46E5] shadow-sm mb-3">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="text-sm font-semibold text-neutral-900">Leçon Conduite</h4>
                  <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Confirmé</span>
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-6 h-6 rounded-full bg-neutral-200"></div>
                  <span class="text-xs text-neutral-600">Léa Martin (20h/25h)</span>
                </div>
                <div class="flex items-center gap-1 text-neutral-400 text-xs">
                  <iconify-icon icon="solar:map-point-linear"></iconify-icon>
                  Lyçée Jules Ferry
                </div>
              </div>

              <!-- Slot 2 -->
              <div class="bg-white p-4 rounded-xl border-l-4 border-orange-400 shadow-sm mb-3 opacity-60">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="text-sm font-semibold text-neutral-900">Pause Déjeuner</h4>
                </div>
                <span class="text-xs text-neutral-500">12:00 - 13:00</span>
              </div>

              <!-- Slot 3 -->
              <div class="bg-white p-4 rounded-xl border-l-4 border-[#4F46E5] shadow-sm relative overflow-hidden">
                <div class="absolute inset-0 bg-neutral-50/50 backdrop-blur-[1px] flex items-center justify-center">
                  <button class="bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg">Voir Détails</button>
                </div>
                <div class="flex justify-between items-start mb-2">
                  <h4 class="text-sm font-semibold text-neutral-900">Examen Blanc</h4>
                </div>
                <span class="text-xs text-neutral-500">Thomas Duboi...</span>
              </div>
            </div>

            <!-- Floating Action -->
            <div class="absolute bottom-6 right-6">
              <button class="w-12 h-12 bg-[#4F46E5] rounded-full flex items-center justify-center text-white shadow-lg">
                <iconify-icon icon="solar:add-linear" width="24"></iconify-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Front Phone (Student View) -->
        <div class="relative w-[340px] h-[700px] bg-white rounded-3xl border-[12px] border-white shadow-2xl z-10 overflow-hidden ring-1 ring-black/5">
          <div class="w-full h-full bg-white flex flex-col relative font-sans overflow-hidden">
            
            <!-- App Header -->
            <div class="px-6 mt-12 mb-4 flex justify-between items-center">
              <div>
                <p class="text-xs text-neutral-500 font-medium">Bonjour,</p>
                <h2 class="text-xl font-semibold text-neutral-900">Alexandre</h2>
              </div>
              <div class="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center relative">
                <iconify-icon icon="solar:bell-linear" size="20" class="text-neutral-600"></iconify-icon>
                <span class="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </div>
            </div>

            <!-- Progress Card -->
            <div class="px-6 mb-6">
              <div class="bg-neutral-900 rounded-[24px] p-5 text-white shadow-xl shadow-neutral-900/10 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-[#4F46E5] rounded-full blur-[40px] opacity-30 translate-x-10 -translate-y-10"></div>
                <div class="flex justify-between items-end mb-4 relative z-10">
                  <div>
                    <p class="text-xs text-neutral-400 mb-1">Préparation Permis B</p>
                    <p class="text-2xl font-semibold">75%</p>
                  </div>
                  <div class="w-10 h-10 rounded-full border-2 border-[#4F46E5] flex items-center justify-center text-xs font-medium">
                    15h
                  </div>
                </div>
                <div class="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-[#4F46E5] h-full rounded-full w-3/4"></div>
                </div>
                <p class="text-[10px] text-neutral-400 mt-2">Prêt pour l'examen blanc bientôt !</p>
              </div>
            </div>

            <!-- Next Lesson Title -->
            <div class="px-6 mb-3 flex justify-between items-center">
              <h3 class="text-base font-semibold text-neutral-900">Prochaine Leçon</h3>
              <span class="text-xs text-[#4F46E5] font-medium">Voir tout</span>
            </div>

            <!-- Lesson Card -->
            <div class="px-6 mb-6">
              <div class="bg-[#F8F8FA] rounded-[24px] p-5 flex items-center gap-4 border border-neutral-100">
                <div class="flex flex-col items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-sm text-center shrink-0">
                  <span class="text-[10px] font-bold text-neutral-400 uppercase">Mar</span>
                  <span class="text-lg font-bold text-neutral-900 leading-none">14</span>
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-semibold text-neutral-900">Conduite (2h)</h4>
                  <p class="text-xs text-neutral-500">14:00 - 16:00 • avec Sarah</p>
                </div>
                <div class="w-8 h-8 rounded-full bg-[#ccf32f] flex items-center justify-center text-neutral-900">
                  <iconify-icon icon="solar:map-arrow-right-linear" width="16"></iconify-icon>
                </div>
              </div>
            </div>

            <!-- Quick Actions Grid -->
            <div class="px-6 grid grid-cols-2 gap-3 mb-6">
              <div class="bg-white border border-neutral-100 p-4 rounded-2xl shadow-sm hover:border-[#4F46E5]/30 transition-colors">
                <div class="w-8 h-8 rounded-full bg-indigo-50 text-[#4F46E5] flex items-center justify-center mb-2">
                  <iconify-icon icon="solar:calendar-add-linear" width="18"></iconify-icon>
                </div>
                <p class="text-xs font-semibold">Réserver</p>
              </div>
              <div class="bg-white border border-neutral-100 p-4 rounded-2xl shadow-sm hover:border-[#4F46E5]/30 transition-colors">
                <div class="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-2">
                  <iconify-icon icon="solar:notebook-linear" width="18"></iconify-icon>
                </div>
                <p class="text-xs font-semibold">Code/Quiz</p>
              </div>
            </div>

            <!-- Bottom Nav -->
            <div class="absolute bottom-0 w-full bg-white border-t border-neutral-100 pb-8 pt-4 px-8 flex justify-between items-center z-20 rounded-b-3xl">
              <div class="flex flex-col items-center gap-1 text-[#4F46E5]">
                <iconify-icon icon="solar:home-smile-bold" width="24"></iconify-icon>
              </div>
              <div class="flex flex-col items-center gap-1 text-neutral-400">
                <iconify-icon icon="solar:calendar-linear" width="24"></iconify-icon>
              </div>
              <div class="flex flex-col items-center gap-1 text-neutral-400">
                <iconify-icon icon="solar:chat-round-line-linear" width="24"></iconify-icon>
              </div>
              <div class="flex flex-col items-center gap-1 text-neutral-400">
                <iconify-icon icon="solar:user-circle-linear" width="24"></iconify-icon>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Hero Section
</script>
