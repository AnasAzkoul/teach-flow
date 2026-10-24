<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight, TriangleAlert, CalendarX, MapPin, Clock } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import AppShell from './AppShell.vue'
import WsDot from './WsDot.vue'
import { weekDays, weekLessons, workspaces, ws, fmt, now, type WeekLesson } from '~/prototype-visual/data'

defineProps<{ dark?: boolean }>()

const START = 8 * 60
const END = 21 * 60
const HOUR = 56 // px per hour
const hours = Array.from({ length: (END - START) / 60 }, (_, i) => START + i * 60)
const top = (m: number) => ((m - START) / 60) * HOUR

// Side-by-side placement for the clashing pair.
function lane(l: WeekLesson) {
  if (!l.clash) return { left: '2px', right: '2px' }
  const pair = weekLessons.filter((o) => o.clash && o.day === l.day).sort((a, b) => a.start - b.start)
  return pair[0]!.id === l.id ? { left: '2px', right: '50%' } : { left: '50%', right: '2px' }
}

// "No plan" mark: a clock in the workspace text colour, no fill; only on lessons still to come.
const noPlan = (l: WeekLesson) => l.noPlan && !l.cancelled && (l.day > now.dayIndex || (l.day === now.dayIndex && l.start > now.minutes))

const selectedDay = ref(now.dayIndex)
const dayLessons = computed(() => weekLessons.filter((l) => l.day === selectedDay.value).sort((a, b) => a.start - b.start))
</script>

