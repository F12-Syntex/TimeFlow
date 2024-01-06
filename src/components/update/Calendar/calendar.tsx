import dayjs from "dayjs"; //import dayjs (npm install dayjs)
import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarSidebar from "./CalendarSidebar";
import Month from "./Month";

function getMonth(month = dayjs().month()) {
    
    const year = dayjs().year();
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day(); 
    let curMonthCounter = 0 - firstDayOfMonth;

    const dayMatrix = new Array(5).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        curMonthCounter++;
        return dayjs(new Date(year, month, curMonthCounter));
      });
    });
    return dayMatrix;
  }

function App() {
 const [currentMonth, setCurrentMonth] = useState(getMonth())
 const [];
  return (
    <React.Fragment>
        <div className="h-screen flex flex-columns">
          {/* <CalendarHeader /> */}
            <div className="flex flex-1">
                {/* <Sidebar />
                <Month month={currentMonth} /> */}
            </div>
        </div>
    </React.Fragment>
  );
}

export default App;
