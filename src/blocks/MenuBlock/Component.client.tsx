'use client'

import React, { useState, useMemo } from 'react'
import type { Menu as MenuItem } from '@/payload-types'
import { MenuCard, MenuCardCompact } from '@/components/MenuCard'

interface MenuBlockComponentProps {
  menuItems: MenuItem[]
  heading?: string | null
  showFilters?: boolean | null
}

export const MenuBlockComponent: React.FC<MenuBlockComponentProps> = ({
  menuItems,
  heading,
  showFilters = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTemperature, setSelectedTemperature] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  // Extract unique categories from menu items
  const categories = useMemo(() => {
    const cats = new Map<string, string>()
    menuItems.forEach((item) => {
      if (item.category && typeof item.category === 'object' && item.category !== null) {
        cats.set(String(item.category.id), item.category.name)
      }
    })
    return Array.from(cats, ([id, name]) => ({ id, name }))
  }, [menuItems])

  // Filter menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (
          typeof item.category === 'object' &&
          item.category !== null &&
          String(item.category.id) !== selectedCategory
        ) {
          return false
        }
      }

      // Temperature filter
      if (selectedTemperature !== 'all' && item.temperature !== selectedTemperature) {
        return false
      }

      // Type filter (drink/food)
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false
      }

      return true
    })
  }, [menuItems, selectedCategory, selectedTemperature, selectedType])

  // Separate items with and without images
  const withImages = filteredItems.filter((item) => !item.noImage)
  const withoutImages = filteredItems.filter((item) => item.noImage)

  return (
    <div className="container my-12">
      {heading && <h2 className="text-4xl font-bold mb-8">{heading}</h2>}

      {/* Filters */}
      {showFilters && (
        <div className="mb-8 p-6 bg-card border border-border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium mb-2">
                Kategori
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">Alle kategorier</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Temperature Filter */}
            <div>
              <label htmlFor="temperature-filter" className="block text-sm font-medium mb-2">
                Temperatur
              </label>
              <select
                id="temperature-filter"
                value={selectedTemperature}
                onChange={(e) => setSelectedTemperature(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">Alle</option>
                <option value="varm">Varm</option>
                <option value="kald">Kald</option>
                <option value="begge">Begge</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label htmlFor="type-filter" className="block text-sm font-medium mb-2">
                Type
              </label>
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">Alle</option>
                <option value="drink">Drikke</option>
                <option value="food">Mat</option>
              </select>
            </div>
          </div>

          {/* Active filters indicator */}
          {(selectedCategory !== 'all' ||
            selectedTemperature !== 'all' ||
            selectedType !== 'all') && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Aktive filtre:</span>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedTemperature('all')
                  setSelectedType('all')
                }}
                className="text-sm text-primary hover:underline"
              >
                Nullstill alle
              </button>
            </div>
          )}
        </div>
      )}

      {/* No results message */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Ingen menyelementer matcher filtrene dine.</p>
        </div>
      )}

      {/* Menu Items with Images (full width) */}
      {withImages.length > 0 && (
        <div className="space-y-6 mb-8">
          {withImages.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Menu Items without Images (grid layout) */}
      {withoutImages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {withoutImages.map((item) => (
            <MenuCardCompact key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
