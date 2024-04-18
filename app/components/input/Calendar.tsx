'use client'

import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface CalendarProps {
    value: any;
    disabledDates: Date[];
    onChange: (value: any) => void;
    }

const Calendar:React.FC<CalendarProps> = ({
    value,
    disabledDates,
    onChange
}) => {
  return (
    <DateRange 
    rangeColors={['#262626']}
    ranges={[value]}
    onChange={onChange}
    date={new Date()}
    disabledDates={disabledDates}
    minDate={new Date()}
    direction="vertical"
    
    
    />
  )
}

export default Calendar