<script setup lang="ts">
import { House, CalendarDays, GraduationCap, Users, BookOpen, UserCog, ChevronsUpDown, Menu, Search } from '@lucide/vue'
import WsDot from './WsDot.vue'
import { me, ws } from '~/prototype-visual/data'

const props = defineProps<{ active: 'home' | 'week' | 'lesson'; workspace?: string }>()
const current = ws(props.workspace ?? 'bright')

const you = [
  { key: 'home', label: 'Home', icon: House },
  { key: 'week', label: 'My week', icon: CalendarDays },
]
const wsNav = [
  { key: 'classes', label: 'Classes', icon: GraduationCap, on: props.active === 'lesson' },
  { key: 'students', label: 'Students', icon: Users },
  { key: 'library', label: 'Library', icon: BookOpen },
  { key: 'members', label: 'Members', icon: UserCog },
]
</script>

<template>
  <div class="min-h-dvh bg-page text-ink md:flex">
    <!-- desktop sidebar -->
    <aside class="hidden w-60 shrink-0 flex-col gap-6 border-r border-hairline bg-page px-3 py-4 md:flex md:sticky md:top-0 md:h-dvh">
      <div class="flex items-center gap-2 px-2">
        <div class="grid size-7 place-items-center rounded-control bg-accent text-xs font-semibold text-accent-on">TF</div>
        <span class="font-title text-[15px] font-semibold tracking-tight">Teach Flow</span>
      </div>
      <nav class="flex flex-col gap-0.5" aria-label="You">
        <p class="px-2 pb-1 text-xs font-medium text-muted">You</p>
        <a
          v-for="n in you" :key="n.key" href="#"
          :class="['flex h-9 items-center gap-2.5 rounded-control px-2 text-sm font-medium', active === n.key ? 'bg-accent-soft text-accent' : 'text-ink hover:bg-sunken']"
          :aria-current="active === n.key ? 'page' : undefined"
        >
          <component :is="n.icon" class="size-5 stroke-[1.5]" />{{ n.label }}
        </a>
      </nav>
      <nav class="flex flex-col gap-0.5" aria-label="Workspace">
        <p class="px-2 pb-1 text-xs font-medium text-muted">Workspace</p>
        <button class="mb-1 flex h-10 items-center gap-2 rounded-control border border-hairline bg-surface px-2.5 text-left text-sm hover:bg-sunken">
          <WsDot :colour="current.slot" size="md" />
          <span class="flex-1 truncate font-medium">{{ current.name }}</span>
          <ChevronsUpDown class="size-4 stroke-[1.5] text-muted" />
        </button>
        <a
          v-for="n in wsNav" :key="n.key" href="#"
          :class="['flex h-9 items-center gap-2.5 rounded-control px-2 text-sm font-medium', n.on ? 'bg-accent-soft text-accent' : 'text-ink hover:bg-sunken']"
        >
          <component :is="n.icon" class="size-5 stroke-[1.5]" />{{ n.label }}
        </a>
      </nav>
      <div class="mt-auto flex items-center gap-2 px-2">
        <div class="grid size-7 place-items-center rounded-full bg-sunken text-xs font-semibold text-muted">{{ me.initials }}</div>
        <span class="text-sm">{{ me.name }}</span>
      </div>
    </aside>

    <!-- phone top bar -->
    <header class="sticky top-0 z-20 flex h-14 items-center gap-1 border-b border-hairline bg-page/95 px-1 backdrop-blur md:hidden">
      <button class="grid size-11 place-items-center rounded-control text-ink" aria-label="Menu"><Menu class="size-5 stroke-[1.5]" /></button>
      <button class="flex h-11 items-center gap-2 rounded-control px-2 text-sm font-medium">
        <WsDot :colour="current.slot" size="md" />{{ current.name }}<ChevronsUpDown class="size-4 stroke-[1.5] text-muted" />
      </button>
      <button class="ml-auto grid size-11 place-items-center rounded-control" aria-label="Search"><Search class="size-5 stroke-[1.5]" /></button>
    </header>

    <main class="min-w-0 flex-1">
      <slot />
    </main>
  </div>
</template>
