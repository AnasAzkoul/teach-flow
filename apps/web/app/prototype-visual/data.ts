// PROTOTYPE. Hard-coded fake data shared by all three directions, so they are compared fairly.
// "Now" is Thu 22 Oct 2026, 11:55. The viewer, Maya, is a senior teacher at Bright School
// (team "Adults & Exams") and has a Personal workspace. Home shows those two, as the brief asks;
// My week adds a third workspace (Riverside Languages, where she is a teacher) to test 3 colours.

export interface Workspace {
  id: string
  name: string
  slot: number // workspace colour slot 1–8
  role: string
}

export const workspaces: Workspace[] = [
  { id: 'personal', name: 'Personal', slot: 1, role: 'Super-admin' },
  { id: 'bright', name: 'Bright School', slot: 2, role: 'Senior teacher' },
  { id: 'riverside', name: 'Riverside Languages', slot: 3, role: 'Teacher' },
]
export const ws = (id: string) => workspaces.find((w) => w.id === id)!

export const me = { name: 'Maya Haddad', initials: 'MH' }
export const now = { day: 'Thursday 22 October', time: '11:55', dayIndex: 3, minutes: 11 * 60 + 55 }

// ---------- Home ----------

export const needsSubstitute = [
  { id: 's1', when: 'Fri 23 Oct · 10:00–11:30', klass: 'Teens B1', place: 'Room 3', reason: 'Daniel R. asked for a substitute', suggestion: 'Suggests Lina M.', action: 'Approve' as const },
  { id: 's2', when: 'Sat 24 Oct · 09:30–11:00', klass: 'Kids A1 Saturday', place: 'Room 1', reason: 'No teacher', suggestion: '', action: 'Choose' as const },
]

export type TodayAction = 'Attach plan' | 'Open plan' | 'Join meeting' | 'Write report' | 'Finish report'
export const today = [
  { id: 't1', start: '09:00', end: '10:30', klass: 'B2 Exam prep', ws: 'bright', place: 'Room 4', participants: 6, action: 'Finish report' as TodayAction, status: 'Report draft · saved 10:41' },
  { id: 't2', start: '12:00', end: '13:00', klass: 'Omar K. · 1:1', ws: 'personal', place: 'Online · Google Meet', participants: 1, action: 'Join meeting' as TodayAction, status: 'Starts in 5 min' },
  { id: 't3', start: '18:00', end: '19:30', klass: 'Adults A2 evening', ws: 'bright', place: 'Room 2', participants: 9, action: 'Attach plan' as TodayAction, status: 'No plan yet' },
]

// Today when nothing is left (?today=done: evening, every report done; ?today=none: no lessons today).
export type TodayState = 'busy' | 'done' | 'none'
export const eveningNow = { time: '20:10' }
export const todayDoneStatus: Record<string, string> = { t1: 'Report done · 10:52', t2: 'Report done · 13:20', t3: 'Report done · 19:48' }
export const nextLesson = { day: 'Fri 23 Oct', time: '09:00', klass: 'Business English' }

export type TodoKind = 'overdue' | 'no-plan' | 'ending' | 'draft' | 'follow-up'
export const todos = [
  { id: 'd1', kind: 'overdue' as TodoKind, title: 'Report overdue', detail: 'Teens B1+ · Tue 20 Oct, 16:00', ws: 'bright', meta: 'Reminded by Noura S. today' },
  { id: 'd2', kind: 'no-plan' as TodoKind, title: 'No plan', detail: 'Business English · Fri 23 Oct, 09:00', ws: 'bright', meta: 'Tomorrow' },
  { id: 'd3', kind: 'ending' as TodoKind, title: 'Class ending soon', detail: 'Omar K. · 1:1 · 5 h of 40 h left', ws: 'personal', meta: '12.5% left' },
  { id: 'd4', kind: 'follow-up' as TodoKind, title: 'Send Ali writing feedback on his opinion essay', detail: 'Linked to B2 Exam prep', ws: 'bright', meta: 'Due Fri' },
]

