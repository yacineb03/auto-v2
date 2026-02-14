<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  Search, Send, Phone, Video, Info, 
  MoreVertical, CheckCheck, Clock,
  ChevronLeft, Paperclip, Smile, Image as ImageIcon
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

const activeChatId = ref(1)
const newMessage = ref('')
const mobileShowChat = ref(false)

const chats = [
  { 
    id: 1, 
    name: 'Secrétariat Auto-École', 
    avatar: '🏢', 
    lastMessage: 'Votre dossier a été validé par l\'ANTS !', 
    time: '10:24', 
    unread: 2,
    online: true 
  },
  { 
    id: 2, 
    name: 'Marc L. (Moniteur)', 
    avatar: '👨‍🏫', 
    lastMessage: 'On travaille les créneaux demain ?', 
    time: 'Hier', 
    unread: 0,
    online: false 
  },
  { 
    id: 3, 
    name: 'Sarah M. (Monitrice)', 
    avatar: '👩‍🏫', 
    lastMessage: 'Bravo pour ta dernière séance !', 
    time: 'Lun', 
    unread: 0,
    online: true 
  },
]

const messages = ref([
  { id: 1, text: 'Bonjour ! Auriez-vous des nouvelles pour mon code NEPH ?', time: '09:00', sender: 'me' },
  { id: 2, text: 'Bonjour Yacine ! Oui, nous venons de recevoir la confirmation.', time: '10:15', sender: 'them' },
  { id: 3, text: 'Votre dossier a été validé par l\'ANTS ! Vous pouvez maintenant réserver votre examen de code.', time: '10:24', sender: 'them' },
])

const activeChat = computed(() => chats.find(c => c.id === activeChatId.value))

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  messages.value.push({
    id: Date.now(),
    text: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    sender: 'me'
  })
  newMessage.value = ''
}
</script>

<template>
  <LayoutDashboardLayout
    page-title="Messages"
    page-subtitle="Communiquez avec votre auto-école en temps réel."
    :user="user"
  >
    <div class="h-[calc(100vh-280px)] md:h-[calc(100vh-200px)] flex bg-white rounded-xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-700">
      
      <!-- ELITE CHAT SIDEBAR -->
      <aside 
        class="w-full md:w-[380px] border-r border-slate-100 flex flex-col bg-white"
        :class="{'hidden md:flex': mobileShowChat}"
      >
        <div class="p-8">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Discussions</h2>
            <div class="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
              <MessageCircle :size="18" />
            </div>
          </div>
          
          <div class="relative group">
            <Search :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="RECHERCHER..." 
              class="w-full bg-slate-50 border border-slate-100 rounded-lg py-3.5 pl-11 pr-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-sm"
            />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-4 space-y-1 pb-8 scrollbar-hide">
          <div 
            v-for="chat in chats" 
            :key="chat.id"
            @click="activeChatId = chat.id; mobileShowChat = true"
            class="group p-4 rounded-xl cursor-pointer transition-all flex items-center gap-4 border"
            :class="activeChatId === chat.id ? 'bg-slate-50 border-indigo-100 shadow-sm' : 'bg-white border-transparent hover:bg-slate-50'"
          >
            <div class="relative shrink-0">
              <div class="w-14 h-14 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-2xl shadow-sm group-hover:border-indigo-200 transition-all">
                {{ chat.avatar }}
              </div>
              <div v-if="chat.online" class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center mb-1">
                <h3 class="font-black text-[11px] uppercase truncate" :class="activeChatId === chat.id ? 'text-indigo-600' : 'text-slate-900'">{{ chat.name }}</h3>
                <span class="text-[8px] font-black text-slate-300 uppercase">{{ chat.time }}</span>
              </div>
              <p class="text-[10px] font-bold truncate italic" :class="activeChatId === chat.id ? 'text-slate-600' : 'text-slate-400'">
                {{ chat.lastMessage }}
              </p>
            </div>

            <div v-if="chat.unread > 0 && activeChatId !== chat.id" class="w-5 h-5 rounded-lg bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center shadow-lg shadow-indigo-100">
              {{ chat.unread }}
            </div>
          </div>
        </div>
      </aside>

      <!-- CHAT CONTENT (Messages area) -->
      <main 
        class="flex-1 flex flex-col bg-white overflow-hidden relative"
        :class="{'hidden': !mobileShowChat}"
      >
        <!-- Chat Header -->
        <header v-if="activeChat" class="h-24 px-8 border-b border-slate-50 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button @click="mobileShowChat = false" class="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-50">
              <ChevronLeft :size="20" />
            </button>
            <div class="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-xl shadow-inner border border-slate-100">
              {{ activeChat.avatar }}
            </div>
            <div>
              <h3 class="font-black text-sm uppercase text-slate-900 leading-none">{{ activeChat.name }}</h3>
              <p class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1 italic">{{ activeChat.online ? 'En ligne' : 'Inactif' }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button class="w-11 h-11 rounded-lg flex items-center justify-center text-slate-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all">
              <MoreVertical :size="18" />
            </button>
          </div>
        </header>

        <!-- Messages Area : ELITE FLASH STYLE -->
        <div class="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide bg-slate-50/30">
          <div v-for="msg in messages" :key="msg.id" class="flex" :class="msg.sender === 'me' ? 'justify-end' : 'justify-start'">
            <div 
              class="max-w-[80%] md:max-w-[55%] relative group/msg"
              :class="msg.sender === 'me' ? 'items-end' : 'items-start'"
            >
              <div 
                class="p-5 rounded-2xl shadow-sm transition-all duration-500"
                :class="msg.sender === 'me' ? 'bg-white border border-indigo-100 text-slate-900 rounded-tr-none' : 'bg-white border border-slate-100 text-slate-900 rounded-tl-none'"
              >
                <p class="text-xs font-medium leading-relaxed tracking-tight">{{ msg.text }}</p>
              </div>
              <div class="flex items-center gap-2 mt-2 px-1" :class="msg.sender === 'me' ? 'justify-end' : 'justify-start'">
                <span class="text-[8px] font-black uppercase tracking-widest text-slate-300">{{ msg.time }}</span>
                <div v-if="msg.sender === 'me'" class="flex items-center gap-0.5 text-indigo-500">
                   <iconify-icon icon="solar:check-read-bold" width="10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Input : ELITE FLOATING STYLE -->
        <footer class="p-8 bg-white border-t border-slate-100">
          <form @submit.prevent="sendMessage" class="relative group max-w-4xl mx-auto">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button type="button" class="w-10 h-10 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center"><Paperclip :size="18" /></button>
            </div>
            
            <input 
              v-model="newMessage"
              type="text" 
              placeholder="ÉCRIRE UN MESSAGE..." 
              class="w-full bg-slate-50 border border-slate-100 rounded-xl py-4.5 pl-16 pr-16 text-[10px] font-black uppercase tracking-widest shadow-sm outline-none focus:border-indigo-400 focus:bg-white transition-all"
            />
            
            <button 
              type="submit"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-95 group/send"
            >
              <iconify-icon icon="solar:plain-bold" width="18" class="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </form>
        </footer>
      </main>

    </div>
  </LayoutDashboardLayout>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.animate-in { animation-duration: 0.8s; }
</style>
