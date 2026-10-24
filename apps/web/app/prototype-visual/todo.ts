// PROTOTYPE. One To do list for everything that needs Maya: her own items and her team's
// (Needs a substitute, Reports overdue, Classes ending soon), replacing the red strip and the team block.
import type { Component } from 'vue'
import { UserRoundX, CircleAlert, Clock, Hourglass, FileText, Circle } from '@lucide/vue'

export type TodoType = 'substitute' | 'overdue' | 'no-plan' | 'ending' | 'draft' | 'follow-up'
export type Urgency = 'now' | 'soon' | 'later'
export type Scope = 'mine' | 'team'

export interface TodoAction { label: string; primary?: boolean; done?: boolean }
export interface TodoItem {
  id: string
  type: TodoType
  urgency: Urgency
  scope: Scope
  title: string // the thing, e.g. "Teens B1 · Fri 23 Oct, 10:00–11:30"
  detail: string // why / who
  ws: string
  meta: string
  actions: TodoAction[]
}

export const TYPES: Record<TodoType, { label: string; plural: string; icon: Component; tone: 'danger' | 'warning' | 'muted' }> = {
  substitute: { label: 'Needs a substitute', plural: 'Needs a substitute', icon: UserRoundX, tone: 'danger' },
  overdue: { label: 'Report overdue', plural: 'Reports overdue', icon: CircleAlert, tone: 'danger' },
  'no-plan': { label: 'No plan', plural: 'No plan', icon: Clock, tone: 'warning' },
  ending: { label: 'Class ending soon', plural: 'Classes ending soon', icon: Hourglass, tone: 'warning' },
  draft: { label: 'Report draft', plural: 'Report drafts', icon: FileText, tone: 'warning' },
  'follow-up': { label: 'Follow-up', plural: 'Follow-ups', icon: Circle, tone: 'muted' },
}
export const TYPE_ORDER: TodoType[] = ['substitute', 'overdue', 'no-plan', 'ending', 'draft', 'follow-up']

export const URGENCY: Record<Urgency, { label: string; hint: string }> = {
  now: { label: 'Needs action now', hint: 'next 48 h or already late' },
  soon: { label: 'Soon', hint: 'this week' },
  later: { label: 'Later', hint: 'follow-ups and the rest' },
}
export const URGENCY_ORDER: Urgency[] = ['now', 'soon', 'later']

export const toneText = { danger: 'text-danger', warning: 'text-warning', muted: 'text-muted' } as const

export const todoItems: TodoItem[] = [
  { id: 's1', type: 'substitute', urgency: 'now', scope: 'team', title: 'Teens B1 · Fri 23 Oct, 10:00–11:30', detail: 'Daniel R. asked for a substitute · suggests Lina M.', ws: 'bright', meta: 'Tomorrow', actions: [{ label: 'Approve Lina', primary: true }, { label: 'Choose teacher' }] },
  { id: 's2', type: 'substitute', urgency: 'now', scope: 'team', title: 'Kids A1 Saturday · Sat 24 Oct, 09:30–11:00', detail: 'No teacher', ws: 'bright', meta: 'In 2 days', actions: [{ label: 'Choose teacher', primary: true }] },
  { id: 'o0', type: 'overdue', urgency: 'now', scope: 'mine', title: 'Teens B1+ · Tue 20 Oct, 16:00', detail: 'Your report · reminded by Noura S. today', ws: 'bright', meta: '1 day overdue', actions: [{ label: 'Finish report', primary: true }] },
  { id: 'o1', type: 'overdue', urgency: 'now', scope: 'team', title: 'Teens B1 · Mon 19 Oct, 16:00', detail: 'Daniel R.', ws: 'bright', meta: '2 days overdue', actions: [{ label: 'Send reminder' }] },
  { id: 'o2', type: 'overdue', urgency: 'now', scope: 'team', title: 'Adults B1 · Tue 20 Oct, 18:00', detail: 'Lina M.', ws: 'bright', meta: '1 day overdue', actions: [{ label: 'Reminded today', done: true }] },
  { id: 'o3', type: 'overdue', urgency: 'now', scope: 'team', title: 'IELTS Writing · Tue 20 Oct, 10:00', detail: 'Jonas P.', ws: 'bright', meta: '1 day overdue', actions: [{ label: 'Send reminder' }] },
  { id: 'p1', type: 'no-plan', urgency: 'soon', scope: 'mine', title: 'Business English · Fri 23 Oct, 09:00', detail: 'No plan attached', ws: 'bright', meta: 'Tomorrow', actions: [{ label: 'Attach plan', primary: true }] },
  { id: 'e1', type: 'ending', urgency: 'soon', scope: 'mine', title: 'Omar K. · 1:1', detail: '5 h of 40 h left', ws: 'personal', meta: '12.5% left', actions: [] },
  { id: 'e2', type: 'ending', urgency: 'soon', scope: 'team', title: 'Adults B1', detail: 'Lina M. recommends more hours · 9 h of 48 h left', ws: 'bright', meta: '19% left', actions: [{ label: 'Discuss' }] },
  { id: 'f1', type: 'follow-up', urgency: 'later', scope: 'mine', title: 'Send Ali writing feedback on his opinion essay', detail: 'Linked to B2 Exam prep', ws: 'bright', meta: 'Due Fri', actions: [] },
]

export interface TodoFilter { urgency: Urgency | 'all'; type: TodoType | 'all'; scope: Scope | 'all' }
export const applyFilter = (items: TodoItem[], f: TodoFilter) =>
  items.filter((i) => (f.urgency === 'all' || i.urgency === f.urgency) && (f.type === 'all' || i.type === f.type) && (f.scope === 'all' || i.scope === f.scope))

export const countBy = <K extends string>(items: TodoItem[], key: (i: TodoItem) => K) =>
  items.reduce((acc, i) => ((acc[key(i)] = (acc[key(i)] ?? 0) + 1), acc), {} as Partial<Record<K, number>>)
