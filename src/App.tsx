
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
import Hamburger from "/src/assets/Hamburger.svg?react"
import MobileHeader from "./components/MobileHeader"
import LightDarkToggle from "./components/LightDarkToggle"
function App() {
  const [coordinates, setCoords] = useState<Coords>({ lat: 40, lon: 25 })
  const [location, setLocation] = useState<string>("Tokyo")
  const [mapType, setMaptype] = useState<string>("clouds_new")
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false)

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
  <MobileHeader setisSidePanelOpen={setIsSidePanelOpen}/>
    <div className="flex flex-col gap-8 w-full lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen pt-4 xs:pt-8 p-8 2xl:min-h-[1120px]">
      <div className="flex flex-col gap-4 xs:flex-row xs-gap-8">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <h2 className="text-2xl font-semibold">Location:</h2>
          <LocationDropdown location={location} setLocation={setLocation} />
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
               <h2  className="text-2xl font-semibold whitespace-nowrap">Map Type:</h2>
          <MapTypeDropDown mapType={mapType} setMaptype={setMaptype} />
        </div>
        <div className="ml-auto flex gap-4 items-center ">
          <LightDarkToggle/>
             <button onClick={() => setIsSidePanelOpen(true)} className="hidden xs:block "> <Hamburger className="size-6 lg:hidden"/> </button>
        </div>
      </div>
    <div className="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-8">
      <div className="relative h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1">
        { <Map coords={coords} onMapClick={onMapClick} mapType={mapType} /> }
        <MapLegend mapType={mapType}/>
      </div>

        <div className="col-span-1 2xl:row-span-2 order-2">
          <Suspense fallback={<CurrentWeatherSkeleton />} >
            <CurrentWeather coords={coords} />
          </Suspense>
        </div>

        <div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2">
          <Suspense fallback={<DailySkeleton/>}>
            <DailyForcecast coords={coords} />
          </Suspense>
        </div>

        <div className="col-span-1  md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
          <Suspense fallback={<HourlySkeleton />} >
            <HourlyForecast coords={coords} />
          </Suspense>
        </div>
      
        <div className="col-span-1  md:col-span-2 2xl:row-span-1 order-5">
          <Suspense fallback={<AddditionalInfoSkeleton/>}>
            <AdditionalInfo coords={coords} />
          </Suspense>
        </div>
      </div>
    </div>
<SidePanel isSidePanelOpen={isSidePanelOpen} setIsSidePanelOpen={setIsSidePanelOpen} coords={coords}/> 
  </>
  )
}

export default App
