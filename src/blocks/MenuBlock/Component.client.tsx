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

  // Group filtered items by category
  const groupedByCategory = useMemo(() => {
    const groups = new Map<
      string,
      { categoryName: string; order: number; withImages: MenuItem[]; withoutImages: MenuItem[] }
    >()

    filteredItems.forEach((item) => {
      if (item.category && typeof item.category === 'object' && item.category !== null) {
        const categoryId = String(item.category.id)
        const categoryName = item.category.name
        const categoryOrder = item.category.order || 0

        if (!groups.has(categoryId)) {
          groups.set(categoryId, {
            categoryName,
            order: categoryOrder,
            withImages: [],
            withoutImages: [],
          })
        }

        const group = groups.get(categoryId)!
        if (item.noImage) {
          group.withoutImages.push(item)
        } else {
          group.withImages.push(item)
        }
      }
    })

    // Convert to array and sort by category order
    return Array.from(groups.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => a.order - b.order)
  }, [filteredItems])

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

      {/* Menu items grouped by category */}
      {groupedByCategory.length > 0 ? (
        groupedByCategory.map((group) => (
          <div key={group.id} className="mb-16">
            {/* Category heading */}
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">{group.categoryName}</h2>

            {/* Items with images */}
            {group.withImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                {group.withImages.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {/* Items without images (compact layout) */}
            {group.withoutImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {group.withoutImages.map((item) => (
                  <MenuCardCompact key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Ingen menyelementer matcher filtrene dine.</p>
        </div>
      )}
    </div>
  )
}
