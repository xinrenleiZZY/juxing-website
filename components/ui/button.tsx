import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          {
            // Primary - CTA color
            "bg-[#0369A1] text-white shadow-md hover:opacity-90 hover:-translate-y-0.5 focus-visible:ring-[#0369A1]":
              variant === "primary",
            // Secondary - Primary color
            "bg-transparent text-[#0F172A] border-2 border-[#0F172A] hover:bg-[#0F172A] hover:text-white focus-visible:ring-[#0F172A]":
              variant === "secondary",
            // Outline
            "border-2 border-[#334155] bg-transparent text-[#334155] hover:border-[#0F172A] hover:bg-[#F8FAFC] focus-visible:ring-[#334155]":
              variant === "outline",
          },
          {
            "h-9 px-4 text-sm": size === "sm",
            "h-11 px-6 text-base": size === "md",
            "h-14 px-8 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
