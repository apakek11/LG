import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="w-full bg-primary-container text-on-primary-container px-6 lg:px-12 py-space-xl">
      <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
        <span className="text-label-md text-secondary-container font-bold tracking-wider uppercase">{eyebrow}</span>
        <h1 className="text-headline-lg text-on-primary max-w-2xl">{title}</h1>
        <p className="text-body-lg text-on-primary-container max-w-xl">{description}</p>
        {children}
      </div>
    </section>
  )
}
