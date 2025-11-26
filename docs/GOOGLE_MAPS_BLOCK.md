# Google Maps Block - Setup Guide

## Overview
A Google Maps block component has been created for your PayloadCMS coffee shop site. The map configuration is stored globally in ContactInfo, allowing you to reuse the same map settings across multiple pages.

## What Was Created

### 1. ContactInfo Global - Google Maps Configuration
**Location:** `src/globals/ContactInfo.ts`

Added a new `googleMapsConfig` group with the following fields:
- **API Key** - Your Google Maps API key (restricted to Maps JavaScript API)
- **Map ID Light** - Your Google Map ID for light theme styling
- **Map ID Dark** - Your Google Map ID for dark theme styling
- **Latitude** - Latitude coordinate for the map marker
- **Longitude** - Longitude coordinate for the map marker
- **Zoom Level** - Map zoom level (1-20, default: 15)
- **Marker Title** - Title to display on the map marker

### 2. MapBlock Component
**Location:** `src/blocks/MapBlock/`

- `config.ts` - Block configuration with fields:
  - **Block Title** - Optional heading above the map
  - **Height** - Small (300px), Medium (450px), or Large (600px)
  - **Enable Container Padding** - Add/remove padding around the map

- `Component.tsx` - Client-side React component that:
  - Fetches Google Maps config from ContactInfo API
  - Dynamically loads Google Maps JavaScript API
  - Renders the map with a marker at the configured location
  - Uses theme-aware Map IDs (switches between light and dark styles based on current theme)
  - Automatically re-renders when theme changes

### 3. Integration
- Registered in `src/collections/Pages/index.ts`
- Registered in `src/blocks/RenderBlocks.tsx`

## Setup Instructions

### Step 1: Configure Google Cloud Console
1. Enable **Maps JavaScript API** in your Google Cloud Console
2. Create an API key and restrict it to:
   - Maps JavaScript API
   - Your website domains
3. Create **two Map IDs** for custom styling:
   - One Map ID for light theme
   - One Map ID for dark theme
   - Style each map appropriately in the Google Cloud Console Map Styles editor

### Step 2: Configure ContactInfo in PayloadCMS Admin
1. Log into your PayloadCMS admin panel
2. Navigate to **Globals → Contact Info**
3. Scroll to **Google Maps Configuration** section
4. Fill in:
   - **API Key**: Your Google Maps API key
   - **Map ID Light**: Your light theme Map ID
   - **Map ID Dark**: Your dark theme Map ID
   - **Latitude**: e.g., 59.9139 (Oslo)
   - **Longitude**: e.g., 10.7522 (Oslo)
   - **Zoom Level**: 15 (or your preferred zoom)
   - **Marker Title**: "Our Coffee Shop" (or your location name)
5. Save the ContactInfo global

### Step 3: Add Map to a Page
1. Edit any page (or create a new one)
2. In the **Content** tab, click **Add Block**
3. Select **Map Block**
4. Configure:
   - **Block Title**: e.g., "Find Us" (optional)
   - **Height**: Choose Small, Medium, or Large
   - **Enable Container Padding**: Checked by default
5. Save and publish the page

## Technical Details

### API Usage
- The component uses **Maps JavaScript API**
- Separate Map IDs for light and dark themes enable theme-aware styling
- The map automatically switches styles when the user toggles between light/dark mode
- API key is loaded client-side via script tag
- The component fetches configuration from `/api/globals/contact-info`

### Theme Integration
- Uses the `useTheme` hook from `@/providers/Theme`
- Monitors theme changes via `useEffect` dependency
- Selects the appropriate Map ID based on current theme (`mapIdDark` or `mapIdLight`)
- Map re-renders when theme changes to apply the correct styling

### Styling
- Map uses theme-specific Map IDs for custom styling
- Map container has rounded corners and border (Tailwind classes)
- Consistent with your site's design system
- Automatically adapts to light/dark mode

### Dependencies Added
- `@types/google.maps` - TypeScript definitions for Google Maps API

## Notes

### Why Store Config in ContactInfo?
Since your coffee shop likely has one physical location, storing the map configuration globally makes sense. You can add the Map Block to multiple pages (Contact, About, Footer, etc.) without duplicating the configuration.

### Security
- Keep your API key restricted to specific domains
- Consider using environment variables for sensitive keys in production
- The current implementation loads the API key client-side, which is standard for Maps JavaScript API

### Customization
You can further customize the map by:
- Adding more marker options in `Component.tsx`
- Styling the map with your Map ID in Google Cloud Console
- Adding info windows, custom markers, or other features
- Adjusting the map controls and options

## Example Page Structure
```
Page: Contact Us
├── Hero
└── Content
    ├── Content Block (contact text)
    ├── Map Block (shows location)
    └── Form Block (contact form)
```

## Troubleshooting

**Map doesn't load:**
- Check browser console for errors
- Verify API key is correct in ContactInfo
- Ensure Maps JavaScript API is enabled
- Check API key restrictions allow your domain

**No marker shown:**
- Verify latitude/longitude are set in ContactInfo
- Check coordinates are valid numbers

**TypeScript errors:**
- Run `pnpm install` to ensure @types/google.maps is installed
- Restart your TypeScript server if needed
