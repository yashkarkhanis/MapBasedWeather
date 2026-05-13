
import Cards from './Cards'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getWeather } from '../../api'
import WeatherIcon from '../WeatherIcon'
import type { Coords } from '../../types'

type Props = {
  coords:Coords
}

function HourlyForecast({coords}: Props) {
    const{data} = useSuspenseQuery({
queryKey:['weather',coords],
queryFn: ()=>getWeather({lat:coords.lat,lon:coords.lon })
})
  
    return (
    <Cards title="Hourly Weather (48 Hours)" childrenClassName="flex flex-row gap-4 overflow-x-scroll">
      {data?.hourly.map((hour)=>(
        <div key={hour.dt} className="flex flex-col gap-2 item-center p-2">
        <p className="whitespace-nowrap">{new Date(hour.dt*1000).toLocaleTimeString(undefined,{
            hour:"numeric",
            minute:"2-digit",
            hour12:true

        })}</p>
    <WeatherIcon src={hour.weather[0].icon}/>
    <p> { Math.round(hour.temp)}°F</p>
        </div>
      ))
    } 
   </Cards>
  )
}

export default HourlyForecast