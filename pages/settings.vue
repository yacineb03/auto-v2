<template>
  <LayoutDashboardLayout
    page-title="Paramètres"
    page-subtitle="Gérez vos informations personnelles et vos préférences."
    :user="user"
  >
    <div class="animate-in fade-in duration-700">
      <!-- Render Settings view based on Rank -->
      <SettingsAdmin v-if="user?.rank === 3" :user="user" />
      <SettingsStaff v-else-if="user?.rank === 2" :user="user" />
      <SettingsEleve v-else :user="user" />
    </div>
  </LayoutDashboardLayout>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Paramètres - DriveFlow'
})

const { user } = useAuth()
</script>

<style scoped>
.animate-in { animation-duration: 0.8s; }
</style>
