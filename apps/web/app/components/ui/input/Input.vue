<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "@/lib/utils"

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void
}>()

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="cn(
      'placeholder:text-muted border-field h-11 w-full min-w-0 rounded-control border bg-surface px-3 text-base text-ink transition-colors outline-none md:h-9 md:text-sm disabled:cursor-not-allowed disabled:opacity-50',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
      props.class,
    )"
  >
</template>
