import { useSuspenseQuery } from '@tanstack/react-query'
import { getWeather } from '../../api'
import Cards from './Cards'
import Sunrise from "/src/assets/sunrise.svg?react"
import Sunset from "/src/assets/sunset.svg?react"
import Cloud from "/src/assets/cloud.svg?react"
import Uv from "/src/assets/uv.svg?react"
import Wind from "/src/assets/wind.svg?react"
import Pressure from "/src/assets/pressure.svg?react"
import UpArrow from "/src/assets/uparrow.svg?react"
import type { Coords } from '../../types'

type Props = {
    coords:Coords
}

export default function AdditionalInfo({coords}: Props) {
   const { data } = useSuspenseQuery({
        queryKey: ['weather',coords],
        queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon })

    })
const rows =[
    {
        label:"Cloudiness(%)",
        value:data.current.clouds,
        Icon:Cloud

    },
     {
        label:"UV Index",
        value:data.current.uvi,
        Icon:Uv

    },
     {
        label:"Wind Direction",
        value:data.current.wind_deg,
        Icon:Wind

    },
     {
        label:"Pressure (hpa)",
        value:data.current.pressure,
        Icon:Pressure

    },
     {
        label:"Sunrise",
        value:data.current.sunrise,
        Icon:Sunrise

    },
     {
        label:"Sunset",
        value:data.current.sunset,
        Icon:Sunset

    },
  ]

    return (
    <Cards title='Additional Weather Info'  childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8">
        {rows.map(({label,value,Icon})=>(
            <div className="flex justify-between" key={label}>
                <div className='flex gap-4'>
                <span className='text-gray-500'>{label}</span>
                <Icon className="size-8 "></Icon>
                </div>
                <span>
                    <FormatComponent value={label} number={value}/>
                </span>
            </div>
        ))}
        
    </Cards>
    
  )
function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "Sunrise" || value === "Sunset")
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    if(value === "Wind Direction") return <UpArrow className='size-8 ' style={{transform:`rotate${number}deg`}}/>
  return number
}
  
}