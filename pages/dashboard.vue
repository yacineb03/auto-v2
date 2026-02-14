<template>
  <LayoutDashboardLayout
    :page-title="pageTitle"
    :page-subtitle="pageSubtitle"
    :user="user"
    :notification-count="2"
  >
    <!-- Dashboard Élève -->
    <DashboardEleveView v-if="user?.rank === 1" :user="user" />
    
    <!-- Dashboard Moniteur -->
    <DashboardStaffView v-else-if="user?.rank === 2" :user="user" />
    
    <!-- Dashboard Admin -->
    <DashboardAdminView v-else-if="user?.rank === 3" :user="user" />
  </LayoutDashboardLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Tableau de bord - DriveFlow'
})

const { user, fetchUser } = useAuth()

// Charger les données utilisateur
// Charger les données utilisateur (Mode Démo Statique)
onMounted(() => {
  if (!user.value) {
    // Si pas d'utilisateur (accès direct url), on met un défaut pour la démo
    user.value = {
      id: 99,
      firstname: 'Invité',
      lastname: 'Démo',
      email: 'demo@driveflow.fr',
      rank: 1, // Élève par défaut
      avatar: 'https://ui-avatars.com/api/?name=Invité+Démo'
    }
  }
})

const pageTitle = computed(() => {
  const titles: Record<number, string> = {
    1: 'Mon Tableau de Bord',
    2: 'Planning Moniteur',
    3: 'Administration'
  }
  return titles[user.value?.rank || 1]
})

const pageSubtitle = computed(() => {
  const subtitles: Record<number, string> = {
    1: 'Gérez votre apprentissage et vos leçons',
    2: 'Gérez vos élèves et votre planning',
    3: 'Vue d\'ensemble de votre auto-école'
  }
  return subtitles[user.value?.rank || 1]
})
</script>
