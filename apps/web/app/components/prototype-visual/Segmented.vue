<script setup lang="ts">
// Segmented control for attendance and homework. Coloured only when selected, always with an icon + label.
import type { Component } from 'vue'

export interface SegOption { value: string; label: string; short?: string; icon: Component; tone: 'success' | 'warning' | 'danger' | 'neutral' }
defineProps<{ options: SegOption[]; label: string; name: string }>()
const model = defineModel<string | null>()

const selected: Record<SegOption['tone'], string> = {
  success: 'bg-success-tint text-success border-success',
  warning: 'bg-warning-tint text-warning border-warning',
  danger: 'bg-danger-tint text-danger border-danger',
  neutral: 'bg-sunken text-ink border-field',
}
</script>

<template>
  <div role="radiogroup" :aria-label="label" class="flex w-full rounded-control border border-field bg-surface p-0.5 gap-0.5">
    <button
      v-for="o in options"
      :key="o.value"
      type="button"
      role="radio"
      :aria-checked="model === o.value"
      :name="name"
      :class="[
        'flex min-h-13 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-[calc(var(--r-control)-2px)] border px-1 text-xs font-medium transition-colors duration-150 sm:min-h-11 sm:flex-row sm:gap-1.5 sm:px-2 sm:text-sm md:min-h-8',
        model === o.value ? selected[o.tone] : 'border-transparent text-muted hover:bg-sunken hover:text-ink',
      ]"
      @click="model = o.value"
    >
      <component :is="o.icon" class="size-4 shrink-0 stroke-[1.5]" />
      <span class="hidden truncate xl:inline">{{ o.label }}</span>
      <span class="truncate xl:hidden">{{ o.short ?? o.label }}</span>
    </button>
  </div>
</template>
