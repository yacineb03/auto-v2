<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" :class="headerClasses">
      <slot name="header">
        <h3 class="text-lg font-bold text-neutral-900">{{ title }}</h3>
        <p v-if="subtitle" class="text-sm text-neutral-500 mt-1">{{ subtitle }}</p>
      </slot>
    </div>
    
    <div :class="bodyClasses">
      <slot />
    </div>

    <div v-if="$slots.footer" :class="footerClasses">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  title?: string
  subtitle?: string
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  hoverable: false
})

const variantClasses = {
  default: 'bg-white',
  bordered: 'bg-white border border-neutral-100',
  elevated: 'bg-white shadow-sm border border-neutral-100',
  gradient: 'bg-gradient-to-br from-[#4F46E5] to-[#6366f1] text-white'
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}

const cardClasses = computed(() => [
  'rounded-2xl',
  variantClasses[props.variant],
  props.hoverable ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''
])

const headerClasses = computed(() => [
  paddingClasses[props.padding],
  'border-b border-neutral-100'
])

const bodyClasses = computed(() => [
  paddingClasses[props.padding]
])

const footerClasses = computed(() => [
  paddingClasses[props.padding],
  'border-t border-neutral-100'
])
</script>
