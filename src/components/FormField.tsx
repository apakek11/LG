import type { ReactNode } from 'react'
import { Icon } from './Icon'

interface FormFieldProps {
  icon: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  autoComplete?: string
  rightSlot?: ReactNode
}

export function FormField({
  icon,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  rightSlot,
}: FormFieldProps) {
  return (
    <label className="flex flex-col gap-space-xs w-full">
      <span className="text-label-lg text-on-surface font-medium">{label}</span>
      <div
        className={`flex items-center gap-space-sm px-4 py-3 bg-surface-container-low rounded-xl border transition-colors ${
          error ? 'border-error' : 'border-outline-variant/30 focus-within:border-outline'
        }`}
      >
        <Icon name={icon} className="text-outline text-[20px]" />
        <input
          className="bg-transparent text-body-md text-on-surface outline-none font-medium placeholder:text-outline w-full"
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {rightSlot}
      </div>
      {error && <span className="text-body-sm text-error">{error}</span>}
    </label>
  )
}
