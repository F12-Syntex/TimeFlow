import React from 'react'
import dayjs from 'dayjs'

export default function Day({day}: {day: dayjs.Dayjs}) {
    return (
        <div>
            {day.format('')}
            
        </div>
    )
}