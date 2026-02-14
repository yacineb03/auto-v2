<script setup lang="ts">
import WelcomeSection from './eleve/WelcomeSection.vue'
import ProgressCards from './eleve/ProgressCards.vue'
import NextSessionCard from './eleve/NextSessionCard.vue'
import PaymentRecharge from './eleve/PaymentRecharge.vue'
import DocumentsStatus from './eleve/DocumentsStatus.vue'
import DrivingZones from './eleve/DrivingZones.vue'
import ExamRouteVideo from './eleve/ExamRouteVideo.vue'
import AIChatAssistant from './eleve/AIChatAssistant.vue'
import ActionBooking from './eleve/ActionBooking.vue'
import ActionCode from './eleve/ActionCode.vue'
import ActionMap from './eleve/ActionMap.vue'
import ActionRecharge from './eleve/ActionRecharge.vue'
</script>

<template>
  <div class="animate-in fade-in duration-700">
    <!-- En-tête de bienvenue -->
    <WelcomeSection />

    <!-- 📱 VERSION MOBILE -->
    <div class="flex flex-col gap-8 xl:hidden">
      <NextSessionCard />
      <DocumentsStatus />
      <div class="grid grid-cols-2 gap-4">
        <ActionBooking />
        <ActionCode />
      </div>
      <ProgressCards />
      <div class="space-y-4">
        <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1 text-center">Recharger mon forfait</h2>
        <PaymentRecharge />
      </div>
      <ExamRouteVideo />
      <div class="grid grid-cols-2 gap-4">
        <ActionRecharge />
        <ActionMap />
      </div>
      <AIChatAssistant />
      <DrivingZones />
    </div>

    <!-- 💻 VERSION PC -->
    <div class="hidden xl:grid xl:grid-cols-12 gap-12 items-start">
      <div class="col-span-8 flex flex-col gap-12">
        <div class="space-y-4">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">Prochaine séance</h2>
          <NextSessionCard />
        </div>
        <div class="grid grid-cols-2 gap-8">
           <ActionBooking />
           <ActionCode />
        </div>
        <div class="space-y-4">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">Ma Progression</h2>
          <ProgressCards />
        </div>
        <div class="space-y-4">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">Financement de ma formation</h2>
          <PaymentRecharge />
        </div>
        <div class="space-y-4">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">Besoin d'aide ?</h2>
          <AIChatAssistant />
        </div>
      </div>
      <div class="col-span-4 flex flex-col gap-12">
        <div class="space-y-4">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">Dossier administratif</h2>
          <DocumentsStatus />
        </div>
        <div class="space-y-4">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">Mon Parcours Examen</h2>
          <ExamRouteVideo />
        </div>
        <div class="grid grid-cols-2 gap-4">
           <ActionRecharge />
           <ActionMap />
        </div>
        <div class="space-y-4">
          <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">Zones de conduite</h2>
          <DrivingZones />
        </div>
      </div>
    </div>
  </div>
</template>
