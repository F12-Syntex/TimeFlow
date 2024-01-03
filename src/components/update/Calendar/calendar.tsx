import dayjs from 'dayjs' //import dayjs

export function getMonth(month = dayjs().month()){ 
    const year = dayjs().year()
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day()

    const dayMatrix = new Array(5).fill([]).map(()=>{
        new Array(7).fill(null)
    })


}