<script setup lang="ts">
// Variant 3 · Triage lanes: Now / Soon / Later side by side, each item a small card.
// Filters: type chips and Mine / My team. On phones the lanes stack.
import { computed } from 'vue'
import { Plus, Check } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import WsDot from './WsDot.vue'
import { ws } from '~/prototype-visual/data'
import { todoItems, applyFilter, countBy, TYPES, TYPE_ORDER, URGENCY, URGENCY_ORDER, toneText, type TodoFilter } from '~/prototype-visual/todo'

const filter = defineModel<TodoFilter>('filter', { required: true })
const shown = computed(() => applyFilter(todoItems, { ...filter.value, urgency: 'all' }))
const byType = computed(() => countBy(applyFilter(todoItems, { ...filter.value, type: 'all', urgency: 'all' }), (i) => i.type))
const totalByType = countBy(todoItems, (i) => i.type)
const chip = (on: boolean) => ['inline-flex h-11 md:h-8 shrink-0 items-center gap-1.5 rounded-control border px-2.5 text-sm font-medium transition-colors', on ? 'border-accent bg-accent-soft text-accent' : 'border-hairline bg-surface text-ink hover:border-field']
</script>

<template>
  <section id="todo" aria-labelledby="todo-title" class="flex flex-col gap-3">
    <div class="flex flex-wrap items-center gap-2">
      <h2 id="todo-title" class="section-title mr-auto">To do <span class="tnum font-normal text-muted">· {{ todoItems.length }}</span></h2>
      <div class="flex rounded-control border border-field p-0.5" role="group" aria-label="Whose">
        <button v-for="s in (['all', 'mine', 'team'] as const)" :key="s"
          :class="['h-11 rounded-[calc(var(--r-control)-2px)] px-2.5 text-sm font-medium md:h-7', filter.scope === s ? 'bg-sunken text-ink' : 'text-muted hover:text-ink']"
          :aria-pressed="filter.scope === s" @click="filter = { ...filter, scope: s }">{{ s === 'all' ? 'All' : s === 'mine' ? 'Mine' : 'My team' }}</button>
      </div>
      <Button variant="ghost" size="sm"><Plus />Follow-up</Button>
    </div>
    <div class="-mx-4 flex gap-1.5 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Type">
      <button :class="chip(filter.type === 'all')" @click="filter = { ...filter, type: 'all' }">All types</button>
      <template v-for="t in TYPE_ORDER" :key="t">
        <button v-if="totalByType[t] || filter.type === t" :class="chip(filter.type === t)" @click="filter = { ...filter, type: t }">
          <component :is="TYPES[t].icon" :class="['size-4 stroke-[1.75]', toneText[TYPES[t].tone]]" />{{ TYPES[t].plural }}<span class="tnum text-muted">{{ byType[t] ?? 0 }}</span>
        </button>
      </template>
    </div>

    <div class="grid gap-(--block-gap) md:grid-cols-3">
      <div v-for="u in URGENCY_ORDER" :key="u" class="flex flex-col gap-2 rounded-card bg-sunken/70 p-2">
        <h3 class="flex items-center gap-2 px-1 pt-0.5 text-xs font-semibold">
          <span :class="['size-1.5 rounded-full', u === 'now' ? 'bg-danger' : u === 'soon' ? 'bg-warning' : 'bg-field']" aria-hidden="true" />
          {{ URGENCY[u].label }} <span class="tnum font-normal text-muted">{{ shown.filter((i) => i.urgency === u).length }} · {{ URGENCY[u].hint }}</span>
        </h3>
        <article v-for="i in shown.filter((x) => x.urgency === u)" :key="i.id" class="tf-card flex flex-col gap-2 p-(--card-pad)">
          <p class="flex items-center gap-1.5 text-xs font-medium" :class="toneText[TYPES[i.type].tone]">
            <component :is="TYPES[i.type].icon" class="size-4 stroke-[1.75]" />{{ TYPES[i.type].label }}
          </p>
          <p class="text-sm font-medium">{{ i.title }}<template v-if="i.when"> · <span class="tnum whitespace-nowrap">{{ i.when }}</span></template></p>
          <p v-if="i.detail || i.scope === 'team'" class="text-xs text-muted">{{ [i.scope === 'team' ? 'Team' : '', i.detail].filter(Boolean).join(' · ') }}</p>
          <p class="flex items-center gap-1.5 text-xs text-muted"><WsDot :colour="ws(i.ws).slot" />{{ ws(i.ws).name }} · <span class="tnum font-medium text-ink">{{ i.meta }}</span></p>
          <div v-if="i.actions.length" class="flex flex-wrap gap-2 pt-1">
            <template v-for="a in i.actions" :key="a.label">
              <span v-if="a.done" class="flex h-8 items-center gap-1 text-xs text-muted"><Check class="size-4 stroke-[1.5]" />{{ a.label }}</span>
              <Button v-else size="sm" :variant="a.primary ? 'outline' : 'ghost'">{{ a.label }}</Button>
            </template>
          </div>
        </article>
        <p v-if="!shown.some((i) => i.urgency === u)" class="px-1 py-3 text-xs text-muted">Nothing {{ u === 'now' ? 'urgent' : 'here' }}.</p>
      </div>
    </div>
  </section>
</template>
