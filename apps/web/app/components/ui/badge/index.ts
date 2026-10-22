import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Badge } from "./Badge.vue"

export const badgeVariants = cva(
  // Quiet by default: coloured text and icon on a light tint, never a solid fill.
  "inline-flex items-center gap-1 rounded-control px-1.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:stroke-[1.75]",
  {
    variants: {
      variant: {
        neutral: "bg-sunken text-muted",
        danger: "bg-danger-tint text-danger",
        warning: "bg-warning-tint text-warning",
        success: "bg-success-tint text-success",
        accent: "bg-accent-soft text-accent",
        outline: "border border-hairline text-muted",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
)
export type BadgeVariants = VariantProps<typeof badgeVariants>
