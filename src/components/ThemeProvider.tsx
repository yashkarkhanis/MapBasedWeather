import React, { createContext, useContext, useEffect, useState } from 'react'

type Props = {
    
children: React.ReactNode
}

type Theme = "light" | "dark"

type ThemeContextType = {
theme:Theme,
toggletheme:()=> void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default function ThemeProvider({children}: Props) {
 const [theme,setTheme] = useState<Theme>("light")

 useEffect(()=>{
const root = document.documentElement;
if(theme === "dark"){
  root.classList.add("dark")
}else{
  root.classList.remove("dark")
}
 },[theme])
 const toggletheme = () => {
    setTheme((prev) => prev === "light" ? "dark" : "light")
 }
    return (
    <ThemeContext.Provider value={{ theme, toggletheme }}>
        {children}
     </ThemeContext.Provider>   
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}