'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'
import { useTheme } from '@/providers/Theme'
import { Media } from '@/components/Media'

type MapBlockProps = {
  blockType: 'mapBlock'
  blockTitle?: string | null
  height?: 'small' | 'medium' | 'large' | null
  enableGutter?: boolean | null
}

type Props = MapBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const MapBlock: React.FC<Props> = (props) => {
  const {
    blockTitle,
    className,
    enableGutter = true,
    height = 'medium',
    disableInnerContainer,
  } = props
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [placeholderImages, setPlaceholderImages] = React.useState<{
    desktop: any
    mobile: any
  } | null>(null)
  const { theme } = useTheme()

  const heightMap: Record<'small' | 'medium' | 'large', string> = {
    small: '300px',
    medium: '450px',
    large: '600px',
  }

  // Fetch placeholder images
  useEffect(() => {
    const fetchPlaceholderImages = async () => {
      try {
        const response = await fetch('/api/globals/contact-info')
        if (!response.ok) return
        const data = await response.json()
        const config = data?.googleMapsConfig
        if (config?.placeholderImageDesktop || config?.placeholderImageMobile) {
          setPlaceholderImages({
            desktop: config.placeholderImageDesktop,
            mobile: config.placeholderImageMobile,
          })
        }
      } catch (err) {
        console.error('Error fetching placeholder images:', err)
      }
    }
    fetchPlaceholderImages()
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    const loadGoogleMapsScript = async () => {
      try {
        // Fetch contact info from the API
        const response = await fetch('/api/globals/contact-info')

        if (!response.ok) {
          throw new Error(`Failed to fetch contact info: ${response.statusText}`)
        }

        const data = await response.json()

        const googleMapsConfig = data?.googleMapsConfig

        if (
          !googleMapsConfig?.apiKey ||
          !googleMapsConfig?.latitude ||
          !googleMapsConfig?.longitude
        ) {
          const errorMsg =
            'Google Maps configuration is incomplete. Please configure API Key, Latitude, and Longitude in ContactInfo global settings.'
          console.error(errorMsg, 'Received config:', googleMapsConfig)
          setError(errorMsg)
          return
        }

        const {
          apiKey,
          mapId,
          styleIdLight,
          styleIdDark,
          latitude,
          longitude,
          zoomLevel = 15,
          markerTitle,
        } = googleMapsConfig

        // Select the appropriate style ID based on current theme
        const currentStyleId = theme === 'dark' ? styleIdDark : styleIdLight

        // Define initialization function
        const initializeMap = () => {
          if (!mapRef.current || mapInstanceRef.current) return

          // Wait for google.maps to be fully loaded
          if (!window.google?.maps?.Map) {
            console.error('Google Maps not loaded properly')
            setError('Failed to load Google Maps library')
            return
          }

          try {
            const mapOptions: google.maps.MapOptions = {
              center: { lat: latitude, lng: longitude },
              zoom: zoomLevel,
              mapId: mapId || undefined,
            }

            const map = new google.maps.Map(mapRef.current!, mapOptions)
            mapInstanceRef.current = map

            // Add marker
            new google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: map,
              title: markerTitle || 'Our Location',
            })
          } catch (err) {
            console.error('Error initializing map:', err)
            setError('Failed to initialize map')
          }
        }

        // Check if script is already loaded
        if (window.google?.maps?.Map) {
          initializeMap()
          return
        }

        // Check if script is already being loaded
        const existingScript = document.querySelector(
          `script[src*="maps.googleapis.com/maps/api/js"]`,
        )
        if (existingScript) {
          // Script is loading, wait for it
          existingScript.addEventListener('load', initializeMap)
          return
        }

        // Create unique callback name
        const callbackName = `initMap_${Date.now()}`

        // Set up callback
        ;(window as any)[callbackName] = () => {
          initializeMap()
          // Cleanup callback
          delete (window as any)[callbackName]
        }

        // Load Google Maps script with callback and style_id
        const script = document.createElement('script')
        const styleParam = currentStyleId ? `&style_id=${currentStyleId}` : ''
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&map_ids=${mapId}${styleParam}&callback=${callbackName}`
        script.async = true
        script.defer = true
        script.onerror = () => {
          setError('Failed to load Google Maps script')
          delete (window as any)[callbackName]
        }
        document.head.appendChild(script)
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Error loading Google Maps'
        console.error('Error loading Google Maps:', error)
        setError(errorMsg)
      }
    }

    loadGoogleMapsScript()

    // Cleanup function
    return () => {
      mapInstanceRef.current = null
    }
  }, [isLoaded, theme]) // Re-run when map is loaded or theme changes

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter && !disableInnerContainer,
        },
        className,
      )}
    >
      {blockTitle && <h2 className="mb-6 text-3xl font-bold">{blockTitle}</h2>}
      {!isLoaded && placeholderImages && (
        <div
          onClick={() => setIsLoaded(true)}
          className="relative w-full border border-border overflow-hidden cursor-pointer group block leading-[0]"
          style={{ height: heightMap[height || 'medium'] }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsLoaded(true)}
          aria-label="Load interactive map"
        >
          {/* Desktop placeholder */}
          {placeholderImages.desktop && typeof placeholderImages.desktop === 'object' && (
            <Media
              resource={placeholderImages.desktop}
              imgClassName="hidden lg:block w-full h-full object-cover"
            />
          )}
          {/* Mobile placeholder */}
          {placeholderImages.mobile && typeof placeholderImages.mobile === 'object' && (
            <Media
              resource={placeholderImages.mobile}
              imgClassName="block lg:hidden w-full h-full object-cover"
            />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center leading-normal">
            <div className="bg-primary dark:bg-tertiary text-tertiary dark:text-foreground px-6 py-3 rounded-lg shadow-lg">
              <span className="text-lg font-semibold">Last Google Kart</span>
            </div>
          </div>
        </div>
      )}
      {!isLoaded && !placeholderImages && (
        <button
          onClick={() => setIsLoaded(true)}
          className="w-full border-2 border-dashed border-border hover:border-gray-400 transition-colors cursor-pointer flex items-center justify-center"
          style={{ height: heightMap[height || 'medium'] }}
          aria-label="Load interactive map"
        >
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Trykk for å laste</p>
            <p className="text-sm text-gray-500">Interaktivt Google Kart</p>
          </div>
        </button>
      )}
      {error ? (
        <div
          className="w-full border border-red-500 bg-red-50 p-8 flex items-center justify-center"
          style={{ height: heightMap[height || 'medium'] }}
        >
          <div className="text-center">
            <p className="text-red-700 font-semibold mb-2">Map Configuration Error</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      ) : isLoaded ? (
        <div
          ref={mapRef}
          className="w-full border border-border overflow-hidden"
          style={{ height: heightMap[height || 'medium'] }}
        />
      ) : null}
    </div>
  )
}
