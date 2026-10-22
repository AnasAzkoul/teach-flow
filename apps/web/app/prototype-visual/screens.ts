// PROTOTYPE. The fixed set of screens and states from visual-direction.md.
export const SCREENS = [
  { key: 'home', label: 'Home' },
  { key: 'lesson-plan', label: 'Lesson · Plan' },
  { key: 'lesson-report', label: 'Lesson · Report' },
  { key: 'week', label: 'My week' },
  { key: 'week-dark', label: 'My week · dark' },
  { key: 'contrast', label: 'Contrast check' },
] as const
export type ScreenKey = (typeof SCREENS)[number]['key']
