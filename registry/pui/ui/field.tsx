"use client"

import * as React from "react"
import { CircleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

type FieldContextValue = {
  controlId: string
  descriptionId: string
  errorId: string
  invalid: boolean
  required: boolean
  parts: { description: boolean; error: boolean }
  register: (part: "description" | "error", present: boolean) => void
  setControlId: (id: string) => void
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

function useField() {
  const field = React.useContext(FieldContext)
  if (!field) throw new Error("Field parts must be used inside <Field>.")
  return field
}

function Field({
  className,
  controlId,
  invalid = false,
  required = false,
  ...props
}: React.ComponentProps<"div"> & {
  /** id given to the control; generated when omitted. */
  controlId?: string
  /** Set after validation finds a problem with the value. */
  invalid?: boolean
  required?: boolean
}) {
  const generatedId = React.useId()
  const [id, setControlId] = React.useState(controlId ?? `field-${generatedId}`)
  const [parts, setParts] = React.useState({ description: false, error: false })
  const register = React.useCallback(
    (part: "description" | "error", present: boolean) =>
      setParts((current) => (current[part] === present ? current : { ...current, [part]: present })),
    []
  )

  return (
    <FieldContext.Provider
      value={{
        controlId: id,
        descriptionId: `${id}-description`,
        errorId: `${id}-error`,
        invalid,
        required,
        parts,
        register,
        setControlId,
      }}
    >
      <div
        data-slot="field"
        data-invalid={invalid || undefined}
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FieldContext.Provider>
  )
}

function FieldLabel({ children, ...props }: React.ComponentProps<typeof Label>) {
  const field = useField()
  return (
    <Label htmlFor={field.controlId} {...props}>
      {children}
      {!field.required && <span className="font-normal text-muted-foreground">(optional)</span>}
    </Label>
  )
}

function FieldControl({ children }: { children: React.ReactElement<Record<string, unknown>> }) {
  const field = useField()
  const control = React.Children.only(children)
  // An id set on the control itself wins; the label and messages follow it
  const ownId = control.props.id as string | undefined
  const { setControlId } = field
  React.useEffect(() => {
    if (ownId) setControlId(ownId)
  }, [ownId, setControlId])

  const describedBy = [
    control.props["aria-describedby"],
    field.parts.description && field.descriptionId,
    field.invalid && field.parts.error && field.errorId,
  ]
    .filter(Boolean)
    .join(" ")

  return React.cloneElement(control, {
    id: ownId ?? field.controlId,
    required: control.props.required ?? (field.required || undefined),
    "aria-invalid": field.invalid || undefined,
    "aria-describedby": describedBy || undefined,
  })
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { descriptionId, register } = useField()
  React.useEffect(() => {
    register("description", true)
    return () => register("description", false)
  }, [register])

  return (
    <p
      data-slot="field-description"
      id={descriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function FieldError({ className, children, ...props }: React.ComponentProps<"p">) {
  const { errorId, invalid, register } = useField()
  const visible = invalid && Boolean(children)
  React.useEffect(() => {
    register("error", visible)
    return () => register("error", false)
  }, [register, visible])

  if (!visible) return null
  return (
    <p
      data-slot="field-error"
      id={errorId}
      className={cn("flex items-start gap-1.5 text-sm text-destructive", className)}
      {...props}
    >
      <CircleAlertIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  )
}

export { Field, FieldLabel, FieldControl, FieldDescription, FieldError }
