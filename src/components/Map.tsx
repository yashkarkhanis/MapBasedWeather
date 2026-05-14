import { MapContainer, Marker, TileLayer, useMap, } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import type { Coords } from '../types'
import { useEffect } from 'react'
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk"
//https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={API key}

const API_KEY = import.meta.env.VITE_API_KEY
const MAP_TILES_API = import.meta.env.VITE_MAP_TILES_API
type Props = {
  coords: Coords,
  onMapClick: (lat: number, lon: number) => void,
  mapType?: string
}

export default function Map({ coords, onMapClick, mapType }: Props) {
  return (
    <MapContainer
      center={[coords.lat, coords.lon]}
      zoom={13} style={{ width: "2300px", height: '500px' }}>
      <MapClick onMapClick={onMapClick} coords={coords} />
    { <MapTileLayer/> }
      {<TileLayer
        opacity={0.7}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
      />}

      <Marker position={[coords.lat, coords.lon]} />

    </MapContainer>
  )
}

function MapClick({ onMapClick, coords }: { onMapClick: (lat: number, lon: number) => void; coords: Coords }) {
  const map = useMap()
  map.panTo([coords.lat, coords.lon])
  map.on('click', (e) => {
    const { lat, lng } = e.latlng

    onMapClick(lat, lng)
  })
  return null
}

function MapTileLayer() {
  const map = useMap()
  useEffect(() => {
    const tileLayer = new MaptilerLayer({ 
      style: "basic-dark",
       apiKey: MAP_TILES_API
      })
    tileLayer.addTo(map)
    return () => {map.removeLayer(tileLayer)}
  }, [map])
  return null;
}