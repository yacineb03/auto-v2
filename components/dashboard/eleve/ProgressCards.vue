<script setup lang="ts">
import { BookOpen, GraduationCap } from 'lucide-vue-next'

const progresses = [
  {
    title: 'Code de la route',
    icon: BookOpen,
    percent: 85,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    stats: '12/15 réussis'
  },
  {
    title: 'Conduite',
    icon: GraduationCap,
    percent: 40,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    stats: '8h / 20h'
  }
]
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div 
      v-for="item in progresses" 
      :key="item.title"
      class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center p-2" :class="[item.bg, item.color]">
            <component :is="item.icon" :size="20" />
          </div>
          <div>
            <h4 class="text-xs font-bold text-slate-800 leading-none">{{ item.title }}</h4>
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{{ item.stats }}</p>
          </div>
        </div>
        <span class="text-sm font-black text-slate-900">{{ item.percent }}%</span>
      </div>

      <div class="w-full bg-slate-50 h-2 rounded-full overflow-hidden p-0.5 border border-slate-100">
        <div 
          class="h-full rounded-full transition-all duration-1000 ease-out"
          :class="item.color === 'text-indigo-600' ? 'bg-indigo-600' : 'bg-blue-600'"
          :style="{ width: `${item.percent}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>
