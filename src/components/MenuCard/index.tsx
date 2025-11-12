import React from 'react'
import { Media } from '@/components/Media'
import type { Menu } from '@/payload-types'

interface MenuCardProps {
  item: Menu
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { name, description, price, image, optionalExtras, allergens, ingredients, temperature } =
    item

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-border rounded-lg bg-card">
      {/* Left Column - Image */}
      <div className="flex items-center justify-center">
        {image && typeof image === 'object' ? (
          <Media resource={image} imgClassName="w-full h-auto object-cover rounded-lg" />
        ) : (
          <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>

      {/* Right Column - Info */}
      <div className="flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-2xl font-semibold">{name}</h3>
            <span className="text-2xl font-bold text-primary whitespace-nowrap">{price} kr</span>
          </div>

          {temperature && (
            <span className="inline-block text-sm text-muted-foreground mb-3 capitalize">
              {temperature === 'varm' && '🔥 Varm'}
              {temperature === 'kald' && '❄️ Kald'}
              {temperature === 'begge' && '🔥❄️ Varm eller kald'}
            </span>
          )}

          {description && <p className="text-base text-foreground mb-4">{description}</p>}
        </div>

        {/* Optional Extras */}
        {optionalExtras && optionalExtras.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Tillegg:</h4>
            <ul className="space-y-1">
              {optionalExtras.map((extra, index) => (
                <li key={index} className="text-sm flex justify-between">
                  <span>{extra.label}</span>
                  <span className="text-muted-foreground">+{extra.price} kr</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer - Allergens & Ingredients */}
        <div className="space-y-2 text-xs text-muted-foreground">
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
    </div>
  )
}

// Export the compact version as well
export { MenuCardCompact } from './Compact'
