<script setup lang="ts">
const name = ref('')
const email = ref('')

const { status, errorMessage, subscribe } = useKitSubscribe()

const submit = () => {
  if (email.value.trim()) subscribe(email.value.trim(), name.value.trim())
}
</script>

<template>
  <div class="ea-strip">
    <div class="ea-inner">
      <div class="ea-left">
        <div class="ea-eyebrow">// early access</div>
        <h3 class="ea-h3">Get early access to Ampliterm.</h3>
        <p class="ea-sub">Be first in line when the terminal launches. We'll email you early access pricing and release details — no noise, no spam, unsubscribe anytime.</p>
      </div>
      <div class="ea-right">
        <template v-if="status !== 'success'">
          <div class="ea-form">
            <div class="ea-row">
              <input
                v-model="name"
                class="ea-input ea-input-name"
                type="text"
                placeholder="Your name"
                autocomplete="name"
                :disabled="status === 'submitting'"
                @keydown.enter="submit"
              />
              <input
                v-model="email"
                class="ea-input"
                type="email"
                placeholder="trader@example.com"
                autocomplete="email"
                :disabled="status === 'submitting'"
                @keydown.enter="submit"
              />
              <button class="ea-btn" :disabled="status === 'submitting'" @click="submit">
                {{ status === 'submitting' ? 'Sending…' : 'Request access' }}
              </button>
            </div>
            <div v-if="status === 'error'" class="ea-error">// {{ errorMessage }}</div>
          </div>
        </template>
        <div v-else class="ea-thanks">// You're on the list. Check your email to confirm.</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ea-strip {
  border-top: 1px solid var(--border-0);
  border-bottom: 1px solid var(--border-0);
  background: var(--bg-1);
}
.ea-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 48px 40px;
  display: flex;
  align-items: center;
  gap: 60px;
}
.ea-left { flex: 1; }
.ea-eyebrow {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 10px;
}
.ea-h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-0);
  margin-bottom: 8px;
  line-height: 1.2;
}
.ea-sub {
  font-size: 12px;
  color: var(--text-1);
  line-height: 1.7;
}
.ea-right {
  display: flex;
  flex-shrink: 0;
}
.ea-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.ea-row {
  display: flex;
}
.ea-error {
  font-size: 10px;
  font-weight: 600;
  color: var(--red);
  letter-spacing: 0.06em;
}
.ea-input {
  background: var(--bg-0);
  border: 1px solid var(--border-2);
  border-right: none;
  color: var(--text-0);
  font-family: var(--font);
  font-size: 12px;
  padding: 10px 16px;
  outline: none;
  width: 280px;
  transition: border-color 0.1s;
}
.ea-input-name { width: 180px; }
.ea-input:focus { border-color: var(--cyan); }
.ea-input::placeholder { color: var(--text-2); }
.ea-btn {
  padding: 10px 20px;
  font-family: var(--font);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--green);
  color: #000;
  border: none;
  cursor: pointer;
  transition: background 0.1s;
  white-space: nowrap;
}
.ea-btn:hover { background: #33ff88; }
.ea-btn:disabled { opacity: 0.6; cursor: default; }
.ea-btn:disabled:hover { background: var(--green); }
.ea-thanks {
  font-size: 11px;
  font-weight: 600;
  color: var(--green);
  letter-spacing: 0.06em;
  padding: 10px 0;
}

@media (max-width: 960px) {
  .ea-inner {
    flex-direction: column;
    gap: 28px;
    padding: 40px 20px;
  }
  .ea-right { width: 100%; }
  .ea-row { flex-direction: column; }
  .ea-input {
    width: 100%;
    min-width: 0;
    border-right: 1px solid var(--border-2);
    border-bottom: none;
  }
  .ea-btn { width: 100%; }
}
</style>
