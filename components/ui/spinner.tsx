import * as React from "react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="spinner"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-4 animate-spin", className)}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        className="opacity-25"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        className="opacity-75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="4"
      />
    </svg>
  )
}

export { Spinner }
