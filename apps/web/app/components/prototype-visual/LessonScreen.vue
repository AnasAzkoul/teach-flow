<script setup lang="ts">
import { ref, computed } from 'vue'
import { CalendarDays, MapPin, User, Users, Move, CalendarX, MessageSquare, Paperclip, Plus, Check, Clock, X, MinusCircle, CircleDashed, UserPlus, NotebookPen, ChevronLeft } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import AppShell from './AppShell.vue'
import WsDot from './WsDot.vue'
import Segmented, { type SegOption } from './Segmented.vue'
import { lesson, participants, reportFields, ws } from '~/prototype-visual/data'

const props = defineProps<{ tab: 'plan' | 'report' }>()
const tabModel = ref(props.tab)

const rows = ref(participants.map((p) => ({ ...p })))
const covered = ref(reportFields.covered)
const homeworkSet = ref(reportFields.homeworkSet)
const general = ref(reportFields.generalNotes)
const done = ref(false)
const allPresent = () => rows.value.forEach((r) => (r.attendance = 'present'))

const attendanceOptions: SegOption[] = [
  { value: 'present', label: 'Present', icon: Check, tone: 'success' },
  { value: 'late', label: 'Late', icon: Clock, tone: 'warning' },
  { value: 'absent-excused', label: 'Absent (excused)', short: 'Excused', icon: MinusCircle, tone: 'neutral' },
  { value: 'absent-unexcused', label: 'Absent (unexcused)', short: 'Unexcused', icon: X, tone: 'danger' },
]
const homeworkOptions: SegOption[] = [
  { value: 'done', label: 'Done', icon: Check, tone: 'success' },
  { value: 'partly', label: 'Partly done', short: 'Partly', icon: CircleDashed, tone: 'warning' },
  { value: 'not-done', label: 'Not done', icon: X, tone: 'danger' },
]
const present = computed(() => rows.value.filter((r) => r.attendance === 'present' || r.attendance === 'late').length)
</script>

