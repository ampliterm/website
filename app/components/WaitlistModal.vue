<script setup lang="ts">
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const name = ref('')
const email = ref('')

function handleSubmit() {
  // wiring up later
}

function handleBackdrop(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('close')
}

onMounted(() => {
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') emit('close') }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="props.open" class="backdrop" @click="handleBackdrop">
        <div class="modal" role="dialog" aria-modal="true" aria-label="Join the waitlist">
          <!-- header -->
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="modal-eyebrow">Early access</span>
              <h2 class="modal-title">Join the waitlist</h2>
            </div>
            <button class="close-btn" @click="emit('close')" aria-label="Close">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" stroke-width="1.5"/>
                <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </button>
          </div>

          <p class="modal-sub">
            Be first in line when Ampliterm launches. We'll notify you with early access pricing and release details.
          </p>

          <!-- form -->
          <form class="modal-form" @submit.prevent="handleSubmit">
            <div class="field">
              <label class="field-label" for="wl-name">Name</label>
              <input
                id="wl-name"
                v-model="name"
                class="field-input"
                type="text"
                placeholder="Your name"
                autocomplete="name"
                required
              >
            </div>

            <div class="field">
              <label class="field-label" for="wl-email">Email</label>
              <input
                id="wl-email"
                v-model="email"
                class="field-input"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
                required
              >
            </div>

            <button type="submit" class="submit-btn">
              Request early access
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
              </svg>
            </button>
          </form>

          <!-- footer note -->
          <div class="modal-footer">
            <span class="footer-note">One-time payment &nbsp;·&nbsp; No spam &nbsp;·&nbsp; Unsubscribe anytime</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal {
  width: 100%;
  max-width: 440px;
  background: var(--bg-1);
  border: 1px solid var(--border-1);
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ── header ── */
.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.modal-title-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.modal-eyebrow {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--green);
  display: flex;
  align-items: center;
  gap: 6px;
}

.modal-eyebrow::before {
  content: '';
  width: 12px;
  height: 1px;
  background: var(--green);
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-0);
  letter-spacing: -0.01em;
  margin: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--bg-3);
  border: 1px solid var(--border-1);
  color: var(--text-2);
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.15s, border-color 0.15s;
}

.close-btn:hover {
  color: var(--text-0);
  border-color: var(--border-2);
}

/* ── sub ── */
.modal-sub {
  font-size: 12px;
  color: var(--text-1);
  line-height: 1.7;
  margin: 0;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--border-0);
}

/* ── form ── */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-2);
}

.field-input {
  font-family: var(--font);
  font-size: 12px;
  color: var(--text-0);
  background: var(--bg-2);
  border: 1px solid var(--border-1);
  padding: 10px 12px;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
  box-sizing: border-box;
}

.field-input::placeholder {
  color: var(--text-3);
}

.field-input:focus {
  border-color: var(--cyan);
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 20px;
  font-family: var(--font);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--green);
  color: #000;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
  margin-top: 4px;
}

.submit-btn:hover {
  background: #33ff88;
}

/* ── footer ── */
.modal-footer {
  border-top: 1px solid var(--border-0);
  padding-top: 4px;
}

.footer-note {
  font-size: 10px;
  color: var(--text-2);
  letter-spacing: 0.04em;
}

/* ── transition ── */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.18s ease;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.18s ease, opacity 0.18s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: translateY(12px);
  opacity: 0;
}
</style>
