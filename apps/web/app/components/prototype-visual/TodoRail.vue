<script setup lang="ts">
// Variant 2 · Filter rail: a left rail (urgency, type, whose) beside one flat list sorted by urgency.
// On phones the rail collapses into one row of selects.
import { computed } from 'vue'
import { Plus } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import TodoRow from './TodoRow.vue'
import { todoItems, applyFilter, countBy, TYPES, TYPE_ORDER, URGENCY, URGENCY_ORDER, toneText, type TodoFilter } from '~/prototype-visual/todo'

const filter = defineModel<TodoFilter>('filter', { required: true })
const rank = { now: 0, soon: 1, later: 2 }
const shown = computed(() => applyFilter(todoItems, filter.value).sort((a, b) => rank[a.urgency] - rank[b.urgency]))
const byUrgency = computed(() => countBy(applyFilter(todoItems, { ...filter.value, urgency: 'all' }), (i) => i.urgency))
const byType = computed(() => countBy(applyFilter(todoItems, { ...filter.value, type: 'all' }), (i) => i.type))
const byScope = computed(() => countBy(applyFilter(todoItems, { ...filter.value, scope: 'all' }), (i) => i.scope))
const item = (on: boolean) => ['flex h-9 w-full items-center gap-2 rounded-control px-2 text-left text-sm', on ? 'bg-accent-soft font-medium text-accent' : 'text-ink hover:bg-sunken']
const sel = 'h-11 min-w-0 flex-1 rounded-control border border-field bg-surface px-2 text-base text-ink'
</script>

<template>
  <section id="todo" aria-labelledby="todo-title" class="flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <h2 id="todo-title" class="section-title">To do <span class="tnum font-normal text-muted">· {{ shown.length }} of {{ todoItems.length }}</span></h2>
      <Button variant="ghost" size="sm"><Plus />Follow-up</Button>
    </div>

    <!-- phone: selects -->
    <div class="flex gap-2 md:hidden">
      <select :value="filter.urgency" :class="sel" aria-label="Urgency" @change="filter = { ...filter, urgency: ($event.target as HTMLSelectElement).value as any }">
        <option value="all">Any urgency</option>
        <option v-for="u in URGENCY_ORDER" :key="u" :value="u">{{ URGENCY[u].label }} ({{ byUrgency[u] ?? 0 }})</option>
      </select>
      <select :value="filter.type" :class="sel" aria-label="Type" @change="filter = { ...filter, type: ($event.target as HTMLSelectElement).value as any }">
        <option value="all">All types</option>
        <option v-for="t in TYPE_ORDER" :key="t" :value="t">{{ TYPES[t].plural }} ({{ byType[t] ?? 0 }})</option>
      </select>
    </div>

    <div class="tf-card flex overflow-hidden">
      <!-- desktop rail -->
      <nav class="hidden w-56 shrink-0 flex-col gap-4 border-r border-hairline bg-page/60 p-2 md:flex" aria-label="Filter To do">
        <div>
          <p class="px-2 pb-1 text-xs font-medium text-muted">Urgency</p>
          <button :class="item(filter.urgency === 'all')" @click="filter = { ...filter, urgency: 'all' }"><span class="flex-1">Any</span></button>
          <button v-for="u in URGENCY_ORDER" :key="u" :class="item(filter.urgency === u)" @click="filter = { ...filter, urgency: u }">
            <span :class="['size-1.5 rounded-full', u === 'now' ? 'bg-danger' : u === 'soon' ? 'bg-warning' : 'bg-field']" aria-hidden="true" />
            <span class="flex-1">{{ URGENCY[u].label }}</span><span class="tnum text-xs text-muted">{{ byUrgency[u] ?? 0 }}</span>
          </button>
        </div>
        <div>
          <p class="px-2 pb-1 text-xs font-medium text-muted">Type</p>
          <button :class="item(filter.type === 'all')" @click="filter = { ...filter, type: 'all' }"><span class="flex-1">All types</span></button>
          <template v-for="t in TYPE_ORDER" :key="t">
            <button v-if="byType[t]" :class="item(filter.type === t)" @click="filter = { ...filter, type: t }">
              <component :is="TYPES[t].icon" :class="['size-4 stroke-[1.75]', toneText[TYPES[t].tone]]" />
              <span class="flex-1 truncate">{{ TYPES[t].plural }}</span><span class="tnum text-xs text-muted">{{ byType[t] }}</span>
            </button>
          </template>
        </div>
        <div>
          <p class="px-2 pb-1 text-xs font-medium text-muted">Whose</p>
          <button v-for="s in (['all', 'mine', 'team'] as const)" :key="s" :class="item(filter.scope === s)" @click="filter = { ...filter, scope: s }">
            <span class="flex-1">{{ s === 'all' ? 'Everything' : s === 'mine' ? 'Mine' : 'My team' }}</span>
            <span v-if="s !== 'all'" class="tnum text-xs text-muted">{{ byScope[s] ?? 0 }}</span>
          </button>
        </div>
      </nav>

      <div class="min-w-0 flex-1">
        <ul class="divide-y divide-hairline">
          <TodoRow v-for="i in shown" :key="i.id" :item="i" />
        </ul>
        <p v-if="!shown.length" class="px-(--card-pad) py-6 text-center text-sm text-muted">Nothing here.</p>
      </div>
    </div>
  </section>
</template>
