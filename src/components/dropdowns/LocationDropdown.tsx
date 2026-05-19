
import type { Dispatch, SetStateAction } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  location: string
  setLocation: Dispatch<SetStateAction<string>>
}

export default function LocationDropdown({ location, setLocation }: Props) {
  return (
    <Select  value={location} onValueChange={(value) => value &&  setLocation(value)} >
  <SelectTrigger className="xs:w-[180px] w-full">
    <SelectValue className="capitalize">
             {location}
            </SelectValue>
  </SelectTrigger>
  <SelectContent className="z-[9999]">
    <SelectGroup>
   {location === "custom" && (
          <SelectItem value="custom">Custom</SelectItem>
        )}
    {locations.map((location) => (
      <SelectItem key={location} value={location}>
        {location}
      </SelectItem>
    ))}
    </SelectGroup>
  </SelectContent>
</Select>
  )
}
const locations = [
  "Tokyo",
  "Seoul",
  "Dubai",
  "Manila",
  "London",
  "New York",
  "Paris",
  "Berlin",
  "Madrid",
  "Rome",
  "Lisbon",
  "Mumbai"
]