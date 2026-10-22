// PROTOTYPE. Inject the direction tokens before the app mounts, so nothing transitions in from unset colours.
import { ALL_CSS } from '~/prototype-visual/tokens'

export default defineNuxtPlugin(() => {
  const style = document.createElement('style')
  style.id = 'tf-tokens'
  style.textContent = ALL_CSS
  document.head.appendChild(style)
  document.documentElement.dataset.dir = new URLSearchParams(location.search).get('dir') || 'B'
})
