
import DailyForcecast from "./components/cards/DailyForcecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import HourlyForecast from "./components/cards/HourlyForecast"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { Suspense, useState } from "react"
import type { Coords } from "./types"
import { set } from "zod"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import { getGeoCode } from "./api"
import { useSuspenseQuery } from "@tanstack/react-query"
import MapTypeDropDown from "./components/dropdowns/MapTypeDropDown"
import MapLegend from "./components/MapLegend"
import CurrentWeatherSkeleton from "./components/skeletons/CurrentWeatherSkeleton"
import HourlySkeleton from "./components/skeletons/HourlySkeleton"
import DailySkeleton from "./components/skeletons/DailySkeleton"
import AddditionalInfoSkeleton from "./components/skeletons/AddditionalInfoSkeleton"
import SidePanel from "./components/SidePanel"

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
  <>
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="flex gap-4">
          <h2 className="text-2xl font-semibold">Location:</h2>
          <LocationDropdown location={location} setLocation={setLocation} />
        </div>
        <div className="flex gap-4">
               <h2  className="text-2xl font-semibold">Map Type:</h2>
          <MapTypeDropDown mapType={mapType} setMaptype={setMaptype} />
        </div>
      </div>
    <div className="relative">
      <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
      <MapLegend mapType={mapType}/>
    </div>
      <Suspense fallback={<CurrentWeatherSkeleton />} >
        <CurrentWeather coords={coords} />
      </Suspense>
     
      <Suspense fallback={<HourlySkeleton />} >
        <HourlyForecast coords={coords} />
      </Suspense>
      <Suspense fallback={<DailySkeleton/>}>
        <DailyForcecast coords={coords} />
      </Suspense>

      <Suspense fallback={<AddditionalInfoSkeleton/>}>
        <AdditionalInfo coords={coords} />
      </Suspense>
    </div>
<SidePanel  coords={coords}/> 
  </>
  )
}

export default App
