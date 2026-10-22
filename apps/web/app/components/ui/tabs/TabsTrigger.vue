<script setup lang="ts">
import type { TabsTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/lib/utils"
import { TabsTrigger, useForwardProps } from "reka-ui"

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    :class="cn(
      `relative -mb-px inline-flex h-11 md:h-10 items-center gap-1.5 border-b-2 border-transparent px-3 text-sm font-medium text-muted whitespace-nowrap transition-colors duration-150 hover:text-ink data-[state=active]:border-accent data-[state=active]:text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus [&_svg]:size-4 [&_svg]:stroke-[1.5]`,
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </TabsTrigger>
</template>
