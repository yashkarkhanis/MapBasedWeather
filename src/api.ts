import { weatherSchema } from "./schemas/weatherSchema"
import { GeocodeSchema } from "./schemas/geoCodeShema"

const API_KEY = import.meta.env.VITE_API_KEY
export async function getWeather({lat,lon}:{lat:number,lon:number}) {
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`)
    const data = await res.json()
    console.log(data)
    return weatherSchema.parse(data)
    
}

export async function getGeoCode(location:string) {
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q={${location}&limit=1&appid=${API_KEY}`)
    const data = await res.json()
    console.log(data)
    return GeocodeSchema.parse(data)
    
}