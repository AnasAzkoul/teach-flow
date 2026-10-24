<script setup lang="ts">
// Variant 2 · Filter rail: one list sorted by urgency, with quiet in-list urgency labels, and a
// filter rail (urgency, type, whose) to its right from lg. The rail is silent until something is
// filtered. Below lg: a Whose switch plus two selects.
import { computed } from 'vue'
import { Plus, X } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import TodoRow from './TodoRow.vue'
import { todoItems, applyFilter, countBy, isFiltered, NO_FILTER, TYPES, TYPE_ORDER, URGENCY, URGENCY_ORDER, type TodoFilter } from '~/prototype-visual/todo'

const filter = defineModel<TodoFilter>('filter', { required: true })
const shown = computed(() => applyFilter(todoItems, filter.value))
const groups = computed(() => URGENCY_ORDER.map((u) => ({ u, items: shown.value.filter((i) => i.urgency === u) })).filter((g) => g.items.length))
const byUrgency = computed(() => countBy(applyFilter(todoItems, { ...filter.value, urgency: 'all' }), (i) => i.urgency))
const byType = computed(() => countBy(applyFilter(todoItems, { ...filter.value, type: 'all' }), (i) => i.type))
const byScope = computed(() => countBy(applyFilter(todoItems, { ...filter.value, scope: 'all' }), (i) => i.scope))
const totalByType = countBy(todoItems, (i) => i.type)
const filtered = computed(() => isFiltered(filter.value))
const clear = () => (filter.value = { ...NO_FILTER })
const set = (patch: Partial<TodoFilter>) => (filter.value = { ...filter.value, ...patch })
const sum = (c: Partial<Record<string, number>>) => Object.values(c).reduce((a: number, b) => a + (b ?? 0), 0)

// "All" selected = no fill; a real filter selected = tint + accent bar.
const item = (on: boolean, isAll = false) => [
  'flex h-9 w-full items-center gap-2 rounded-control px-2 text-left text-sm transition-colors disabled:cursor-default disabled:text-muted disabled:hover:bg-transparent',
  on ? (isAll ? 'font-medium text-ink' : 'bg-accent-soft font-medium text-accent shadow-[inset_2px_0_0_var(--color-accent)]') : 'text-ink hover:bg-sunken',
]
const sel = 'h-11 min-w-0 flex-1 rounded-control border border-field bg-surface px-2 text-base text-ink'
const dot = { now: 'bg-danger', soon: 'bg-warning', later: 'bg-field' } as const
const scopes = [{ s: 'all', label: 'All' }, { s: 'mine', label: 'Mine' }, { s: 'team', label: 'My team' }] as const
</script>

