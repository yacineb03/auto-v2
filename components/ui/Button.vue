<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <iconify-icon 
      v-if="loading" 
      icon="solar:loading-line-duotone" 
      class="animate-spin"
      :width="iconSize"
    />
    <iconify-icon 
      v-else-if="icon" 
      :icon="icon" 
      :width="iconSize"
    />
    <span v-if="$slots.default || label"><slot>{{ label }}</slot></span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  icon?: string
  label?: string
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false
})

defineEmits(['click'])

const variantClasses = {
  primary: 'bg-[#4F46E5] text-white hover:bg-[#4338ca] shadow-lg shadow-indigo-500/20',
  secondary: 'bg-[#ccf32f] text-neutral-900 hover:bg-[#b8db2a] shadow-lg shadow-[#ccf32f]/20',
  outline: 'border-2 border-neutral-200 text-neutral-700 hover:border-[#4F46E5] hover:text-[#4F46E5] bg-white',
  ghost: 'text-neutral-600 hover:bg-neutral-50',
  danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20'
}

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3',
  lg: 'px-6 py-4 text-lg'
}

const iconSize = computed(() => {
  return props.size === 'sm' ? '16' : props.size === 'lg' ? '24' : '20'
})

const buttonClasses = computed(() => [
  'rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2',
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.fullWidth ? 'w-full' : '',
  props.disabled || props.loading 
    ? 'opacity-50 cursor-not-allowed' 
    : 'hover:scale-[1.02] active:scale-[0.98]'
])
</script>
