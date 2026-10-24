<script setup lang="ts">
// Variant 1 · Grouped: urgency chips + type chips on top, list grouped into urgency sections.
import { computed } from 'vue'
import { Plus } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import TodoRow from './TodoRow.vue'
import { todoItems, applyFilter, countBy, TYPES, TYPE_ORDER, URGENCY, URGENCY_ORDER, toneText, type TodoFilter } from '~/prototype-visual/todo'

const filter = defineModel<TodoFilter>('filter', { required: true })
const shown = computed(() => applyFilter(todoItems, filter.value))
const byUrgency = computed(() => countBy(applyFilter(todoItems, { ...filter.value, urgency: 'all' }), (i) => i.urgency))
const byType = computed(() => countBy(applyFilter(todoItems, { ...filter.value, type: 'all' }), (i) => i.type))
const chip = (on: boolean) => ['inline-flex h-11 md:h-8 shrink-0 items-center gap-1.5 rounded-control border px-2.5 text-sm font-medium transition-colors', on ? 'border-accent bg-accent-soft text-accent' : 'border-hairline bg-surface text-ink hover:border-field']
</script>

<template>
  <section id="todo" aria-labelledby="todo-title" class="flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <h2 id="todo-title" class="section-title">To do <span class="tnum font-normal text-muted">· {{ todoItems.length }}</span></h2>
      <Button variant="ghost" size="sm"><Plus />Follow-up</Button>
    </div>

    <div class="flex flex-col gap-2">
      <div class="-mx-4 flex gap-1.5 overflow-x-auto px-4 md:mx-0 md:px-0" role="group" aria-label="Urgency">
        <button :class="chip(filter.urgency === 'all')" :aria-pressed="filter.urgency === 'all'" @click="filter = { ...filter, urgency: 'all' }">All</button>
        <button v-for="u in URGENCY_ORDER" :key="u" :class="chip(filter.urgency === u)" :aria-pressed="filter.urgency === u" @click="filter = { ...filter, urgency: u }">
          <span v-if="u === 'now'" class="size-1.5 rounded-full bg-danger" aria-hidden="true" />{{ u === 'now' ? 'Now' : URGENCY[u].label }}
          <span class="tnum text-muted">{{ byUrgency[u] ?? 0 }}</span>
        </button>
      </div>
      <div class="-mx-4 flex gap-1.5 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Type">
        <button :class="chip(filter.type === 'all')" :aria-pressed="filter.type === 'all'" @click="filter = { ...filter, type: 'all' }">All types</button>
        <template v-for="t in TYPE_ORDER" :key="t">
          <button v-if="byType[t]" :class="chip(filter.type === t)" :aria-pressed="filter.type === t" @click="filter = { ...filter, type: t }">
            <component :is="TYPES[t].icon" :class="['size-4 stroke-[1.75]', toneText[TYPES[t].tone]]" />{{ TYPES[t].plural }}
            <span class="tnum text-muted">{{ byType[t] }}</span>
          </button>
        </template>
      </div>
    </div>

    <div class="tf-card overflow-hidden">
      <template v-for="u in URGENCY_ORDER" :key="u">
        <template v-if="shown.some((i) => i.urgency === u)">
          <h3 class="flex items-center gap-2 border-b border-hairline bg-sunken/60 px-(--card-pad) py-1.5 text-xs font-semibold text-muted [&:not(:first-child)]:border-t">
            <span v-if="u === 'now'" class="size-1.5 rounded-full bg-danger" aria-hidden="true" />{{ URGENCY[u].label }}
            <span class="font-normal">· {{ URGENCY[u].hint }}</span>
          </h3>
          <ul class="divide-y divide-hairline">
            <TodoRow v-for="i in shown.filter((x) => x.urgency === u)" :key="i.id" :item="i" />
          </ul>
        </template>
      </template>
      <p v-if="!shown.length" class="px-(--card-pad) py-6 text-center text-sm text-muted">Nothing here. <button class="tf-link" @click="filter = { urgency: 'all', type: 'all', scope: 'all' }">Show everything</button></p>
    </div>
  </section>
</template>
