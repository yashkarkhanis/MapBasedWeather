import React from 'react'
import Cards from '../cards/Cards'
import { Skeleton } from '../ui/skeleton'

type Props = {}

export default function AddditionalInfoSkeleton({}: Props) {
  return (
     <Cards title='Additional Weather Info' childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({length:6}).map((_,idx)=>(
                <div className="flex justify-between" key={idx}>
                    <div className='flex gap-4'>
                    <Skeleton className="w-20 h-8"/>
                   <Skeleton className="size-8 rounded-full"/>
                    </div>
                    <span>
                        <Skeleton className="size-8"/>
                    </span>
                </div>
            ))}
            
        </Cards>
  )
}