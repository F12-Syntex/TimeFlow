import dayjs from "dayjs"; //import dayjs
import React from "react";

function App() {
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

  console.table(getMonth(3));

  return (
    <React.Fragment>
        <div className="h-screen flex flex-columns">
            <CalendarHeader />
            <div className="flex flex-1">
                <Sidebar />
                <Month />
            </div>
        </div>
    </React.Fragment>
  );
}

function CalendarHeader() {
    return (<div></div>)
}

function Sidebar() {
    return (<div></div>)
}

function Month() {
    return (<div></div>)
}

export default App;
