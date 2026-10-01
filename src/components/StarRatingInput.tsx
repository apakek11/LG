import { Icon } from './Icon'

interface StarRatingInputProps {
  value: number
  onChange: (value: number) => void
}

export function StarRatingInput({ value, onChange }: StarRatingInputProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          aria-label={`Beri rating ${star}`}
          className="text-amber-500"
        >
          <Icon name="star" filled={star <= value} className="text-[22px]" />
        </button>
      ))}
    </div>
  )
}
