import React, { useState } from 'react'
import { MapContainer, Marker, TileLayer, Popup, useMap, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import type { Coords } from '../types'
//https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={API key}

const API_KEY = import.meta.env.VITE_API_KEY
type Props = {
  coords: Coords,
  onMapClick: (lat: number, lon: number) => void
}

export default function Map({ coords, onMapClick }: Props) {
  return (
    <MapContainer
    center={[coords.lat, coords.lon]} 
      zoom={13} style={{ width: "700px", height: '500px' }}>
      <MapClick onMapClick={onMapClick} coords={coords}/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
      /> */}

      <Marker position={[coords.lat, coords.lon]} />

    </MapContainer>
  )
}

function MapClick({ onMapClick,coords }: { onMapClick: (lat: number, lon: number) => void; coords: Coords }) {
  const map = useMap()
   map.panTo([coords.lat, coords.lon])
  map.on('click', (e) => {
    const { lat, lng } = e.latlng
   
    onMapClick(lat, lng)
  })
  return null
}
