'use client'

import React, { useEffect, useState } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'
import { cn } from '@/utilities/ui'

interface ThemeSelectorProps {
  textColorClass?: string
  showIcon?: boolean
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  textColorClass,
  showIcon = false,
}) => {
  const { setTheme, theme: currentTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)

    if (!preference) {
      // Currently in auto mode, switch to light
      setTheme('light')
    } else if (preference === 'light') {
      // Switch to dark
      setTheme('dark')
    } else {
      // Switch back to auto
      setTheme(null)
    }
  }

  // Helper component for the icon with proper coloring
  const ThemeIcon: React.FC<{ theme: string; className?: string }> = ({ theme, className }) => {
    return (
      <svg
        className={cn('w-5 h-5 fill-current transition-opacity', className)}
        viewBox="0 0 511 484"
        xmlns="http://www.w3.org/2000/svg"
      >
        {theme === 'dark' ? (
          <g transform="matrix(3.01333,-0.705192,0.705192,3.01333,-994.321,-459.66)">
            <path d="M396.161,337.366C386.1,356.197 366.246,369.023 343.421,369.023C310.441,369.023 283.665,342.247 283.665,309.267C283.665,276.709 309.76,250.198 342.158,249.525C333.67,259.041 328.509,271.588 328.509,285.331C328.509,315.04 352.629,339.16 382.338,339.16C387.116,339.16 391.75,338.536 396.161,337.366Z" />
          </g>
        ) : (
          <g transform="matrix(2.34886,0,0,2.34886,-226.345,-158.759)">
            <g transform="matrix(1,0,0,1.01961,-0.789762,-1.81922)">
              <path d="M216.152,80.139L216.152,94.088C216.152,99.621 211.572,104.114 205.93,104.114C200.288,104.114 195.708,99.621 195.708,94.088L195.708,80.139C195.708,74.606 200.288,70.114 205.93,70.114C211.572,70.114 216.152,74.606 216.152,80.139Z" />
            </g>
            <g transform="matrix(0.707107,-0.707107,0.720972,0.720972,-62.4063,194.301)">
              <path d="M216.152,80.139L216.152,94.088C216.152,99.621 211.572,104.114 205.93,104.114C200.288,104.114 195.708,99.621 195.708,94.088L195.708,80.139C195.708,74.606 200.288,70.114 205.93,70.114C211.572,70.114 216.152,74.606 216.152,80.139Z" />
            </g>
            <g transform="matrix(0,-1,1.01961,0,32.7024,376.549)">
              <path d="M216.152,80.139L216.152,94.088C216.152,99.621 211.572,104.114 205.93,104.114C200.288,104.114 195.708,99.621 195.708,94.088L195.708,80.139C195.708,74.606 200.288,70.114 205.93,70.114C211.572,70.114 216.152,74.606 216.152,80.139Z" />
            </g>
            <g transform="matrix(-0.707107,-0.707107,0.720972,-0.720972,228.823,438.165)">
              <path d="M216.152,80.139L216.152,94.088C216.152,99.621 211.572,104.114 205.93,104.114C200.288,104.114 195.708,99.621 195.708,94.088L195.708,80.139C195.708,74.606 200.288,70.114 205.93,70.114C211.572,70.114 216.152,74.606 216.152,80.139Z" />
            </g>
            <g transform="matrix(-1,1.22465e-16,-1.24866e-16,-1.01961,411.07,343.057)">
              <path d="M216.152,80.139L216.152,94.088C216.152,99.621 211.572,104.114 205.93,104.114C200.288,104.114 195.708,99.621 195.708,94.088L195.708,80.139C195.708,74.606 200.288,70.114 205.93,70.114C211.572,70.114 216.152,74.606 216.152,80.139Z" />
            </g>
            <g transform="matrix(0.707107,0.707107,-0.720972,0.720972,181.458,-96.9279)">
              <path d="M216.152,80.139L216.152,94.088C216.152,99.621 211.572,104.114 205.93,104.114C200.288,104.114 195.708,99.621 195.708,94.088L195.708,80.139C195.708,74.606 200.288,70.114 205.93,70.114C211.572,70.114 216.152,74.606 216.152,80.139Z" />
            </g>
            <g transform="matrix(0,1,-1.01961,0,377.578,-35.3114)">
              <path d="M216.152,80.139L216.152,94.088C216.152,99.621 211.572,104.114 205.93,104.114C200.288,104.114 195.708,99.621 195.708,94.088L195.708,80.139C195.708,74.606 200.288,70.114 205.93,70.114C211.572,70.114 216.152,74.606 216.152,80.139Z" />
            </g>
            <g transform="matrix(-0.707107,0.707107,-0.720972,-0.720972,472.687,146.936)">
              <path d="M216.152,80.139L216.152,94.088C216.152,99.621 211.572,104.114 205.93,104.114C200.288,104.114 195.708,99.621 195.708,94.088L195.708,80.139C195.708,74.606 200.288,70.114 205.93,70.114C211.572,70.114 216.152,74.606 216.152,80.139Z" />
            </g>
            <g transform="matrix(1,0,0,1,-3.93284,0)">
              <circle cx="209.073" cy="170.619" r="46.427" />
            </g>
          </g>
        )}
      </svg>
    )
  }

  if (!mounted) {
    return null // Avoid hydration mismatch
  }

  if (showIcon) {
    // Toggle switch version with both icons
    return (
      <button
        onClick={handleToggle}
        className={cn(
          'relative flex items-center gap-1 px-2 py-1 rounded-full border-2 transition-all',
          textColorClass ? `border-current ${textColorClass}` : 'border-border',
        )}
        aria-label="Toggle theme"
      >
        <ThemeIcon
          theme="light"
          className={cn(textColorClass, currentTheme === 'light' ? 'opacity-100' : 'opacity-30')}
        />
        <ThemeIcon
          theme="dark"
          className={cn(textColorClass, currentTheme === 'dark' ? 'opacity-100' : 'opacity-30')}
        />
      </button>
    )
  }

  // Footer simple text version (original dropdown behavior)
  return (
    <button
      onClick={handleToggle}
      className={cn('text-lg hover:opacity-80 transition-opacity', textColorClass)}
      aria-label="Toggle theme"
    >
      {currentTheme === 'light' ? 'Lys' : 'Mørk'}
    </button>
  )
}
