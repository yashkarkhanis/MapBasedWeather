import React from 'react'
import { Switch } from './ui/switch'
import Light from "/src/assets/sun.svg?react"
import Dark from "/src/assets/moon.svg?react"
import { useTheme } from './ThemeProvider'

type Props = {}

export default function LightDarkToggle({}: Props) {
    const { theme, toggletheme } = useTheme()
  return (
  <div className='flex items-center gap-2'>
      <Light className='size-5 '/>
        <Switch checked={theme === "dark"} onCheckedChange={toggletheme} />
      <Dark className='size-5 '/>
  </div>
  )
}