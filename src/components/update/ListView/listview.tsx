import '../ListView/listview.css'
import React from 'react'

interface ListViewProps {
    listViewItems: TodoItem[]
}

interface TodoItem {
    title: string
    description: string
    date: Date
    priority: string
    labels: string[]
    completed: boolean
}

function ListView({ listViewItems }: ListViewProps) {
    return (
        <div className='list-view'>
            {listViewItems.map((item) => (
                <div className='list-view-item'>
                    <div className="list-view-item-left">
                        <div className="container">
                        <div className="round">
                            {/* if completed then chekbox defaults to true */}
                            <input type="checkbox" id="checkbox" checked={item.completed} onClick={() => {item.completed = !item.completed}}/>
                            <label htmlFor="checkbox"></label>
                        </div>
                        </div>
                    </div>
                    <div className="list-view-item-right">
                        <div className="list-view-item-top">
                            <div className="list-view-item-title">
                                {item.title}
                            </div>
                            <div className="list-view-item-date">
                                <DateComponent date={item.date} />
                            </div>

                        </div>
                        <div className="list-view-item-bottom">
                            <div className="list-view-item-description">
                                {item.description}
                            </div>
                            <div className="list-view-item-labels">
                                {item.labels.join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const parseDate = (date: Date): string => {
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  
    // Check if the date is today
    if (date.toDateString() === currentDate.toDateString()) {
      return 'Today';
    }
  
    // Check if the date is tomorrow
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
  
    // Check if the date is within the next 7 days
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    if (date.getTime() < nextWeek.getTime()) {
      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return dayOfWeek[date.getDay()];
    }
  
    // Return the date as mm/dd/yyyy for dates outside the range
    const formattedDate = new Date(date);
    const mm = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(formattedDate.getDate()).padStart(2, '0');
    const yyyy = formattedDate.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };
  
  interface Props {
    date: Date;
  }

  const DateComponent: React.FC<Props> = ({ date }) => {
    const parsedDate = parseDate(date);
  
    return <span>{parsedDate}</span>;
  };

export default ListView