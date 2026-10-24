<script setup lang="ts">
// PROTOTYPE: three visual directions (A Notebook, B Studio, C Ledger) for the same settled
// layouts, switchable via ?dir=, ?screen= and ?vp= and the floating bar. ← / → cycle directions.
// On Home, ?todo=1|2|3 switches between three designs of the unified To do section.
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { DIRECTIONS, DIR_KEYS, type DirKey } from '~/prototype-visual/tokens'
import { SCREENS, type ScreenKey } from '~/prototype-visual/screens'

const isDev = import.meta.dev
const route = useRoute()
const router = useRouter()

const dir = computed(() => (route.query.dir as DirKey) || 'B')
const screen = computed(() => (route.query.screen as ScreenKey) || 'home')
const todo = computed(() => (route.query.todo as string) || '1')
const TODO_VARIANTS = [
  { key: '1', name: 'Grouped' },
  { key: '2', name: 'Filter rail' },
  { key: '3', name: 'Triage lanes' },
]
function cycleTodo(step: number) {
  const i = TODO_VARIANTS.findIndex((v) => v.key === todo.value)
  set({ todo: TODO_VARIANTS[(i + step + 3) % 3]!.key })
}
const vp = computed(() => (route.query.vp as 'desktop' | 'phone') || 'desktop')
const set = (q: Record<string, string>) => router.replace({ query: { ...route.query, ...q } })

function cycle(step: number) {
  const i = DIR_KEYS.indexOf(dir.value)
  set({ dir: DIR_KEYS[(i + step + DIR_KEYS.length) % DIR_KEYS.length]! })
}

const frame = ref<HTMLIFrameElement>()
const initialSrc = `/prototype/visual/frame?dir=${dir.value}&screen=${screen.value}&todo=${todo.value}`
watch([dir, screen, todo], () => {
  frame.value?.contentWindow?.postMessage({ type: 'proto-state', query: { dir: dir.value, screen: screen.value, todo: todo.value } }, location.origin)
})

// Fit the 1440 px desktop frame into the window by scaling it down.
const win = ref({ w: 1440, h: 900 })
const width = computed(() => (vp.value === 'phone' ? 390 : 1440))
const scale = computed(() => Math.min(1, (win.value.w - 32) / width.value))
const height = computed(() => (vp.value === 'phone' ? 844 : Math.round((win.value.h - 96) / scale.value)))
const resize = () => (win.value = { w: window.innerWidth, h: window.innerHeight })

function onKey(e: KeyboardEvent) {
  if ((e.target as HTMLElement).closest('input, textarea, [contenteditable]')) return
  if (e.key === 'ArrowLeft') cycle(-1)
  if (e.key === 'ArrowRight') cycle(1)
}
function onMessage(e: MessageEvent) {
  if (e.origin === location.origin && e.data?.type === 'proto-key') cycle(e.data.key === 'ArrowLeft' ? -1 : 1)
}
onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('keydown', onKey)
  window.addEventListener('message', onMessage)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('message', onMessage)
})
</script>

<template>
  <div class="proto-stage">
    <div class="proto-frame-wrap" :style="{ width: `${width * scale}px`, height: `${height * scale}px` }">
      <iframe
        ref="frame"
        :src="initialSrc"
        title="Prototype screen"
        :class="['proto-frame', vp]"
        :style="{ width: `${width}px`, height: `${height}px`, transform: `scale(${scale})` }"
      />
    </div>

    <!-- Floating switcher: deliberately not styled with the design tokens. -->
    <div v-if="isDev" class="proto-bar" role="toolbar" aria-label="Prototype controls">
      <button aria-label="Previous direction" @click="cycle(-1)">←</button>
      <span class="proto-label">{{ dir }} · {{ DIRECTIONS[dir].name }}</span>
      <button aria-label="Next direction" @click="cycle(1)">→</button>
      <span class="proto-sep" />
      <select :value="screen" aria-label="Screen" @change="set({ screen: ($event.target as HTMLSelectElement).value })">
        <option v-for="s in SCREENS" :key="s.key" :value="s.key">{{ s.label }}</option>
      </select>
      <template v-if="screen === 'home'">
        <span class="proto-sep" />
        <button aria-label="Previous To do design" @click="cycleTodo(-1)">‹</button>
        <span class="proto-label">To do {{ todo }} · {{ TODO_VARIANTS.find((v) => v.key === todo)?.name }}</span>
        <button aria-label="Next To do design" @click="cycleTodo(1)">›</button>
      </template>
      <span class="proto-sep" />
      <button :class="{ on: vp === 'desktop' }" @click="set({ vp: 'desktop' })">1440</button>
      <button :class="{ on: vp === 'phone' }" @click="set({ vp: 'phone' })">390</button>
      <span class="proto-sep" />
      <a :href="`/prototype/visual/frame?dir=${dir}&screen=${screen}&todo=${todo}`" target="_blank" title="Open the frame on its own">↗</a>
    </div>
  </div>
</template>

<style scoped>
.proto-stage { min-height: 100dvh; background: #d9d9d6; display: flex; justify-content: center; padding: 16px 16px 80px; }
.proto-frame-wrap { position: relative; }
.proto-frame { position: absolute; top: 0; left: 0; transform-origin: top left; border: 0; background: white; box-shadow: 0 2px 12px rgb(0 0 0 / 0.15); }
.proto-frame.phone { border-radius: 28px; outline: 8px solid #222; }
.proto-bar { position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%); z-index: 100; display: flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px; background: #111; color: #fff; font: 500 13px/1 ui-monospace, SFMono-Regular, Menlo, monospace; box-shadow: 0 6px 24px rgb(0 0 0 / 0.35); white-space: nowrap; }
.proto-bar button, .proto-bar a, .proto-bar select { color: #fff; background: transparent; border: 1px solid #444; border-radius: 999px; padding: 6px 10px; font: inherit; cursor: pointer; text-decoration: none; }
.proto-bar select option { color: #111; }
.proto-bar button.on { background: #fff; color: #111; }
.proto-bar button:hover, .proto-bar a:hover { border-color: #aaa; }
.proto-label { min-width: 120px; text-align: center; }
.proto-sep { width: 1px; height: 20px; background: #444; }
</style>