export const comingUp = [
  { day: 'Friday 23 Oct', items: [
    { time: '09:00', klass: 'Business English', ws: 'bright', noPlan: true },
    { time: '12:00', klass: 'Omar K. · 1:1', ws: 'personal', noPlan: false },
    { time: '18:00', klass: 'Adults B1', ws: 'bright', noPlan: false },
  ] },
  { day: 'Saturday 24 Oct', items: [{ time: '10:00', klass: 'Leila S. · 1:1', ws: 'personal', noPlan: true }] },
  { day: 'Monday 26 Oct', items: [
    { time: '09:00', klass: 'B2 Exam prep', ws: 'bright', noPlan: false },
    { time: '18:00', klass: 'Adults A2 evening', ws: 'bright', noPlan: true },
  ] },
  { day: 'Tuesday 27 Oct', items: [{ time: '12:00', klass: 'Omar K. · 1:1', ws: 'personal', noPlan: false }] },
]

export const teamOverdue = {
  ws: 'bright',
  team: 'Adults & Exams',
  rows: [
    { teacher: 'Daniel R.', klass: 'Teens B1', lesson: 'Mon 19 Oct, 16:00', overdue: '2 days', reminded: false },
    { teacher: 'Lina M.', klass: 'Adults B1', lesson: 'Tue 20 Oct, 18:00', overdue: '1 day', reminded: true },
    { teacher: 'Jonas P.', klass: 'IELTS Writing', lesson: 'Tue 20 Oct, 10:00', overdue: '1 day', reminded: false },
  ],
}

// ---------- Lesson page ----------

export const lesson = {
  klass: 'B2 Exam prep',
  ws: 'bright',
  date: 'Thu 22 Oct',
  time: '09:00–10:30',
  place: 'Room 4',
  teacher: 'Maya Haddad',
  level: 'B2',
  planTitle: 'Opinion essays: linking ideas',
  planSource: 'From library plan “Opinion essays: linking ideas” · used 12×',
  stages: [
    { name: 'Warm-up', minutes: 10, body: 'Students stand on a line from “strongly agree” to “strongly disagree” for three statements about social media and school. Ask two students at each end to justify their position in one sentence.', refs: ['Activity · Opinion line'] },
    { name: 'Lead-in reading', minutes: 15, body: 'Read the model essay “Should homework be banned?” and underline every word that joins two ideas. Pairs compare and sort them into “adding”, “contrasting” and “concluding”.', refs: ['Material · Model essay (PDF)'] },
    { name: 'Language focus: contrast linkers', minutes: 20, body: 'Board work on however, although, whereas, despite and on the other hand. Focus on punctuation and on despite + noun / -ing, which this group keeps getting wrong.', refs: ['Activity · Linker sort', 'Material · Linkers handout'], note: true },
    { name: 'Guided writing', minutes: 30, body: 'Students plan and write one body paragraph (120–150 words) for “Online learning is as effective as classroom learning.” They must use at least three linkers from the board.', refs: [] },
    { name: 'Peer feedback', minutes: 15, body: 'Swap paragraphs. Partners highlight each linker and tick it if it is used correctly, then suggest one improvement.', refs: ['Material · Peer feedback checklist'] },
  ],
  planNote: {
    author: 'Noura Saleh',
    role: 'Admin',
    when: 'Yesterday, 16:20',
    text: 'Nice stage. Could you add one example with “despite the fact that”? Two students mixed it up in last week’s mock exam.',
  },
  lastHomework: 'Workbook p. 42, exercises 1–4, and a 150-word paragraph: “Is it better to study alone or in a group?”',
}

export type Attendance = 'present' | 'late' | 'absent-excused' | 'absent-unexcused'
export type Homework = 'done' | 'partly' | 'not-done' | null // null = was not in the lesson where it was set

export const participants: { name: string; attendance: Attendance; homework: Homework; note: string; guest?: boolean }[] = [
  { name: 'Ali Rahimi', attendance: 'present', homework: 'done', note: 'Strong paragraph structure today and he used “whereas” correctly twice without prompting. Still drops the article before singular countable nouns (“in classroom”, “as teacher”), which will cost him marks in the writing paper. Worth a short focused practice before the mock.' },
  { name: 'Sofia Marquez', attendance: 'late', homework: 'partly', note: 'Arrived 15 minutes late (bus). Did exercises 1–2 only. Confident speaker, but her written linkers are almost all “but” and “and”.' },
  { name: 'Jonas Becker', attendance: 'absent-excused', homework: null, note: '' },
  { name: 'Karim Haddad', attendance: 'absent-unexcused', homework: null, note: 'Second unexcused absence this month. I will mention it to Noura if it happens again.' },
  { name: 'Elena Petrova', attendance: 'present', homework: 'not-done', note: 'Said she forgot. Participated well in the peer feedback stage and spotted two misused linkers in her partner’s text, which shows she understands the rule even when she does not use it herself.' },
  { name: 'Yusuf Demir', attendance: 'present', homework: null, note: 'Joined the class this week, so no homework to check. Placement looks right; quiet but accurate.', guest: false },
]

