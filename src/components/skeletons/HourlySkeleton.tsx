import React from 'react'
import Cards from '../cards/Cards'
import { Skeleton } from '../ui/skeleton'

type Props = {}

export default function HourlySkeleton({ }: Props) {
    return (
        <Cards
            title="Hourly Weather (48 Hours)"
            childrenClassName="flex flex-row gap-4 overflow-x-scroll">
            {Array.from({ length: 48 }).map((_, idx) => (
                <div key={idx}
                    className="flex flex-col gap-2 items-center p-2 2xl:justify-between">
                    <Skeleton className='w-15 h-6 2xl:scale-110' />
                    <Skeleton className="size-8 2xl:size-10 rounded-full" />
                    <Skeleton className="w-8 h-6 2xl:scale-110" />
                </div>
            ))
            }
        </Cards>
    )
}