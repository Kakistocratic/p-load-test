import React from 'react'
import type { Menu } from '@/payload-types'

interface MenuCardCompactProps {
  item: Menu
}

export const MenuCardCompact: React.FC<MenuCardCompactProps> = ({ item }) => {
  const { name, description, price, optionalExtras, allergens, ingredients, temperature } = item

  return (
    <div className="p-4 border border-border rounded-lg bg-card h-full flex flex-col">
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-lg font-semibold leading-tight">{name}</h3>
          <span className="text-lg font-bold text-primary whitespace-nowrap">{price} kr</span>
        </div>

        {temperature && (
          <span className="inline-block text-xs text-muted-foreground capitalize">
            {temperature === 'varm' && 'Varm'}
            {temperature === 'kald' && 'Kald'}
            {temperature === 'begge' && 'Varm eller kald'}
          </span>
        )}
      </div>

      {/* Description */}
      {description && <p className="text-sm text-foreground mb-3 flex-grow">{description}</p>}

      {/* Optional Extras */}
      {optionalExtras && optionalExtras.length > 0 && (
        <div className="mb-3">
          <h4 className="text-xs font-semibold mb-1">Tillegg:</h4>
          <ul className="space-y-0.5">
            {optionalExtras.map((extra, index) => (
              <li key={index} className="text-xs flex justify-between">
                <span>{extra.label}</span>
                <span className="text-muted-foreground">+{extra.price} kr</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer - Allergens & Ingredients */}
      <div className="space-y-1 text-xs text-muted-foreground mt-auto">
        {ingredients && ingredients.length > 0 && (
          <div>
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
          <div>
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
  )
}