<template>
  <section id="todo" aria-labelledby="todo-title" class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <h2 id="todo-title" class="section-title mr-auto">
        To do <span class="tnum font-normal text-muted">· <template v-if="filtered">{{ shown.length }} of </template>{{ todoItems.length }}</span>
      </h2>
      <Button v-if="filtered" variant="ghost" size="sm" @click="clear"><X />Clear filters</Button>
      <Button variant="ghost" size="sm"><Plus />Follow-up</Button>
    </div>

    <!-- below lg: Whose switch + selects -->
    <div class="flex flex-col gap-2 lg:hidden">
      <div class="flex rounded-control border border-field p-0.5" role="group" aria-label="Whose">
        <button v-for="o in scopes" :key="o.s" :aria-pressed="filter.scope === o.s"
          :class="['h-11 flex-1 rounded-[calc(var(--r-control)-2px)] text-sm font-medium', filter.scope === o.s ? 'bg-sunken text-ink' : 'text-muted hover:text-ink']"
          @click="set({ scope: o.s })">{{ o.label }}<span v-if="o.s !== 'all'" class="tnum ml-1 font-normal text-muted">{{ byScope[o.s] ?? 0 }}</span></button>
      </div>
      <div class="flex gap-2">
        <select :value="filter.urgency" :class="sel" aria-label="Urgency" @change="set({ urgency: ($event.target as HTMLSelectElement).value as any })">
          <option value="all">Any urgency</option>
          <template v-for="u in URGENCY_ORDER" :key="u">
            <option v-if="byUrgency[u] || filter.urgency === u" :value="u">{{ URGENCY[u].label }} ({{ byUrgency[u] ?? 0 }})</option>
          </template>
        </select>
        <select :value="filter.type" :class="sel" aria-label="Type" @change="set({ type: ($event.target as HTMLSelectElement).value as any })">
          <option value="all">All types</option>
          <template v-for="t in TYPE_ORDER" :key="t">
            <option v-if="byType[t] || filter.type === t" :value="t">{{ TYPES[t].plural }} ({{ byType[t] ?? 0 }})</option>
          </template>
        </select>
      </div>
    </div>

    <div class="flex items-start gap-6">
      <div class="tf-card @container min-w-0 flex-1 overflow-hidden">
        <template v-for="g in groups" :key="g.u">
          <h3 v-if="groups.length > 1" class="flex items-center gap-2 border-t border-hairline px-(--card-pad) pt-3 pb-1 text-xs font-medium text-muted first:border-t-0">
            <span :class="['size-1.5 rounded-full', dot[g.u]]" aria-hidden="true" /><span>{{ URGENCY[g.u].label }} <span class="tnum">· {{ g.items.length }}</span></span>
          </h3>
          <ul class="divide-y divide-hairline">
            <TodoRow v-for="i in g.items" :key="i.id" :item="i" />
          </ul>
        </template>
        <p v-if="!shown.length" class="px-(--card-pad) py-8 text-center text-sm text-muted">
          <template v-if="filtered">No items match these filters. <button class="tf-link" @click="clear">Show all {{ todoItems.length }}</button></template>
          <template v-else>All caught up.</template>
        </p>
      </div>

      <!-- lg+: rail on the right, outside the card -->
      <nav class="order-last hidden w-52 shrink-0 flex-col gap-4 lg:sticky lg:top-6 lg:flex" aria-label="Filter To do">
        <div>
          <p class="px-2 pb-1 text-xs font-medium text-muted">Urgency</p>
          <button :class="item(filter.urgency === 'all', true)" :aria-pressed="filter.urgency === 'all'" @click="set({ urgency: 'all' })">
            <span class="flex-1">All</span><span class="tnum text-xs text-muted">{{ sum(byUrgency) }}</span>
          </button>
          <button v-for="u in URGENCY_ORDER" :key="u" :class="item(filter.urgency === u)" :aria-pressed="filter.urgency === u"
            :disabled="!byUrgency[u] && filter.urgency !== u" @click="set({ urgency: u })">
            <span :class="['size-1.5 rounded-full', dot[u]]" aria-hidden="true" />
            <span class="flex-1">{{ URGENCY[u].label }}</span><span class="tnum text-xs text-muted">{{ byUrgency[u] ?? 0 }}</span>
          </button>
        </div>
        <div>
          <p class="px-2 pb-1 text-xs font-medium text-muted">Type</p>
          <button :class="item(filter.type === 'all', true)" :aria-pressed="filter.type === 'all'" @click="set({ type: 'all' })">
            <span class="flex-1">All</span><span class="tnum text-xs text-muted">{{ sum(byType) }}</span>
          </button>
          <template v-for="t in TYPE_ORDER" :key="t">
            <button v-if="totalByType[t] || filter.type === t" :class="item(filter.type === t)" :aria-pressed="filter.type === t"
              :disabled="!byType[t] && filter.type !== t" @click="set({ type: t })">
              <component :is="TYPES[t].icon" class="size-4 stroke-[1.75] text-muted" />
              <span class="flex-1 truncate">{{ TYPES[t].plural }}</span><span class="tnum text-xs text-muted">{{ byType[t] ?? 0 }}</span>
            </button>
          </template>
        </div>
        <div>
          <p class="px-2 pb-1 text-xs font-medium text-muted">Whose</p>
          <button v-for="o in scopes" :key="o.s" :class="item(filter.scope === o.s, o.s === 'all')" :aria-pressed="filter.scope === o.s"
            :disabled="o.s !== 'all' && !byScope[o.s] && filter.scope !== o.s" @click="set({ scope: o.s })">
            <span class="flex-1">{{ o.label }}</span><span class="tnum text-xs text-muted">{{ o.s === 'all' ? sum(byScope) : byScope[o.s] ?? 0 }}</span>
          </button>
        </div>
      </nav>
    </div>
  </section>
</template>
