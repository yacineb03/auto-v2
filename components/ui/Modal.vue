<script setup lang="ts">
import { X } from 'lucide-vue-next'

interface Props {
  modelValue: boolean
  title?: string
  subtitle?: string
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'max-w-2xl'
})

const emit = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" @click="close"></div>
        
        <!-- Modal Content -->
        <div 
          class="relative w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300"
          :class="maxWidth"
        >
          <!-- Header -->
          <div class="p-6 sm:p-8 border-b border-slate-50 flex justify-between items-start bg-slate-50/30">
            <div class="space-y-1">
              <h3 v-if="title" class="text-xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">{{ title }}</h3>
              <p v-if="subtitle" class="text-slate-400 text-[9px] font-black uppercase tracking-widest">{{ subtitle }}</p>
            </div>
            <button 
              @click="close"
              class="w-10 h-10 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all flex items-center justify-center shadow-sm"
            >
              <X :size="18" />
            </button>
          </div>

          <!-- Body -->
          <div class="overflow-y-auto max-h-[75vh] p-6 sm:p-8 scrollbar-hide">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="p-6 sm:p-8 border-t border-slate-50 bg-slate-50/50">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
