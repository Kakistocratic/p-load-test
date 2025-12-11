import React from 'react'
import { CocktailIcon } from '@/components/icons/CocktailIcon'
import { BottleIcon } from '@/components/icons/BottleIcon'

type CardPriceVariant = 'compact' | 'card'

interface CardPriceProps {
  price?: number | null
  bottlePrice?: number | null
  isWine?: boolean | null
  variant: CardPriceVariant
}

export const CardPrice: React.FC<CardPriceProps> = ({ price, bottlePrice, isWine, variant }) => {
  // Centralized text size control
  const priceTextSize = 'text-2xl'
  // Icon spacing control
  const iconGap = 'gap-2'

  // Compact variant - no image
  if (variant === 'compact') {
    if (isWine) {
      return (
        <div className="flex flex-col items-end gap-0.5">
          {price && (
            <span
              className={`${priceTextSize} font-bold text-primary whitespace-nowrap flex items-center ${iconGap}`}
            >
              <CocktailIcon useDarkMode />
              {price} kr
            </span>
          )}
          {bottlePrice && (
            <span
              className={`${priceTextSize} font-bold text-primary whitespace-nowrap flex items-center ${iconGap}`}
            >
              <BottleIcon useDarkMode />
              {bottlePrice} kr
            </span>
          )}
        </div>
      )
    }
    return (
      <span className={`${priceTextSize} font-bold text-primary whitespace-nowrap`}>
        {price} kr
      </span>
    )
  }

  // Card variant - with image
  if (variant === 'card') {
    if (isWine) {
      return (
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
          {price && (
            <span
              className={`${priceTextSize} font-bold text-white bg-primary dark:bg-tertiary/90 px-3 py-1.5 rounded-md shadow-lg flex items-center ${iconGap}`}
            >
              <CocktailIcon color="#f7e7cf" />
              {price} kr
            </span>
          )}
          {bottlePrice && (
            <span
              className={`${priceTextSize} font-bold text-white bg-primary dark:bg-tertiary/90 px-3 py-1.5 rounded-md shadow-lg flex items-center ${iconGap}`}
            >
              <BottleIcon color="#f7e7cf" />
              {bottlePrice} kr
            </span>
          )}
        </div>
      )
    }
    return (
      <span
        className={`absolute top-4 right-4 ${priceTextSize} font-bold text-white bg-primary dark:bg-tertiary/90 px-3 py-1.5 rounded-md shadow-lg`}
      >
        {price} kr
      </span>
    )
  }

  return null
}
