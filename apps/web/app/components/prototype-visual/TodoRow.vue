<script setup lang="ts">
// One To do item. Urgency is carried by the icon + coloured type label, never a fill.
import { Check } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import WsDot from './WsDot.vue'
import { ws } from '~/prototype-visual/data'
import { TYPES, toneText, type TodoItem } from '~/prototype-visual/todo'

defineProps<{ item: TodoItem; showUrgency?: boolean }>()
</script>

<template>
  <li class="flex min-h-(--row-h) flex-col gap-2 px-(--card-pad) py-2.5 sm:flex-row sm:items-center sm:gap-3">
    <div class="flex min-w-0 flex-1 items-start gap-3">
      <component :is="TYPES[item.type].icon" :class="['mt-0.5 size-4 shrink-0 stroke-[1.75]', toneText[TYPES[item.type].tone]]" aria-hidden="true" />
      <div class="min-w-0 flex-1">
        <p class="text-sm">
          <span v-if="item.type !== 'follow-up'" :class="['font-medium', toneText[TYPES[item.type].tone]]">{{ TYPES[item.type].label }} · </span>
          <span class="font-medium text-ink">{{ item.title }}</span>
          <Badge v-if="item.scope === 'team'" variant="outline" class="ml-1.5 align-[1px]">Team</Badge>
        </p>
        <p class="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs text-muted">
          <span>{{ item.detail }}</span>·
          <WsDot :colour="ws(item.ws).slot" />{{ ws(item.ws).name }} ·
          <span :class="['tnum', item.urgency === 'now' && item.type !== 'follow-up' ? 'font-medium text-danger' : '']">{{ item.meta }}</span>
        </p>
      </div>
    </div>
    <div v-if="item.actions.length" class="flex shrink-0 gap-2 pl-7 sm:pl-0">
      <template v-for="a in item.actions" :key="a.label">
        <span v-if="a.done" class="flex h-8 items-center gap-1 text-xs text-muted"><Check class="size-4 stroke-[1.5]" />{{ a.label }}</span>
        <Button v-else size="sm" :variant="a.primary ? 'default' : 'outline'">{{ a.label }}</Button>
      </template>
    </div>
  </li>
</template>
