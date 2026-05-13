<script setup lang="ts">
const email = ref('')
const submitted = ref(false)

const submit = () => {
  if (email.value.trim()) submitted.value = true
}
</script>

<template>
  <div class="newsletter-strip">
    <div class="newsletter-inner">
      <div class="nl-left">
        <div class="nl-eyebrow">// weekly dispatch</div>
        <h3 class="nl-h3">Research notes, delivered weekly.</h3>
        <p class="nl-sub">One email per week. Strategy breakdowns, platform updates, and the trade setups we're watching. No noise, no upsells — just signal.</p>
      </div>
      <div class="nl-right">
        <template v-if="!submitted">
          <input
            v-model="email"
            class="nl-input"
            type="email"
            placeholder="trader@example.com"
            @keydown.enter="submit"
          />
          <button class="nl-btn" @click="submit">Subscribe</button>
        </template>
        <div v-else class="nl-thanks">// Subscribed. Watch for the weekly dispatch.</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.newsletter-strip {
  border-top: 1px solid var(--border-0);
  border-bottom: 1px solid var(--border-0);
  background: var(--bg-1);
}
.newsletter-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 48px 40px;
  display: flex;
  align-items: center;
  gap: 60px;
}
.nl-left { flex: 1; }
.nl-eyebrow {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 10px;
}
.nl-h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-0);
  margin-bottom: 8px;
  line-height: 1.2;
}
.nl-sub {
  font-size: 12px;
  color: var(--text-1);
  line-height: 1.7;
}
.nl-right {
  display: flex;
  flex-shrink: 0;
}
.nl-input {
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
.nl-input:focus { border-color: var(--cyan); }
.nl-input::placeholder { color: var(--text-2); }
.nl-btn {
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
.nl-btn:hover { background: #33ff88; }
.nl-thanks {
  font-size: 11px;
  font-weight: 600;
  color: var(--green);
  letter-spacing: 0.06em;
  padding: 10px 0;
}

@media (max-width: 960px) {
  .newsletter-inner {
    flex-direction: column;
    gap: 28px;
    padding: 40px 20px;
  }
  .nl-right { width: 100%; }
  .nl-input { flex: 1; min-width: 0; }
}
</style>
