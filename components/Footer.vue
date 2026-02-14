<template>
  <footer class="bg-white border-t border-neutral-100 pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-neutral-100 pb-16">
        <!-- Brand -->
        <div class="col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white">
              <iconify-icon icon="solar:steering-wheel-linear" width="18"></iconify-icon>
            </div>
            <span class="text-lg font-semibold text-neutral-900">DriveFlow</span>
          </div>
          <p class="text-sm text-neutral-500">Le futur de l'apprentissage de la conduite.</p>
        </div>

        <!-- Links 1 -->
        <div>
          <h4 class="text-sm font-bold text-neutral-900 mb-6">Produit</h4>
          <ul class="space-y-4 text-sm text-neutral-500">
            <li><a href="#" class="hover:text-[#4F46E5] transition-colors">Fonctionnalités</a></li>
            <li><a href="#" class="hover:text-[#4F46E5] transition-colors">Pour les élèves</a></li>
            <li><a href="#" class="hover:text-[#4F46E5] transition-colors">Pour les moniteurs</a></li>
            <li><a href="#" class="hover:text-[#4F46E5] transition-colors">Tarifs</a></li>
          </ul>
        </div>

        <!-- Links 2 -->
        <div>
          <h4 class="text-sm font-bold text-neutral-900 mb-6">Entreprise</h4>
          <ul class="space-y-4 text-sm text-neutral-500">
            <li><a href="#" class="hover:text-[#4F46E5] transition-colors">À propos</a></li>
            <li><a href="#" class="hover:text-[#4F46E5] transition-colors">Blog</a></li>
            <li><a href="#" class="hover:text-[#4F46E5] transition-colors">Mentions légales</a></li>
            <li><a href="#" class="hover:text-[#4F46E5] transition-colors">Politique RGPD</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-sm font-bold text-neutral-900 mb-6">Contact</h4>
          <ul class="space-y-4 text-sm text-neutral-500">
            <li class="flex items-center gap-2">
              <iconify-icon icon="solar:letter-linear" width="16"></iconify-icon>
              hello@driveflow.fr
            </li>
            <li class="flex items-center gap-2">
              <iconify-icon icon="solar:phone-linear" width="16"></iconify-icon>
              01 23 45 67 89
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-center pt-8 text-neutral-400 text-sm gap-4">
        <p>© 2024 DriveFlow SAS. Tous droits réservés.</p>
        <div class="flex gap-4">
          <a href="#" class="hover:text-[#4F46E5] transition-colors">
            <iconify-icon icon="brandico:linkedin-rect" width="16"></iconify-icon>
          </a>
          <a href="#" class="hover:text-[#4F46E5] transition-colors">
            <iconify-icon icon="brandico:twitter-bird" width="16"></iconify-icon>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component
</script>
