<script setup lang="ts">
// PROTOTYPE. Renders one screen in one direction. Loaded inside the switcher's iframe so that
// the phone width is a real 390 px viewport (media queries and all), but it also works on its own:
// /prototype/visual/frame?dir=B&screen=home
import { computed, onMounted, onBeforeUnmount } from 'vue'
import HomeScreen from '~/components/prototype-visual/HomeScreen.vue'
import LessonScreen from '~/components/prototype-visual/LessonScreen.vue'
import WeekScreen from '~/components/prototype-visual/WeekScreen.vue'
import ContrastScreen from '~/components/prototype-visual/ContrastScreen.vue'
import type { DirKey } from '~/prototype-visual/tokens'
import type { ScreenKey } from '~/prototype-visual/screens'

const route = useRoute()
const router = useRouter()
const dir = computed(() => (route.query.dir as DirKey) || 'B')
const screen = computed(() => (route.query.screen as ScreenKey) || 'home')

useHead({ htmlAttrs: { 'data-dir': dir } })

function onMessage(e: MessageEvent) {
  if (e.origin === location.origin && e.data?.type === 'proto-state') router.replace({ query: e.data.query })
}
function onKey(e: KeyboardEvent) {
  const el = e.target as HTMLElement
  if (el.closest('input, textarea, [contenteditable]')) return
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') window.parent.postMessage({ type: 'proto-key', key: e.key }, location.origin)
}
onMounted(() => {
  window.addEventListener('message', onMessage)
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <HomeScreen v-if="screen === 'home'" />
  <LessonScreen v-else-if="screen === 'lesson-plan'" key="plan" tab="plan" />
  <LessonScreen v-else-if="screen === 'lesson-report'" key="report" tab="report" />
  <WeekScreen v-else-if="screen === 'week'" key="week" />
  <WeekScreen v-else-if="screen === 'week-dark'" key="week-dark" dark />
  <ContrastScreen v-else-if="screen === 'contrast'" :dir="dir" />
</template>
