import React, { type Dispatch, type SetStateAction } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {  
    mapType: string
  setMaptype: Dispatch<SetStateAction<string>>}

export default function MapTypeDropDown({mapType,setMaptype}: Props) {
  return (
     <Select value={mapType} onValueChange={(value) => value &&  setMaptype(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue  />
      </SelectTrigger>
      <SelectContent className="z-[9999]">
        <SelectGroup>
        {mapTypes.map((map) => (
          <SelectItem key={map} value={map}>
            {map}
          </SelectItem>
        ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const mapTypes = [
  "clouds_new",
  "clouds_old",
  "precipitation_new",
  "precipitation_old",
  "pressure_new",
  "pressure_old",
  "wind_new",
  "wind_old"
]