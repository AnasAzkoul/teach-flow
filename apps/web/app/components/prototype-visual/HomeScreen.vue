<script setup lang="ts">
// Home: Today, then To do. The To do section has three candidate designs (?todo=1|2|3); the red
// Needs a substitute strip and the team Reports overdue block are folded into it as team items.
// Coming up is gone: My week covers the days ahead.
import { ref, computed } from 'vue'
import { Paperclip, Video, FileText, MapPin, ChevronRight, Check } from '@lucide/vue'
import TodoGrouped from './TodoGrouped.vue'
import TodoRail from './TodoRail.vue'
import TodoLanes from './TodoLanes.vue'
import { todoItems, isNudge, type TodoFilter } from '~/prototype-visual/todo'
import { Button } from '@/components/ui/button'
import AppShell from './AppShell.vue'
import WsDot from './WsDot.vue'
import { now, today, ws, eveningNow, todayDoneStatus, nextLesson, type TodayState } from '~/prototype-visual/data'

const props = defineProps<{ todo: '1' | '2' | '3'; todayState?: TodayState }>()
const state = computed(() => props.todayState ?? 'busy')
const filter = ref<TodoFilter>({ urgency: 'all', type: 'all', scope: 'all' })
const subs = todoItems.filter((i) => i.type === 'substitute').length
const overdue = todoItems.filter((i) => i.type === 'overdue' && !isNudge(i)).length
function jump(type: TodoFilter['type']) {
  filter.value = { urgency: 'all', type, scope: 'all' }
  document.getElementById('todo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const actionIcon = { 'Attach plan': Paperclip, 'Open plan': FileText, 'Join meeting': Video, 'Write report': FileText, 'Finish report': FileText }
</script>

<template>
  <AppShell active="home">
    <div class="mx-auto flex max-w-[1120px] flex-col gap-8 px-4 py-6 md:px-8 md:py-8">
      <header>
        <p class="tnum text-sm text-muted">{{ now.day }} · {{ state === 'done' ? eveningNow.time : now.time }}</p>
        <h1 class="page-title">{{ state === 'done' ? 'Good evening' : 'Good morning' }}, Maya</h1>
        <!-- variant 1 only: a quiet pointer to the urgent team items, no fill -->
        <p v-if="todo === '1'" class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <button class="inline-flex min-h-11 items-center gap-1.5 font-medium text-danger hover:underline md:min-h-0" @click="jump('substitute')">
            <span class="size-1.5 rounded-full bg-danger" aria-hidden="true" />{{ subs }} lessons need a substitute<ChevronRight class="size-4 stroke-[1.5]" />
          </button>
          <button class="inline-flex min-h-11 items-center gap-1.5 font-medium text-danger hover:underline md:min-h-0" @click="jump('overdue')">
            <span class="size-1.5 rounded-full bg-danger" aria-hidden="true" />{{ overdue }} {{ overdue === 1 ? 'report' : 'reports' }} overdue<ChevronRight class="size-4 stroke-[1.5]" />
          </button>
        </p>
      </header>

      <!-- Today -->
      <section aria-labelledby="today-title" class="flex flex-col gap-3">
        <h2 id="today-title" class="section-title">Today</h2>
        <p v-if="state === 'none'" class="text-sm text-muted">No lessons today.</p>
        <div v-else class="grid gap-(--block-gap) md:grid-cols-3">
          <article v-for="c in today" :key="c.id" class="tf-card flex flex-col gap-3 p-(--card-pad) hover:border-field transition-colors">
            <a href="#" class="flex flex-col gap-1 outline-none">
              <span class="tnum text-sm font-semibold">{{ c.start }}–{{ c.end }}</span>
              <span class="text-lg font-semibold leading-6">{{ c.klass }}</span>
              <span class="flex items-center gap-1.5 text-sm text-muted"><WsDot :colour="ws(c.ws).slot" />{{ ws(c.ws).name }}</span>
              <span class="flex items-center gap-1.5 text-sm text-muted"><MapPin class="size-4 stroke-[1.5]" />{{ c.place }}</span>
            </a>
            <!-- all done: no main button, just the report state -->
            <div v-if="state === 'done'" class="mt-auto flex min-h-8 items-center gap-1.5 border-t border-hairline pt-3 text-xs text-muted">
              <Check class="size-4 stroke-[1.75] text-success" />{{ todayDoneStatus[c.id] }}
            </div>
            <div v-else class="mt-auto flex items-center justify-between gap-3 border-t border-hairline pt-3">
              <span :class="['text-xs', c.action === 'Attach plan' ? 'text-warning font-medium' : 'text-muted']">{{ c.status }}</span>
              <Button size="sm" :variant="c.action === 'Finish report' ? 'outline' : 'default'">
                <component :is="actionIcon[c.action]" />{{ c.action }}
              </Button>
            </div>
          </article>
        </div>
        <!-- only when Today has nothing left to do: one line to the next lesson -->
        <a v-if="state !== 'busy'" href="#" class="group inline-flex min-h-11 items-center gap-1.5 self-start text-sm md:min-h-0">
          <span class="text-muted">Next:</span>
          <span class="tnum font-medium text-ink group-hover:underline">{{ nextLesson.day }}, {{ nextLesson.time }} · {{ nextLesson.klass }}</span>
          <ChevronRight class="size-4 stroke-[1.5] text-muted" />
        </a>
      </section>

      <TodoGrouped v-if="todo === '1'" v-model:filter="filter" />
      <TodoRail v-else-if="todo === '2'" v-model:filter="filter" />
      <TodoLanes v-else v-model:filter="filter" />

    </div>
  </AppShell>
</template>
