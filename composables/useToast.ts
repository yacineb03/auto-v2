interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

export const useToast = () => {
  const toasts = useState('toasts', () => [] as Toast[])

  const show = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substring(7)

    toasts.value.push({
      id,
      type,
      message,
      duration
    })

    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }
  }

  const remove = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const success = (message: string, duration?: number) => {
    show(message, 'success', duration)
  }

  const error = (message: string, duration?: number) => {
    show(message, 'error', duration)
  }

  const warning = (message: string, duration?: number) => {
    show(message, 'warning', duration)
  }

  const info = (message: string, duration?: number) => {
    show(message, 'info', duration)
  }

  return {
    toasts,
    show,
    remove,
    success,
    error,
    warning,
    info
  }
}
