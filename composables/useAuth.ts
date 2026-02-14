export const useAuth = () => {
  const user = useState('user', () => null as any)
  const loading = useState('authLoading', () => false)

  const fetchUser = async () => {
    loading.value = true
    try {
      const response = await $fetch('/api/auth/me')
      user.value = response.user
      return response.user
    } catch (error) {
      user.value = null
      throw error
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })
    user.value = response.user
    return response
  }

  const register = async (data: any) => {
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: data
    })
    user.value = response.user
    return response
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    await navigateTo('/login')
  }

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.rank === 3)
  const isInstructor = computed(() => user.value?.rank === 2)
  const isStudent = computed(() => user.value?.rank === 1)

  return {
    user,
    loading,
    fetchUser,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    isInstructor,
    isStudent
  }
}
