<script setup lang="ts">
// Home. The To do section has three candidate designs (?todo=1|2|3); the red Needs a substitute strip
// and the team Reports overdue block are gone, folded into To do as team items.
import { ref, computed } from 'vue'
import { Paperclip, Video, FileText, MapPin, ArrowRight, Clock, ChevronRight } from '@lucide/vue'
import TodoGrouped from './TodoGrouped.vue'
import TodoRail from './TodoRail.vue'
import TodoLanes from './TodoLanes.vue'
import { todoItems, type TodoFilter } from '~/prototype-visual/todo'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import AppShell from './AppShell.vue'
import WsDot from './WsDot.vue'
import { now, today, comingUp, ws } from '~/prototype-visual/data'

const props = defineProps<{ todo: '1' | '2' | '3' }>()
const filter = ref<TodoFilter>({ urgency: 'all', type: 'all', scope: 'all' })
const subs = todoItems.filter((i) => i.type === 'substitute').length
const overdue = todoItems.filter((i) => i.type === 'overdue').length
function jump(type: TodoFilter['type']) {
  filter.value = { urgency: 'all', type, scope: 'all' }
  document.getElementById('todo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
const wide = computed(() => props.todo !== '1')

const actionIcon = { 'Attach plan': Paperclip, 'Open plan': FileText, 'Join meeting': Video, 'Write report': FileText, 'Finish report': FileText }
</script>

<template>
  <AppShell active="home">
    <div class="mx-auto flex max-w-[1120px] flex-col gap-8 px-4 py-6 md:px-8 md:py-8">
      <header>
        <p class="tnum text-sm text-muted">{{ now.day }} · {{ now.time }}</p>
        <h1 class="page-title">Good morning, Maya</h1>
        <!-- variant 1 only: a quiet pointer to the urgent team items, no fill -->
        <p v-if="todo === '1'" class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <button class="inline-flex min-h-11 items-center gap-1.5 font-medium text-danger hover:underline md:min-h-0" @click="jump('substitute')">
            <span class="size-1.5 rounded-full bg-danger" aria-hidden="true" />{{ subs }} lessons need a substitute<ChevronRight class="size-4 stroke-[1.5]" />
          </button>
          <button class="inline-flex min-h-11 items-center gap-1.5 font-medium text-danger hover:underline md:min-h-0" @click="jump('overdue')">
            <span class="size-1.5 rounded-full bg-danger" aria-hidden="true" />{{ overdue }} reports overdue<ChevronRight class="size-4 stroke-[1.5]" />
          </button>
        </p>
      </header>

      <!-- Today -->
      <section aria-labelledby="today-title" class="flex flex-col gap-3">
        <h2 id="today-title" class="section-title">Today</h2>
        <div class="grid gap-(--block-gap) md:grid-cols-3">
          <article v-for="c in today" :key="c.id" class="tf-card flex flex-col gap-3 p-(--card-pad) hover:border-field transition-colors">
            <a href="#" class="flex flex-col gap-1 outline-none">
              <span class="tnum text-sm font-semibold">{{ c.start }}–{{ c.end }}</span>
              <span class="text-lg font-semibold leading-6">{{ c.klass }}</span>
              <span class="flex items-center gap-1.5 text-sm text-muted"><WsDot :colour="ws(c.ws).slot" />{{ ws(c.ws).name }}</span>
              <span class="flex items-center gap-1.5 text-sm text-muted"><MapPin class="size-4 stroke-[1.5]" />{{ c.place }}</span>
            </a>
            <div class="mt-auto flex items-center justify-between gap-3 border-t border-hairline pt-3">
              <span :class="['text-xs', c.action === 'Attach plan' ? 'text-warning font-medium' : 'text-muted']">{{ c.status }}</span>
              <Button size="sm" :variant="c.action === 'Finish report' ? 'outline' : 'default'">
                <component :is="actionIcon[c.action]" />{{ c.action }}
              </Button>
            </div>
          </article>
        </div>
      </section>

      <div :class="['grid grid-cols-1 gap-8', wide ? '' : 'lg:grid-cols-[minmax(0,1fr)_380px]']">
        <TodoGrouped v-if="todo === '1'" v-model:filter="filter" />
        <TodoRail v-else-if="todo === '2'" v-model:filter="filter" />
        <TodoLanes v-else v-model:filter="filter" />

        <!-- Coming up -->
        <section aria-labelledby="coming-title" class="flex flex-col gap-3">
          <h2 id="coming-title" class="section-title">Coming up</h2>
          <div :class="['tf-card gap-4 p-(--card-pad)', wide ? 'grid grid-cols-1 md:grid-cols-4' : 'flex flex-col']">
            <div v-for="d in comingUp" :key="d.day">
              <h3 class="text-xs font-semibold text-muted">{{ d.day }}</h3>
              <ul class="mt-1">
                <li v-for="i in d.items" :key="i.time + i.klass" class="flex min-h-9 items-center gap-2.5 text-sm">
                  <span class="tnum w-11 text-muted">{{ i.time }}</span>
                  <WsDot :colour="ws(i.ws).slot" />
                  <span class="min-w-0 flex-1 truncate"><span class="font-medium">{{ i.klass }}</span> <span class="text-muted">· {{ ws(i.ws).name }}</span></span>
                  <Badge v-if="i.noPlan" variant="warning"><Clock />No plan</Badge>
                </li>
              </ul>
            </div>
            <a href="#" class="tf-link inline-flex items-center gap-1 self-start text-sm">Open My week <ArrowRight class="size-4 stroke-[1.5]" /></a>
          </div>
        </section>
      </div>

    </div>
  </AppShell>
</template>