export const reportFields = {
  covered: 'Contrast linkers (however, although, whereas, despite, on the other hand), with a focus on punctuation and despite + noun / -ing. Model essay reading and one guided body paragraph.',
  homeworkSet: 'Finish the body paragraph at home and write the conclusion (80–100 words). Workbook p. 44, exercises 1–3.',
  generalNotes: 'The group is ready for a full timed essay next week. Linker accuracy is much better than last month, but most students still plan for less than two minutes. Next lesson: a planning race.',
}

// ---------- My week ----------
// Mon 19 – Sun 25 Oct. day: 0 = Mon. Times in minutes from midnight.

export interface WeekLesson {
  id: string
  day: number
  start: number
  end: number
  klass: string
  ws: string
  place: string
  cancelled?: boolean
  clash?: boolean
  noPlan?: boolean // shown only on lessons still to come
}

const t = (h: number, m = 0) => h * 60 + m
export const weekDays = ['Mon 19', 'Tue 20', 'Wed 21', 'Thu 22', 'Fri 23', 'Sat 24', 'Sun 25']
export const weekLessons: WeekLesson[] = [
  { id: 'w1', day: 0, start: t(9), end: t(10, 30), klass: 'B2 Exam prep', ws: 'bright', place: 'Room 4' },
  { id: 'w2', day: 0, start: t(12), end: t(13), klass: 'Omar K. · 1:1', ws: 'personal', place: 'Online' },
  { id: 'w3', day: 0, start: t(18), end: t(19, 30), klass: 'Adults A2 evening', ws: 'bright', place: 'Room 2' },
  { id: 'w4', day: 1, start: t(10), end: t(11, 30), klass: 'Business German', ws: 'riverside', place: 'Riverside · Room B' },
  { id: 'w5', day: 1, start: t(14), end: t(15), klass: 'Leila S. · 1:1', ws: 'personal', place: 'Online', cancelled: true },
  { id: 'w6', day: 1, start: t(16), end: t(17, 30), klass: 'Teens B1+', ws: 'bright', place: 'Room 3' },
  { id: 'w7', day: 2, start: t(9), end: t(10, 30), klass: 'B2 Exam prep', ws: 'bright', place: 'Room 4' },
  { id: 'w8', day: 2, start: t(17, 30), end: t(19), klass: 'Conversation club', ws: 'riverside', place: 'Riverside · Café', clash: true },
  { id: 'w9', day: 2, start: t(18), end: t(19, 30), klass: 'Adults B1', ws: 'bright', place: 'Room 1', clash: true },
  { id: 'w10', day: 3, start: t(9), end: t(10, 30), klass: 'B2 Exam prep', ws: 'bright', place: 'Room 4' },
  { id: 'w11', day: 3, start: t(12), end: t(13), klass: 'Omar K. · 1:1', ws: 'personal', place: 'Online' },
  { id: 'w12', day: 3, start: t(18), end: t(19, 30), klass: 'Adults A2 evening', ws: 'bright', place: 'Room 2', noPlan: true },
  { id: 'w13', day: 4, start: t(9), end: t(10), klass: 'Business English', ws: 'bright', place: 'Client office', noPlan: true },
  { id: 'w14', day: 4, start: t(12), end: t(13), klass: 'Omar K. · 1:1', ws: 'personal', place: 'Online' },
  { id: 'w15', day: 4, start: t(14), end: t(15, 30), klass: 'Business German', ws: 'riverside', place: 'Riverside · Room B', noPlan: true },
  { id: 'w16', day: 5, start: t(10), end: t(11), klass: 'Leila S. · 1:1', ws: 'personal', place: 'Online', noPlan: true },
]

export const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
