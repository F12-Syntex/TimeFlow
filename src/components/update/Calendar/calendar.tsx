import dayjs from 'dayjs' //import dayjs

export function getMonth(month = dayjs().month()){ 

    const year = dayjs().year()
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day() 
    let curMonthCounter = 0 - firstDayOfMonth;

    const dayMatrix = new Array(5).fill([]).map(()=>{
        return new Array(7).fill(null).map(()=>{
            curMonthCounter++; 
            return dayjs(new Date(year, month, curMonthCounter))
        })
    })
    return dayMatrix;

    
}
function App(){

}

export default App