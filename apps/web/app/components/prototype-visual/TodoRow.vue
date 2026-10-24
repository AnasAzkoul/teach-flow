<script setup lang="ts">
// One To do item. Urgency is carried by the icon + coloured type label only: the timing is ink,
// buttons are never filled (Today owns the one filled "do this next" button).
// Needs an @container ancestor: narrow lists stack (type line, title, detail, timing + buttons);
// from @2xl the row is three columns (text | timing | actions) so timings and buttons line up.
import { computed } from 'vue'
import { Check } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import WsDot from './WsDot.vue'
import { ws } from '~/prototype-visual/data'
import { TYPES, toneText, rowTone, type TodoItem } from '~/prototype-visual/todo'

const props = defineProps<{ item: TodoItem }>()
const t = computed(() => TYPES[props.item.type])
const tone = computed(() => toneText[rowTone(props.item)])
const live = computed(() => props.item.actions.filter((a) => !a.done))
const done = computed(() => props.item.actions.find((a) => a.done))
const followUp = computed(() => props.item.type === 'follow-up')
</script>

<template>
  <li class="flex flex-col gap-2 px-(--card-pad) py-3 transition-colors hover:bg-sunken/40 @2xl:grid @2xl:grid-cols-[minmax(0,1fr)_8rem_17rem] @2xl:items-center @2xl:gap-4 @2xl:py-2.5">
    <div class="flex min-w-0 items-start gap-3">
      <button v-if="followUp" type="button" aria-label="Mark done" class="-m-3.5 grid size-11 shrink-0 place-items-center rounded-full text-muted hover:text-ink @2xl:-m-2 @2xl:size-8">
        <component :is="t.icon" class="size-4 stroke-[1.75]" />
      </button>
      <component :is="t.icon" v-else :class="['mt-0.5 hidden size-4 shrink-0 stroke-[1.75] @2xl:block', tone]" aria-hidden="true" />

      <div class="min-w-0 flex-1">
        <!-- narrow: the type gets its own line -->
        <p v-if="!followUp" :class="['mb-0.5 flex items-center gap-1.5 text-xs font-medium @2xl:hidden', tone]">
          <component :is="t.icon" class="size-4 stroke-[1.75]" aria-hidden="true" />{{ t.label }}
        </p>
        <p class="text-sm">
          <span v-if="!followUp" :class="['hidden font-medium @2xl:inline', tone]">{{ t.label }} · </span>
          <span class="font-medium text-ink">{{ item.title }}</span>
          <template v-if="item.when"> · <span class="tnum whitespace-nowrap font-medium text-ink">{{ item.when }}</span></template>
        </p>
        <p class="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted">
          <span v-if="item.scope === 'team'">Team</span>
          <span v-if="item.detail" class="inline-flex gap-1.5"><span v-if="item.scope === 'team'" aria-hidden="true">·</span>{{ item.detail }}</span>
          <!-- the colour dot is its own separator, so a wrap never starts a line with "·" -->
          <span :class="['inline-flex items-center gap-1.5 whitespace-nowrap', item.scope === 'team' || item.detail ? 'ml-1.5' : '']"><WsDot :colour="ws(item.ws).slot" />{{ ws(item.ws).name }}</span>
          <!-- narrow, nothing to press: timing ends the line -->
          <span v-if="!live.length" class="tnum inline-flex gap-1.5 whitespace-nowrap @2xl:hidden"><span aria-hidden="true">·</span><span class="font-medium text-ink">{{ item.meta }}</span></span>
          <span v-if="done" class="ml-1.5 inline-flex items-center gap-1 whitespace-nowrap @2xl:hidden"><Check class="size-3.5 stroke-[1.75]" />{{ done.label }}</span>
        </p>
      </div>
    </div>

    <!-- wide: timing column -->
    <span class="tnum hidden text-sm font-medium text-ink @2xl:block">{{ item.meta }}</span>

    <!-- wide: action column (left-aligned so verbs read down one line); narrow: timing + buttons share a line -->
    <div v-if="live.length" class="flex items-center gap-2">
      <span class="tnum text-xs font-medium text-ink @2xl:hidden">{{ item.meta }}</span>
      <div class="ml-auto flex gap-2 @2xl:ml-0">
        <Button v-for="a in live" :key="a.label" size="sm" :variant="a.primary ? 'outline' : 'ghost'">{{ a.label }}</Button>
      </div>
    </div>
    <span v-else-if="done" class="hidden items-center gap-1 text-xs text-muted @2xl:flex"><Check class="size-4 stroke-[1.5]" />{{ done.label }}</span>
    <span v-else class="hidden @2xl:block" />
  </li>
</template>
