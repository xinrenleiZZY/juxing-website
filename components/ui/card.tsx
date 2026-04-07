import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 hover:shadow-[0_10px_15px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 cursor-pointer",
        className
      )}
      {...props}
    />
  )
}
