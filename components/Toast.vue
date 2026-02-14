<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="toastClasses(toast.type)"
          class="pointer-events-auto"
        >
          <iconify-icon :icon="getIcon(toast.type)" width="20" />
          <span class="flex-1">{{ toast.message }}</span>
          <button @click="remove(toast.id)" class="hover:opacity-70">
            <iconify-icon icon="solar:close-circle-linear" width="20" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { toasts, remove } = useToast()

const toastClasses = (type: string) => {
  const base = 'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm min-w-[300px] max-w-md'
  
  const variants: Record<string, string> = {
    success: 'bg-green-50 text-green-900 border border-green-200',
    error: 'bg-red-50 text-red-900 border border-red-200',
    warning: 'bg-orange-50 text-orange-900 border border-orange-200',
    info: 'bg-blue-50 text-blue-900 border border-blue-200'
  }
  
  return `${base} ${variants[type] || variants.info}`
}

const getIcon = (type: string) => {
  const icons: Record<string, string> = {
    success: 'solar:check-circle-bold',
    error: 'solar:danger-circle-bold',
    warning: 'solar:danger-triangle-bold',
    info: 'solar:info-circle-bold'
  }
  return icons[type] || icons.info
}
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.2s ease-in;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
