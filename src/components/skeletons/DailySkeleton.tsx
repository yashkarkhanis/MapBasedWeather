import React from 'react'
import Cards from '../cards/Cards'
import WeatherIcon from '../WeatherIcon'
import { Skeleton } from '../ui/skeleton'

type Props = {}

export default function DailySkeleton({}: Props) {
  return (
    <Cards title="Daily Forecast" childrenClassName="flex flex-col gap-4 2xl:justify-between ">
         {Array.from({length:8}).map((_,idx)=>(
           <div key={idx} className="flex justify-between">
            <Skeleton className="w-9 h-4"/>
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="size-8"/>
            <Skeleton className="size-8"/>
            <Skeleton className="size-8"/>
           </div>
         ))
       }   
       </Cards>
  )
}