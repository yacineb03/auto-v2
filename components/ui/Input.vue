<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="id" class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
      {{ label }}
      <span v-if="required" class="text-rose-500">*</span>
    </label>
    
    <div class="relative group">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
      />
      
      <iconify-icon 
        v-if="icon" 
        :icon="icon" 
        class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors"
        width="18"
      />
      
      <iconify-icon 
        v-if="error" 
        icon="solar:danger-circle-bold" 
        class="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500"
        width="18"
      />
      
      <iconify-icon 
        v-else-if="success" 
        icon="solar:check-circle-bold" 
        class="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500"
        width="18"
      />
    </div>

    <p v-if="error" class="text-[9px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1.5 px-1">
      <iconify-icon icon="solar:info-circle-bold" width="12" />
      {{ error }}
    </p>
    
    <p v-else-if="hint" class="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id?: string
  type?: string
  label?: string
  modelValue?: string | number
  placeholder?: string
  icon?: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  success?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  success: false
})

defineEmits(['update:modelValue', 'blur'])

const inputClasses = computed(() => [
  'w-full py-4 rounded-xl border transition-all outline-none font-bold text-sm text-slate-900',
  props.icon ? 'pl-12' : 'px-6',
  props.error || props.success ? 'pr-12' : '',
  props.error 
    ? 'border-rose-200 bg-rose-50 focus:border-rose-500 focus:bg-white' 
    : props.success
      ? 'border-emerald-200 bg-emerald-50 focus:border-emerald-500 focus:bg-white'
      : 'border-slate-100 bg-slate-50 focus:border-indigo-400 focus:bg-white shadow-inner',
  props.disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-transparent' : ''
])
</script>
