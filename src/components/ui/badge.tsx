import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const typeStyles: Record<string, string> = {
  normal: "bg-[#A8A77A] text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  fighting: "bg-[#C22E28] text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  flying: "bg-[#A98FF3] text-black border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  poison: "bg-[#A33EA1] text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  ground: "bg-[#E2BF65] text-black border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  rock: "bg-[#B6A136] text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  bug: "bg-[#A6B91A] text-black border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  ghost: "bg-[#735797] text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  steel: "bg-[#B7B7CE] text-black border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  fire: "bg-[#EE8130] text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  water: "bg-[#6390F0] text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  grass: "bg-[#7AC74C] text-black border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  electric: "bg-[#F7D02C] text-black border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  psychic: "bg-[#F95587] text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  ice: "bg-[#96D9D6] text-black border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  dragon: "bg-[#6F35FC] text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  dark: "bg-[#705746] text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  fairy: "bg-[#D685AD] text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  stellar: "bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 via-yellow-500 via-green-500 to-blue-500 text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  unknown: "bg-[#68A090] text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
  shadow: "bg-[#3e3050] text-white border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
};

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-none border-0 bg-transparent px-0 py-0 text-[0.625rem] font-semibold tracking-widest whitespace-nowrap uppercase transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-0 has-data-[icon=inline-start]:pl-0 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "text-foreground [a]:hover:text-foreground/70",
        secondary: "text-muted-foreground [a]:hover:text-foreground",
        destructive:
          "text-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:text-destructive/70",
        outline: "text-foreground [a]:hover:text-foreground/70",
        ghost: "text-muted-foreground hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  type,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean; type?: string }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(
        type
          ? cn("inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden text-[0.625rem] font-arcade tracking-wider uppercase transition-colors", typeStyles[type.toLowerCase()] || typeStyles.unknown)
          : badgeVariants({ variant }),
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
