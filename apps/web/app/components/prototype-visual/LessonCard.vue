<script setup lang="ts">
// PROTOTYPE. The My week lesson card: a popover on desktop, a bottom sheet on phone (WeekScreen
// decides which). Contents and the main-button rule are settled; see mainAction in data.ts.
import { computed } from 'vue'
import { Users, FileText, Clock, TriangleAlert, CalendarX, Video, Paperclip, CalendarClock, X, Undo2, Check, PencilLine } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import WsDot from './WsDot.vue'
import { weekDays, weekLessons, ws, fmt, started, mainAction, canMove, canCancel, type WeekLesson } from '~/prototype-visual/data'

const props = defineProps<{ lesson: WeekLesson; sheet?: boolean }>()
const l = computed(() => props.lesson)

const date = computed(() => `${weekDays[l.value.day]} Oct, ${fmt(l.value.start)}–${fmt(l.value.end)}`)
const main = computed(() => mainAction(l.value))
const mainIcon = { 'Join meeting': Video, 'Write report': FileText, 'Finish report': FileText, 'Attach plan': Paperclip }
const clashWith = computed(() =>
  l.value.clash ? weekLessons.find((o) => o.clash && o.day === l.value.day && o.id !== l.value.id) : undefined,
)
const report = computed(() => ({ none: 'No report yet', draft: 'Report draft', done: 'Report done' })[l.value.report])
const hasButtons = computed(() => (l.value.cancelled ? canCancel(l.value) : main.value || canMove(l.value) || canCancel(l.value)))
</script>

<template>
  <div :class="`ws-${ws(l.ws).slot}`" class="flex flex-col gap-3">
    <div class="flex flex-col gap-0.5" :class="sheet && 'pr-10'">
      <!-- the class name is the way to the Lesson page -->
      <a
        href="#"
        class="inline-flex min-h-11 items-center self-start text-lg font-semibold leading-6 text-ink underline-offset-3 hover:underline md:min-h-0"
        :class="l.cancelled && 'line-through decoration-muted'"
      >{{ l.klass }}</a>
      <p class="tnum text-sm text-muted">{{ date }}</p>
    </div>

    <ul class="flex flex-col gap-1.5 text-sm">
      <li class="flex items-center gap-2">
        <span class="flex size-4 items-center justify-center"><WsDot :colour="ws(l.ws).slot" size="md" /></span>
        <span>{{ ws(l.ws).name }} · {{ l.place }}</span>
      </li>
      <li class="flex items-center gap-2"><Users class="size-4 shrink-0 stroke-[1.5] text-muted" />{{ l.participants }} {{ l.participants === 1 ? 'participant' : 'participants' }}</li>
      <li v-if="l.plan" class="flex items-center gap-2"><FileText class="size-4 shrink-0 stroke-[1.5] text-muted" /><span class="truncate">{{ l.plan }}</span></li>
      <li v-else class="flex items-center gap-2 font-medium text-warning"><Clock class="size-4 shrink-0 stroke-[1.75]" />No plan</li>
      <li v-if="started(l) && !l.cancelled" class="flex items-center gap-2" :class="l.report === 'done' ? '' : 'font-medium'">
        <Check v-if="l.report === 'done'" class="size-4 shrink-0 stroke-[1.75] text-success" />
        <PencilLine v-else class="size-4 shrink-0 stroke-[1.5]" :class="l.report === 'none' ? 'text-warning' : 'text-muted'" />
        {{ report }}
      </li>
      <li v-if="clashWith" class="flex items-start gap-2 font-medium text-danger">
        <TriangleAlert class="mt-0.5 size-4 shrink-0 stroke-[1.75]" />
        <span>Clashes with {{ clashWith.klass }}, <span class="tnum">{{ fmt(clashWith.start) }}</span> · {{ ws(clashWith.ws).name }}</span>
      </li>
    </ul>

    <!-- cancelled: who and why, in place of the buttons -->
    <div v-if="l.cancelled" class="flex flex-col gap-0.5 rounded-control bg-sunken px-3 py-2 text-sm">
      <span class="flex items-center gap-2 font-medium"><CalendarX class="size-4 stroke-[1.5]" />Cancelled by {{ l.cancelled.by.toLowerCase() }}</span>
      <span class="pl-6 text-muted">{{ l.cancelled.reason }}</span>
    </div>

    <div v-if="hasButtons" class="flex flex-wrap gap-2 border-t border-hairline pt-3" :class="sheet && 'flex-col *:w-full'">
      <template v-if="l.cancelled">
        <Button size="sm" variant="outline"><Undo2 />Restore lesson</Button>
      </template>
      <template v-else>
        <Button v-if="main" size="sm" :variant="main === 'Finish report' ? 'outline' : 'default'">
          <component :is="mainIcon[main]" />{{ main }}
        </Button>
        <Button v-if="canMove(l)" size="sm" variant="outline"><CalendarClock />Move</Button>
        <Button v-if="canCancel(l)" size="sm" variant="danger-quiet"><X />Cancel lesson</Button>
      </template>
    </div>
  </div>
</template>
