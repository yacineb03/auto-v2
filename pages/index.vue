<template>
  <div class="bg-white text-neutral-900 antialiased selection:bg-[#4F46E5] selection:text-white">
    <!-- Navigation -->
    <Header />

    <main class="w-full overflow-hidden">
      <!-- Hero Section -->
      <Hero />

      <!-- Metrics Section -->
      <Stats />

      <!-- Value Proposition / 3 Pillars -->
      <Features />

      <!-- Feature Spotlight: Student App -->
      <AppMockup />

      <!-- Social Proof -->
      <Testimonials />

      <!-- Feature: Instructor/Map -->
      <Map />

      <!-- Tech Stack -->
      <TechStack />

      <!-- Pricing Teaser -->
      <Pricing />

    </main>

    <!-- Footer -->
    <Footer />

  </div>
</template>

<script setup>
// SEO configuration
useHomeSEO()
</script>
