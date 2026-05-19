
import Cards from "./Cards"
import { useSuspenseQuery } from '@tanstack/react-query'
import { getWeather } from '../../api'
import WeatherIcon from "../WeatherIcon"
import type { Coords } from "../../types"

type Props = {
  coords:Coords
}

function DailyForcecast({coords}: Props) {
     const{data} = useSuspenseQuery({
queryKey:['weather',coords],
queryFn: ()=>getWeather({lat:coords.lat,lon:coords.lon })
})
  return (
    <Cards title="Daily Forecast" childrenClassName="flex flex-col gap-4 2xl:justify-between">
      {data?.daily.map((day)=>(
        <div key={day.dt} className="flex justify-between">
          <p className="w-9">
            {new Date(day.dt*1000).toLocaleDateString(undefined,{
            weekday:"short",
            })}</p>
         <WeatherIcon src={day.weather[0].icon}/>
          <p> { Math.round(day.temp.day)}°F</p>
          <p className="text-gray-500/75">{Math.round(day.temp.min)}°F</p>
          <p className="text-gray-500/75">{ Math.round(day.temp.max)}°F</p>
        </div>
      ))
    }   
    </Cards>
  )
}

export default DailyForcecast