"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function PasswordInput({
  className,
  showLabel = "Show password",
  hideLabel = "Hide password",
  autoComplete = "current-password",
  ...props
}: Omit<React.ComponentProps<"input">, "type"> & {
  /** Button text while the password is hidden. */
  showLabel?: string
  /** Button text while the password is visible. */
  hideLabel?: string
}) {
  const [visible, setVisible] = React.useState(false)

  return (
    <div data-slot="password-input" className="flex items-center gap-2">
      <Input
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        className={cn("flex-1", className)}
        {...props}
      />
      <Button
        type="button"
        variant="outline"
        aria-controls={props.id}
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? <EyeOffIcon aria-hidden="true" /> : <EyeIcon aria-hidden="true" />}
        {visible ? hideLabel : showLabel}
      </Button>
    </div>
  )
}

export { PasswordInput }
