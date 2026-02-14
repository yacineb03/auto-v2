<template>
  <div class="flex flex-col items-center justify-center py-12 px-6 text-center">
    <div class="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
      <iconify-icon :icon="icon" width="40" class="text-neutral-400" />
    </div>
    
    <h3 class="text-lg font-semibold text-neutral-900 mb-2">
      {{ title }}
    </h3>
    
    <p class="text-sm text-neutral-500 max-w-sm mb-6">
      {{ message }}
    </p>

    <UiButton
      v-if="ctaText"
      :icon="ctaIcon"
      :label="ctaText"
      variant="primary"
      @click="$emit('cta-click')"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  title: string
  message: string
  ctaText?: string
  ctaIcon?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'solar:inbox-line-linear',
  ctaIcon: 'solar:add-circle-linear'
})

defineEmits(['cta-click'])
</script>
