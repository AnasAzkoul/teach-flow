<script setup lang="ts">
import { ref, computed } from 'vue'
import { Check, X } from '@lucide/vue'
import { DIRECTIONS, DIR_KEYS, contrast, contrastPairs, type DirKey, type Mode } from '~/prototype-visual/tokens'

const props = defineProps<{ dir: DirKey }>()
const mode = ref<Mode>('light')
const d = computed(() => DIRECTIONS[props.dir])

const rows = computed(() => contrastPairs(d.value, mode.value).map((p) => ({ ...p, ratio: contrast(p.fg, p.bg) })))
const summary = computed(() =>
  DIR_KEYS.flatMap((k) =>
    (['light', 'dark'] as Mode[]).map((m) => {
      const ps = contrastPairs(DIRECTIONS[k], m)
      const fails = ps.filter((p) => contrast(p.fg, p.bg) < p.min).length
      const worst = Math.min(...ps.map((p) => contrast(p.fg, p.bg) / p.min))
      return { k, m, total: ps.length, fails, worst }
    }),
  ),
)
const groups = computed(() => [...new Set(rows.value.map((r) => r.group))])
</script>

<template>
  <div :data-theme="mode === 'dark' ? 'dark' : undefined" class="min-h-dvh bg-page text-ink">
    <div class="mx-auto max-w-[1120px] px-4 py-6 md:px-8">
      <h1 class="page-title">Contrast check · {{ d.key }}. {{ d.name }}</h1>
      <p class="mt-1 max-w-[70ch] text-sm text-muted">
        Every token pair from the Accessibility section of visual-direction.md, against WCAG 2.2 AA: 4.5:1 for text, 3:1 for UI parts (input borders, focus ring, button fills, dots, clash outline).
        Same numbers as <code class="text-ink">pnpm prototype:contrast</code>.
      </p>

      <div class="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        <div v-for="s in summary" :key="s.k + s.m" :class="['tf-card px-3 py-2 text-sm', s.k === dir && s.m === mode ? 'outline-2 outline-focus' : '']">
          <p class="font-semibold">{{ s.k }} · {{ s.m }}</p>
          <p :class="s.fails ? 'text-danger' : 'text-success'" class="flex items-center gap-1">
            <component :is="s.fails ? X : Check" class="size-4 stroke-[1.75]" />{{ s.total - s.fails }}/{{ s.total }} pass
          </p>
          <p class="tnum text-xs text-muted">tightest ×{{ s.worst.toFixed(2) }} of min</p>
        </div>
      </div>

      <div class="mt-6 flex gap-1" role="tablist">
        <button v-for="m in (['light', 'dark'] as Mode[])" :key="m" role="tab" :aria-selected="mode === m"
          :class="['h-9 rounded-control px-3 text-sm font-medium', mode === m ? 'bg-accent text-accent-on' : 'text-muted hover:bg-sunken']" @click="mode = m">
          {{ m === 'light' ? 'Light (launch)' : 'Dark (rough)' }}
        </button>
      </div>

      <h2 class="section-title mt-6">Workspace colours · dot / tint / text</h2>
      <div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div v-for="w in d.workspaces" :key="w.slot" class="flex items-center gap-2 rounded-control border-l-4 px-2.5 py-2 text-sm" :style="{ background: w[mode].tint, color: w[mode].text, borderColor: w[mode].dot }">
          <span class="size-2.5 rounded-full" :style="{ background: w[mode].dot }" />
          <span class="font-semibold">{{ w.slot }} · {{ w.name }}</span>
        </div>
      </div>

      <div class="tf-card mt-6 overflow-x-auto">
        <table class="w-full min-w-[760px] text-left text-sm">
          <thead class="text-xs text-muted">
            <tr class="border-b border-hairline">
              <th class="px-3 py-2 font-medium">Pair</th>
              <th class="px-3 py-2 font-medium">Sample</th>
              <th class="px-3 py-2 font-medium">Tokens</th>
              <th class="px-3 py-2 font-medium">Values</th>
              <th class="px-3 py-2 text-right font-medium">Ratio</th>
              <th class="px-3 py-2 text-right font-medium">Needs</th>
              <th class="px-3 py-2 font-medium">AA</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="g in groups" :key="g">
              <tr><td colspan="7" class="bg-sunken px-3 py-1.5 text-xs font-semibold text-muted">{{ g }}</td></tr>
              <tr v-for="r in rows.filter((x) => x.group === g)" :key="g + r.label" class="border-t border-hairline">
                <td class="px-3 py-2">{{ r.label }}</td>
                <td class="px-3 py-2">
                  <span v-if="r.kind === 'text'" class="inline-block rounded-control px-2 py-0.5 font-medium" :style="{ color: r.fg, background: r.bg }">Aa 18:00</span>
                  <span v-else class="inline-flex h-6 w-14 items-center justify-center rounded-control" :style="{ background: r.bg }"><span class="h-4 w-10 rounded-[3px] border-2" :style="{ borderColor: r.fg }" /></span>
                </td>
                <td class="px-3 py-2 font-mono text-xs text-muted">--{{ r.fgToken }} / --{{ r.bgToken }}</td>
                <td class="px-3 py-2 font-mono text-xs">{{ r.fg }} / {{ r.bg }}</td>
                <td class="tnum px-3 py-2 text-right font-semibold">{{ r.ratio.toFixed(2) }}</td>
                <td class="tnum px-3 py-2 text-right text-muted">{{ r.min }}</td>
                <td class="px-3 py-2">
                  <span v-if="r.ratio >= r.min" class="inline-flex items-center gap-1 font-medium text-success"><Check class="size-4 stroke-[1.75]" />Pass</span>
                  <span v-else class="inline-flex items-center gap-1 font-medium text-danger"><X class="size-4 stroke-[1.75]" />Fail</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <p class="mt-3 max-w-[70ch] text-xs text-muted">
        Dots are always next to the workspace name, so 3:1 there is a nice-to-have, not an AA requirement. Card hairlines are decorative and exempt.
      </p>
    </div>
  </div>
</template>