<template>
  <AppShell active="lesson">
    <div class="mx-auto max-w-[1120px] px-4 py-5 md:px-8 md:py-8">
      <!-- Header -->
      <a href="#" class="inline-flex items-center gap-1 text-sm text-muted hover:text-ink"><ChevronLeft class="size-4 stroke-[1.5]" />B2 Exam prep</a>
      <div class="mt-2 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div class="min-w-0">
          <h1 class="page-title">{{ lesson.klass }} <span class="text-muted">· {{ lesson.date }}</span></h1>
          <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
            <span class="flex items-center gap-1.5"><WsDot :colour="ws(lesson.ws).slot" />{{ ws(lesson.ws).name }}</span>
            <span class="tnum flex items-center gap-1.5"><CalendarDays class="size-4 stroke-[1.5]" />{{ lesson.time }}</span>
            <span class="flex items-center gap-1.5"><MapPin class="size-4 stroke-[1.5]" />{{ lesson.place }}</span>
            <span class="flex items-center gap-1.5"><User class="size-4 stroke-[1.5]" />{{ lesson.teacher }}</span>
            <span class="tnum flex items-center gap-1.5"><Users class="size-4 stroke-[1.5]" />6 participants</span>
            <Badge variant="outline">Level {{ lesson.level }}</Badge>
          </div>
        </div>
        <div class="flex shrink-0 gap-2">
          <Button variant="outline" size="sm"><Move />Move</Button>
          <Button variant="danger-quiet" size="sm"><CalendarX />Cancel lesson</Button>
        </div>
      </div>

      <Tabs v-model="tabModel" class="mt-6">
        <TabsList>
          <TabsTrigger value="plan"><NotebookPen />Plan</TabsTrigger>
          <TabsTrigger value="report">Report <Badge v-if="!done" variant="warning" class="ml-1">Draft</Badge><Badge v-else variant="success" class="ml-1">Done</Badge></TabsTrigger>
        </TabsList>

        <!-- PLAN -->
        <TabsContent value="plan" class="pt-6">
          <div class="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div class="min-w-0">
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <h2 class="text-lg font-semibold">{{ lesson.planTitle }}</h2>
                <span class="tnum text-xs text-muted">90 min · 5 stages</span>
              </div>
              <p class="mt-1 text-xs text-muted">{{ lesson.planSource }} · <a href="#" class="tf-link">Change plan</a></p>

              <ol class="mt-5 flex flex-col gap-4">
                <li v-for="(s, i) in lesson.stages" :key="s.name" class="tf-card p-(--prose-pad)">
                  <div class="flex items-baseline gap-3">
                    <span class="tnum text-sm font-semibold text-muted">{{ i + 1 }}</span>
                    <h3 class="flex-1 text-base font-semibold">{{ s.name }}</h3>
                    <span class="tnum text-sm text-muted">{{ s.minutes }} min</span>
                  </div>
                  <p class="prose-text mt-2 text-ink">{{ s.body }}</p>
                  <div v-if="s.refs.length" class="mt-3 flex flex-wrap gap-1.5">
                    <Badge v-for="r in s.refs" :key="r" variant="neutral"><Paperclip />{{ r }}</Badge>
                  </div>
                  <!-- plan note -->
                  <aside v-if="s.note" class="mt-4 rounded-control border border-hairline bg-sunken p-3">
                    <p class="flex flex-wrap items-center gap-x-2 text-xs text-muted">
                      <MessageSquare class="size-4 stroke-[1.5]" />
                      <span class="font-semibold text-ink">Plan note</span> · {{ lesson.planNote.author }} ({{ lesson.planNote.role }}) · {{ lesson.planNote.when }}
                    </p>
                    <p class="prose-text mt-1.5">{{ lesson.planNote.text }}</p>
                    <div class="mt-2 flex gap-4 text-sm"><a href="#" class="tf-link">Reply</a><a href="#" class="tf-link">Mark resolved</a></div>
                  </aside>
                </li>
              </ol>
            </div>

            <aside class="flex flex-col gap-4">
              <section class="tf-card p-(--card-pad)">
                <h3 class="section-title flex items-center justify-between">Participants <span class="tnum font-normal text-muted">6</span></h3>
                <ul class="mt-2 flex flex-col">
                  <li v-for="p in participants" :key="p.name" class="flex min-h-9 items-center gap-2.5 text-sm">
                    <span class="grid size-6 place-items-center rounded-full bg-sunken text-[11px] font-semibold text-muted">{{ p.name.split(' ').map((x) => x[0]).join('') }}</span>
                    <a href="#" class="hover:underline">{{ p.name }}</a>
                  </li>
                </ul>
                <Button variant="ghost" size="sm" class="mt-1 -ml-2"><UserPlus />Add guest</Button>
              </section>
              <section class="tf-card p-(--card-pad)">
                <h3 class="section-title">Last lesson’s homework</h3>
                <p class="mt-1 text-xs text-muted">Set on Mon 19 Oct · check it in the Report tab</p>
                <p class="mt-2 text-sm leading-[22px]">{{ lesson.lastHomework }}</p>
              </section>
            </aside>
          </div>
        </TabsContent>

        <!-- REPORT -->
        <TabsContent value="report" class="pt-6 pb-28">
          <div class="flex max-w-[880px] flex-col gap-8">
            <section class="flex flex-col gap-5">
              <label class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">What was covered</span>
                <Textarea v-model="covered" />
              </label>
              <label class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">Homework set</span>
                <Textarea v-model="homeworkSet" />
              </label>
              <label class="flex flex-col gap-1.5">
                <span class="text-sm font-medium">General notes</span>
                <Textarea v-model="general" />
              </label>
            </section>

            <section class="flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <h2 class="section-title">Participants <span class="tnum font-normal text-muted">· {{ present }} of 6 here</span></h2>
                <Button variant="outline" size="sm" @click="allPresent"><Check />All present</Button>
              </div>
              <ul class="tf-card divide-y divide-hairline">
                <li v-for="(p, i) in rows" :key="p.name" class="flex flex-col gap-3 p-(--prose-pad)">
                  <div class="flex items-center gap-2.5">
                    <span class="grid size-7 place-items-center rounded-full bg-sunken text-xs font-semibold text-muted">{{ p.name.split(' ').map((x) => x[0]).join('') }}</span>
                    <span class="text-base font-semibold">{{ p.name }}</span>
                  </div>
                  <div class="grid gap-3 md:grid-cols-[1.35fr_1fr]">
                    <div class="flex flex-col gap-1">
                      <span class="text-xs font-medium text-muted">Attendance</span>
                      <Segmented v-model="p.attendance" :options="attendanceOptions" label="Attendance" :name="`att-${i}`" />
                    </div>
                    <div class="flex flex-col gap-1">
                      <span class="text-xs font-medium text-muted">Homework check</span>
                      <Segmented v-if="p.homework !== null" v-model="p.homework" :options="homeworkOptions" label="Homework check" :name="`hw-${i}`" />
                      <p v-else class="flex min-h-11 items-center text-sm text-muted md:min-h-9">
                        {{ p.attendance.startsWith('absent') ? 'Absent today · not checked' : 'Not in the lesson where it was set' }}
                      </p>
                    </div>
                  </div>
                  <label class="flex flex-col gap-1">
                    <span class="text-xs font-medium text-muted">Participant note</span>
                    <Textarea v-model="p.note" placeholder="What did you notice about this participant?" class="min-h-11" />
                  </label>
                  <a href="#" class="tf-link inline-flex items-center gap-1 self-start text-sm"><Plus class="size-4 stroke-[1.5]" />Follow-up</a>
                </li>
              </ul>
            </section>
          </div>

          <!-- action bar -->
          <div class="fixed inset-x-0 bottom-0 z-10 border-t border-hairline bg-surface/95 backdrop-blur md:left-60">
            <div class="mx-auto flex max-w-[1120px] items-center gap-3 px-4 py-3 md:px-8">
              <p class="tnum flex-1 text-xs text-muted" aria-live="polite">
                <template v-if="!done">Draft saved 10:41</template>
                <span v-else class="inline-flex items-center gap-1.5 font-medium text-success">
                  <svg viewBox="0 0 16 16" class="size-4" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="draw-check" /></svg>
                  Report done · 11:56
                </span>
              </p>
              <Button variant="outline" :disabled="done">Save draft</Button>
              <Button v-if="!done" @click="done = true"><Check />Mark done</Button>
              <Button v-else variant="ghost" @click="done = false">Undo</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </AppShell>
</template>

<style scoped>
/* Candidate "quiet touch" for Mark done: the check draws in once, 200 ms. */
.draw-check {
  stroke-dasharray: 16;
  stroke-dashoffset: 16;
  animation: draw 200ms ease-out 60ms forwards;
}
@keyframes draw { to { stroke-dashoffset: 0; } }
</style>