<template>
  <div :data-theme="dark ? 'dark' : undefined" class="bg-page">
    <AppShell active="week">
      <div class="flex flex-col gap-4 px-4 py-5 md:px-8 md:py-6">
        <header class="flex flex-wrap items-center gap-3">
          <h1 class="page-title mr-auto">My week</h1>
          <div class="hidden flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted lg:flex">
            <span v-for="w in workspaces" :key="w.id" class="flex items-center gap-1.5"><WsDot :colour="w.slot" />{{ w.name }}</span>
          </div>
          <div class="flex items-center gap-1">
            <Button variant="outline" size="icon-sm" aria-label="Previous week"><ChevronLeft /></Button>
            <Button variant="outline" size="sm">Today</Button>
            <Button variant="outline" size="icon-sm" aria-label="Next week"><ChevronRight /></Button>
          </div>
          <p class="tnum w-full text-sm text-muted md:w-auto">19–25 October 2026</p>
        </header>

        <!-- Desktop: time grid -->
        <div class="tf-card hidden overflow-hidden md:block">
          <div class="grid grid-cols-[56px_repeat(7,1fr)] border-b border-hairline">
            <div />
            <div
              v-for="(d, i) in weekDays" :key="d"
              :class="['border-l border-hairline px-2 py-2 text-sm', i === now.dayIndex ? 'font-semibold text-ink' : 'text-muted']"
            >
              <span class="tnum">{{ d }}</span>
              <span v-if="i === now.dayIndex" class="ml-1.5 rounded-control bg-ink px-1.5 py-0.5 text-xs font-medium text-surface">Today</span>
            </div>
          </div>
          <div class="relative grid grid-cols-[56px_repeat(7,1fr)]" :style="{ height: `${hours.length * HOUR}px` }">
            <div class="relative">
              <span v-for="h in hours" :key="h" class="tnum absolute right-2 -translate-y-2 text-xs text-muted" :style="{ top: `${top(h)}px` }">{{ h === START ? '' : fmt(h) }}</span>
            </div>
            <div v-for="(d, i) in weekDays" :key="d" :class="['relative border-l border-hairline', i >= 5 ? 'bg-sunken/50' : '']">
              <div v-for="h in hours" :key="h" class="absolute inset-x-0 border-t border-hairline/70" :style="{ top: `${top(h)}px` }" />
              <!-- now line -->
              <div v-if="i === now.dayIndex" class="absolute inset-x-0 z-10 flex items-center" :style="{ top: `${top(now.minutes)}px` }">
                <span class="-ml-1 size-2 rounded-full bg-ink" /><span class="h-px flex-1 bg-ink" />
              </div>
              <a
                v-for="l in weekLessons.filter((x) => x.day === i)" :key="l.id" href="#"
                :class="[
                  `ws-${ws(l.ws).slot}`,
                  'absolute flex flex-col overflow-hidden rounded-[calc(var(--r-control)+1px)] border-l-[3px] px-1.5 py-1 text-xs leading-4 transition-[filter] hover:brightness-[0.97]',
                  l.cancelled ? 'border-field bg-sunken text-muted' : 'border-ws-dot bg-ws-tint text-ws-text',
                  l.clash ? 'outline-2 outline-danger -outline-offset-1 z-[5]' : '',
                ]"
                :style="{ top: `${top(l.start) + 1}px`, height: `${top(l.end) - top(l.start) - 2}px`, ...lane(l) }"
              >
                <span class="flex items-center gap-1">
                  <span class="tnum font-medium" :class="l.cancelled && 'line-through'">{{ fmt(l.start) }}–{{ fmt(l.end) }}</span>
                  <Clock v-if="noPlan(l)" class="ml-auto size-3.5 shrink-0 stroke-[1.75]" role="img" aria-label="No plan" />
                </span>
                <span class="truncate text-[13px] font-semibold leading-[18px]" :class="l.cancelled && 'line-through'">{{ l.klass }}</span>
                <span v-if="l.cancelled" class="flex items-center gap-1 font-medium"><CalendarX class="size-3.5 stroke-[1.5]" />Cancelled · {{ ws(l.ws).name }}</span>
                <span v-else class="truncate">{{ ws(l.ws).name }} · {{ l.place }}</span>
                <span v-if="l.clash" class="mt-auto flex items-center gap-1 font-semibold text-danger"><TriangleAlert class="size-3.5 stroke-[1.75]" />Clash</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Phone: day list -->
        <div class="md:hidden">
          <div class="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2" role="tablist" aria-label="Day">
            <button
              v-for="(d, i) in weekDays" :key="d" role="tab" :aria-selected="selectedDay === i"
              :class="['flex h-14 min-w-12 flex-1 flex-col items-center justify-center rounded-control text-xs', selectedDay === i ? 'bg-accent text-accent-on' : 'text-muted hover:bg-sunken', i === now.dayIndex && selectedDay !== i ? 'font-semibold text-ink' : '']"
              @click="selectedDay = i"
            >
              <span>{{ d.split(' ')[0] }}</span><span class="tnum text-base font-semibold">{{ d.split(' ')[1] }}</span>
            </button>
          </div>
          <p class="mt-2 text-sm font-semibold">{{ selectedDay === now.dayIndex ? 'Today' : weekDays[selectedDay] }} <span class="font-normal text-muted">· {{ dayLessons.length }} lessons</span></p>
          <ul class="mt-2 flex flex-col gap-2">
            <li v-for="l in dayLessons" :key="l.id">
              <a
                href="#"
                :class="[
                  `ws-${ws(l.ws).slot}`,
                  'flex min-h-16 gap-3 rounded-card border-l-4 px-3 py-2.5',
                  l.cancelled ? 'border-field bg-sunken text-muted' : 'border-ws-dot bg-ws-tint text-ws-text',
                  l.clash ? 'outline-2 outline-danger -outline-offset-1' : '',
                ]"
              >
                <span class="tnum w-12 text-sm font-semibold" :class="l.cancelled && 'line-through'">{{ fmt(l.start) }}<br><span class="font-normal">{{ fmt(l.end) }}</span></span>
                <span class="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span class="text-base font-semibold leading-6" :class="l.cancelled && 'line-through'">{{ l.klass }}</span>
                  <span class="flex items-center gap-1 text-sm"><MapPin class="size-3.5 stroke-[1.5]" />{{ ws(l.ws).name }} · {{ l.place }}</span>
                  <span v-if="l.clash" class="flex items-center gap-1 text-sm font-semibold text-danger"><TriangleAlert class="size-4 stroke-[1.75]" />Clash with another lesson</span>
                  <span v-if="l.cancelled" class="flex items-center gap-1 text-sm font-medium"><CalendarX class="size-4 stroke-[1.5]" />Cancelled by student</span>
                  <span v-if="noPlan(l)" class="flex items-center gap-1 text-sm"><Clock class="size-4 stroke-[1.5]" />No plan</span>
                </span>
              </a>
            </li>
            <li v-if="!dayLessons.length" class="py-8 text-center text-sm text-muted">No lessons this day</li>
          </ul>
        </div>
      </div>
    </AppShell>
  </div>
</template>
