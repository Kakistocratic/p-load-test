import React from 'react'
import { Media } from '@/components/Media'
import type { Menu } from '@/payload-types'

interface MenuCardProps {
  item: Menu
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const {
    name,
    description,
    price,
    image,
    optionalExtras,
    allergens,
    ingredients,
    temperature,
    isWine,
    wineLabel,
    isBeer,
    beerLabel,
    bottlePrice,
  } = item

  return (
    <div className="flex flex-col border border-border rounded-lg bg-card overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image section with overlaid title and price - fixed height container */}
      {image && typeof image === 'object' ? (
        <div className="relative w-full aspect-5/6 overflow-hidden">
          <Media resource={image} imgClassName="w-full h-full object-cover" />

          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent via-20% to-transparent" />

          {/* Title - top left */}
          <h3 className="absolute top-4 left-4 text-2xl font-bold text-white drop-shadow-lg pr-24">
            {name}
          </h3>

          {/* Price - top right with glass/bottle icons for wine */}
          {isWine ? (
            <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
              {price && (
                <span className="text-xl font-bold text-white bg-primary dark:bg-tertiary/90 px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1.5">
                  <span>🍸</span>
                  {price} kr
                </span>
              )}
              {bottlePrice && (
                <span className="text-lg font-bold text-white bg-primary dark:bg-tertiary/90 px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1.5">
                  <span>🍾</span>
                  {bottlePrice} kr
                </span>
              )}
            </div>
          ) : (
            <span className="absolute top-4 right-4 text-xl font-bold text-white bg-primary dark:bg-tertiary/90 px-3 py-1.5 rounded-md shadow-lg">
              {price} kr
            </span>
          )}

          {/* Wine/Beer labels - bottom left, stacked above temperature */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-1">
            {isWine && wineLabel && (
              <span className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded-md bg-black/50 text-white backdrop-blur-sm">
                <span>🍇</span>
                <span>{wineLabel}</span>
              </span>
            )}
            {isBeer && beerLabel && (
              <span className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded-md bg-black/50 text-white backdrop-blur-sm">
                <span>🌾</span>
                <span>{beerLabel}</span>
              </span>
            )}
            {temperature && (
              <span className="inline-block text-sm px-2 py-1 rounded-md bg-black/50 text-white backdrop-blur-sm">
                {temperature === 'varm' && '🔥 Varm'}
                {temperature === 'kald' && '❄️ Kald'}
                {temperature === 'romtemperatur' && '🌡️ Romtemperatur'}
                {temperature === 'begge' && '🔥❄️ Varm eller kald'}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="relative w-full aspect-5/6 bg-muted flex items-center justify-center">
          <h3 className="absolute top-4 left-4 text-2xl font-bold pr-24">{name}</h3>
          {/* Price - top right with glass/bottle icons for wine */}
          {isWine ? (
            <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
              {price && (
                <span className="text-xl font-bold bg-primary/90 px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1.5">
                  <span>🍸</span>
                  {price} kr
                </span>
              )}
              {bottlePrice && (
                <span className="text-lg font-bold bg-primary/90 px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1.5">
                  <span>🍾</span>
                  {bottlePrice} kr
                </span>
              )}
            </div>
          ) : (
            <span className="absolute top-4 right-4 text-xl font-bold bg-primary/90 px-3 py-1.5 rounded-md shadow-lg">
              {price} kr
            </span>
          )}
          {/* Wine/Beer labels - bottom left, stacked above temperature */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-1">
            {isWine && wineLabel && (
              <span className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded-md bg-muted-foreground/20">
                <span>🍇</span>
                <span>{wineLabel}</span>
              </span>
            )}
            {isBeer && beerLabel && (
              <span className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded-md bg-muted-foreground/20">
                <span>🌾</span>
                <span>{beerLabel}</span>
              </span>
            )}
            {temperature && (
              <span className="inline-block text-sm px-2 py-1 rounded-md bg-muted">
                {temperature === 'varm' && '🔥 Varm'}
                {temperature === 'kald' && '❄️ Kald'}
                {temperature === 'romtemperatur' && '🌡️ Romtemperatur'}
                {temperature === 'begge' && '🔥❄️ Varm eller kald'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content section below image */}
      <div className="p-4 flex flex-col">
        {description && <p className="text-sm text-foreground mb-3 line-clamp-2">{description}</p>}

        {/* Ingredients & Allergens */}
        <div className="space-y-1 text-xs text-muted-foreground">
          {ingredients && ingredients.length > 0 && (
            <div className="line-clamp-1">
              <span className="font-semibold">Ingredienser: </span>
              {ingredients.map((ingredient, index) => (
                <span key={index}>
                  {typeof ingredient === 'object' ? ingredient.name : ingredient}
                  {index < ingredients.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          )}

          {allergens && allergens.length > 0 && (
            <div className="line-clamp-1">
              <span className="font-semibold">Allergener: </span>
              {allergens.map((allergen, index) => (
                <span key={index}>
                  {typeof allergen === 'object' ? allergen.name : allergen}
                  {index < allergens.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Export the compact version as well
export { MenuCardCompact } from './Compact'
