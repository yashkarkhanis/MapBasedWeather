
import DailyForcecast from "./components/cards/DailyForcecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import HourlyForecast from "./components/cards/HourlyForecast"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { useState } from "react"
import type { Coords } from "./types"
import { set } from "zod"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import { getGeoCode } from "./api"
import { useSuspenseQuery } from "@tanstack/react-query"
import MapTypeDropDown from "./components/dropdowns/MapTypeDropDown"

function App() {
  const [coordinates, setCoords] = useState<Coords>({ lat: 40, lon: 25 })
  const [location, setLocation] = useState<string>("Tokyo")
  const [mapType, setMaptype] = useState<string>("clouds_new")

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon })
    setLocation("custom")
  }


  const { data: geoCodeData } = useSuspenseQuery({
    queryKey: ['geocode', location],
    queryFn: () => getGeoCode(location)
  })
  const coords = location === "custom" ? coordinates : { lat: geoCodeData?.[0].lat ?? 0, lon: geoCodeData?.[0].lon ?? 0 }


  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <LocationDropdown location={location} setLocation={setLocation} />
        <MapTypeDropDown mapType={mapType} setMaptype={setMaptype} />
      </div>
      <Map coords={coords} onMapClick={onMapClick} />
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords} />
      <DailyForcecast coords={coords} />
      <AdditionalInfo coords={coords} />
    </div>

  )
}

export default App
