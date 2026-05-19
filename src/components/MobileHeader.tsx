import React from 'react'
import Hamburger from "/src/assets/Hamburger.svg?react"
type Props = {
    setisSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MobileHeader({setisSidePanelOpen}: Props) {
  return (
    <div className="w-full  h-16 p-4 bg-background sticky top-0 xs:hidden flex gap-8 justify-end z-1001">
        <button onClick={() => setisSidePanelOpen(true)}> 
            <Hamburger className="size-6  "/> 
            </button>
    </div>
  )
}