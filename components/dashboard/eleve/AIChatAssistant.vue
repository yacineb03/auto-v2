<script setup lang="ts">
import { ref } from 'vue'
import { Send, Sparkles, User, BrainCircuit } from 'lucide-vue-next'

const messages = ref([
  { role: 'assistant', text: 'Bonjour Yacine ! Je suis ton assistant DriveSchool. Une question sur ton code ou ton planning ?' }
])

const newMessage = ref('')

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  messages.value.push({ role: 'user', text: newMessage.value })
  newMessage.value = ''
  
  // Simulation réponse IA
  setTimeout(() => {
    messages.value.push({ role: 'assistant', text: 'Je vérifie cela pour toi...' })
  }, 1000)
}
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col overflow-hidden h-[400px]">
    <!-- Header -->
    <div class="p-4 border-b border-slate-50 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
          <BrainCircuit :size="18" />
        </div>
        <div>
          <h3 class="font-bold text-sm leading-none">Assistant Intelligent</h3>
          <p class="text-[9px] font-medium text-indigo-100 mt-1 uppercase tracking-widest flex items-center gap-1">
             <span class="w-1 h-1 bg-green-300 rounded-full animate-pulse"></span> IA Connectée
          </p>
        </div>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
      <div 
        v-for="(msg, index) in messages" 
        :key="index"
        :class="msg.role === 'assistant' ? 'flex justify-start' : 'flex justify-end'"
      >
        <div 
          :class="[
            'max-w-[85%] p-3 rounded-xl text-xs font-medium leading-relaxed shadow-sm',
            msg.role === 'assistant' 
              ? 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100' 
              : 'bg-indigo-600 text-white rounded-tr-none'
          ]"
        >
          {{ msg.text }}
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4 border-t border-slate-50 bg-slate-50/50">
      <div class="relative">
        <input 
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text" 
          placeholder="Pose-moi une question..."
          class="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-4 pr-12 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-inner"
        />
        <button 
          @click="sendMessage"
          class="absolute right-2 top-1.5 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Send :size="14" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
</style>
