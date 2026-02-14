<template>
  <span :class="badgeClasses">
    <iconify-icon v-if="icon" :icon="icon" :width="12" />
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  dot: false
})

const variantClasses = {
  default: 'bg-neutral-100 text-neutral-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-orange-100 text-orange-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  primary: 'bg-[#4F46E5]/10 text-[#4F46E5]'
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm'
}

const badgeClasses = computed(() => [
  'inline-flex items-center gap-1 rounded-full font-semibold',
  variantClasses[props.variant],
  sizeClasses[props.size]
])
</script>
