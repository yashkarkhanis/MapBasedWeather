import React, { type Dispatch, type SetStateAction } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {  
    mapType: string
  setMaptype: Dispatch<SetStateAction<string>>}

export default function MapTypeDropDown({mapType,setMaptype}: Props) {
  return (
     <Select value={mapType} onValueChange={(value) => value &&  setMaptype(value)}>
      <SelectTrigger className=" w-full xs:w-[180px]">
        <SelectValue className="capitalize">
          {mapType.split("_")[0]}
         </SelectValue>
      </SelectTrigger>
      <SelectContent className="z-[9999]">
        <SelectGroup>
        {mapTypes.map((map) => (
          <SelectItem key={map} value={map} className="capitalize">
            {map.split("_")[0]}
          </SelectItem>
        ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const mapTypes = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new",
]