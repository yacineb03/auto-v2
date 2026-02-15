<template>
  <nav class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-100">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white shadow-lg shadow-[#4F46E5]/20">
          <iconify-icon icon="solar:steering-wheel-linear" width="24"></iconify-icon>
        </div>
        <span class="text-lg font-semibold tracking-tight text-neutral-900">DriveFlow</span>
      </div>

      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-500">
        <a href="#features" class="hover:text-[#4F46E5] transition-colors">Fonctionnalités</a>
        <a href="#solution" class="hover:text-[#4F46E5] transition-colors">Solutions</a>
        <a href="#tech" class="hover:text-[#4F46E5] transition-colors">Technologie</a>
      </div>

      <div class="flex items-center gap-4">
        <NuxtLink to="/login" class="hidden sm:block text-sm font-medium text-neutral-600 hover:text-neutral-900">Se connecter</NuxtLink>
        <NuxtLink to="/register" class="bg-[#4F46E5] text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-[#4338ca] transition-colors flex items-center gap-2 shadow-md shadow-[#4F46E5]/20">
          <span>Découvrir la démo</span>
          <iconify-icon icon="solar:arrow-right-linear" width="18"></iconify-icon>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Header component
</script>
