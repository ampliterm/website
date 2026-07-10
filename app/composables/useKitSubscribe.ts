const KIT_FORM_ID = '9662012'
const KIT_FORM_URL = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`

export type KitSubscribeStatus = 'idle' | 'submitting' | 'success' | 'error'

export function useKitSubscribe() {
  const status = ref<KitSubscribeStatus>('idle')
  const errorMessage = ref('')

  async function subscribe(email: string, name?: string) {
    if (status.value === 'submitting') return

    status.value = 'submitting'
    errorMessage.value = ''

    const body = new FormData()
    body.append('email_address', email)
    if (name) body.append('fields[name]', name)

    try {
      const res = await fetch(KIT_FORM_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      })
      const data = await res.json().catch(() => null)

      if (res.ok && data?.status !== 'failed') {
        status.value = 'success'
      } else {
        status.value = 'error'
        errorMessage.value = data?.errors?.messages?.[0] ?? 'Something went wrong. Please try again.'
      }
    } catch {
      status.value = 'error'
      errorMessage.value = 'Could not reach the signup service. Please try again.'
    }
  }

  return { status, errorMessage, subscribe }
}
