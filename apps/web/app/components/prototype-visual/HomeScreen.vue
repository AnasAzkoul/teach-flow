<script setup lang="ts">
import { Paperclip, Video, FileText, CircleAlert, Clock, Hourglass, MapPin, Users, ArrowRight, Send, Check, TriangleAlert, Circle, Plus } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import AppShell from './AppShell.vue'
import WsDot from './WsDot.vue'
import { now, needsSubstitute, today, todos, comingUp, teamOverdue, ws } from '~/prototype-visual/data'

const actionIcon = { 'Attach plan': Paperclip, 'Open plan': FileText, 'Join meeting': Video, 'Write report': FileText, 'Finish report': FileText }
const todoStyle = {
  overdue: { icon: CircleAlert, cls: 'text-danger' },
  'no-plan': { icon: Clock, cls: 'text-warning' },
  ending: { icon: Hourglass, cls: 'text-warning' },
  draft: { icon: FileText, cls: 'text-warning' },
  'follow-up': { icon: Circle, cls: 'text-muted' },
} as const
</script>

<template>
  <AppShell active="home">
    <!-- Needs a substitute: the only solid-colour fill in the app -->
    <section class="bg-danger-strong text-danger-on" aria-labelledby="sub-title">
      <div class="mx-auto max-w-[1120px] px-4 py-3 md:px-8">
        <h2 id="sub-title" class="flex items-center gap-2 text-sm font-semibold">
          <TriangleAlert class="size-4 stroke-[1.75]" /> Needs a substitute · Adults &amp; Exams team · next 48 h
        </h2>
        <ul class="mt-2 flex flex-col divide-y divide-danger-on/20">
          <li v-for="s in needsSubstitute" :key="s.id" class="flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:gap-4">
            <div class="min-w-0 flex-1 text-sm">
              <span class="tnum font-semibold">{{ s.when }}</span>
              <span> · {{ s.klass }} · {{ s.place }}</span>
              <span class="block opacity-95">{{ s.reason }}<template v-if="s.suggestion"> · {{ s.suggestion }}</template></span>
            </div>
            <div class="flex gap-2">
              <Button v-if="s.action === 'Approve'" size="sm" variant="on-danger"><Check />Approve Lina</Button>
              <Button size="sm" :variant="s.action === 'Approve' ? 'on-danger-outline' : 'on-danger'">Choose teacher</Button>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <div class="mx-auto flex max-w-[1120px] flex-col gap-8 px-4 py-6 md:px-8 md:py-8">
      <header>
        <p class="tnum text-sm text-muted">{{ now.day }} · {{ now.time }}</p>
        <h1 class="page-title">Good morning, Maya</h1>
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

      <div class="grid gap-8 lg:grid-cols-[1fr_380px]">
        <!-- To do -->
        <section aria-labelledby="todo-title" class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <h2 id="todo-title" class="section-title">To do <span class="tnum font-normal text-muted">· {{ todos.length }}</span></h2>
            <Button variant="ghost" size="sm"><Plus />Follow-up</Button>
          </div>
          <ul class="tf-card divide-y divide-hairline">
            <li v-for="t in todos" :key="t.id" class="flex min-h-(--row-h) items-start gap-3 px-(--card-pad) py-2.5">
              <component :is="todoStyle[t.kind].icon" :class="['mt-0.5 size-4 shrink-0 stroke-[1.75]', todoStyle[t.kind].cls]" :aria-hidden="t.kind !== 'follow-up'" :aria-label="t.kind === 'follow-up' ? 'Tick off' : undefined" />
              <div class="min-w-0 flex-1">
                <p class="text-sm">
                  <span :class="['font-medium', t.kind === 'follow-up' ? 'text-ink' : todoStyle[t.kind].cls]">{{ t.title }}</span>
                  <span v-if="t.kind !== 'follow-up'" class="text-ink"> · {{ t.detail }}</span>
                </p>
                <p class="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs text-muted">
                  <span v-if="t.kind === 'follow-up'">{{ t.detail }} ·</span>
                  <WsDot :colour="ws(t.ws).slot" />{{ ws(t.ws).name }} · <span class="tnum">{{ t.meta }}</span>
                </p>
              </div>
              <a v-if="t.kind === 'overdue'" href="#" class="tf-link shrink-0 text-sm">Finish report</a>
              <a v-else-if="t.kind === 'no-plan'" href="#" class="tf-link shrink-0 text-sm">Attach plan</a>
            </li>
          </ul>
        </section>

        <!-- Coming up -->
        <section aria-labelledby="coming-title" class="flex flex-col gap-3">
          <h2 id="coming-title" class="section-title">Coming up</h2>
          <div class="tf-card flex flex-col gap-4 p-(--card-pad)">
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

      <!-- Team block -->
      <section aria-labelledby="team-title" class="flex flex-col gap-3 border-t border-hairline pt-6">
        <h2 id="team-title" class="flex items-center gap-2 text-sm font-semibold">
          <WsDot :colour="ws(teamOverdue.ws).slot" size="md" />{{ ws(teamOverdue.ws).name }} · {{ teamOverdue.team }} team
        </h2>
        <div class="tf-card">
          <h3 class="flex items-center gap-2 border-b border-hairline px-(--card-pad) py-2.5 text-sm font-semibold">
            <CircleAlert class="size-4 stroke-[1.75] text-danger" /> Reports overdue <span class="tnum font-normal text-muted">· {{ teamOverdue.rows.length }}</span>
          </h3>
          <ul class="divide-y divide-hairline">
            <li v-for="r in teamOverdue.rows" :key="r.teacher" class="flex min-h-(--row-h) flex-wrap items-center gap-x-4 gap-y-1 px-(--card-pad) py-2">
              <span class="w-24 text-sm font-medium">{{ r.teacher }}</span>
              <span class="min-w-0 flex-1 text-sm">{{ r.klass }} <span class="tnum text-muted">· {{ r.lesson }}</span></span>
              <span class="tnum text-sm text-danger">{{ r.overdue }} overdue</span>
              <span v-if="r.reminded" class="flex h-8 items-center gap-1 text-xs text-muted"><Check class="size-4 stroke-[1.5]" />Reminded today</span>
              <Button v-else size="sm" variant="outline"><Send />Send reminder</Button>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </AppShell>
</template>
