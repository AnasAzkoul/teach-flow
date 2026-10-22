import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  // Tuned for Teach Flow: control radius token, accent focus ring with 2px offset, no shadow.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:stroke-[1.5] shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-on hover:bg-accent-hover",
        destructive: "bg-danger-strong text-danger-on hover:opacity-90",
        "danger-quiet": "border border-field bg-surface text-danger hover:bg-danger-tint",
        outline: "border border-field bg-surface text-ink hover:bg-sunken",
        ghost: "text-ink hover:bg-sunken",
        link: "tf-link h-auto! px-0!",
        "on-danger": "bg-danger-on text-danger hover:opacity-90",
        "on-danger-outline": "border border-danger-on/70 text-danger-on hover:bg-danger-on/10",
      },
      size: {
        default: "h-11 px-4 md:h-9 has-[>svg]:px-3",
        sm: "h-11 gap-1.5 px-3 md:h-8 has-[>svg]:px-2.5",
        lg: "h-12 px-6 md:h-10 has-[>svg]:px-4",
        icon: "size-11 md:size-9",
        "icon-sm": "size-11 md:size-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
