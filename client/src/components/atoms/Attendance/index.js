import Calendar from 'react-calendar';
import {useState} from 'react';
import { Button, Container } from 'semantic-ui-react';
import './style.css';


const Attendance = ({absentDates}) => {
  const [value, onChange] = useState(new Date());
  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      const toAddDates = absentDates?absentDates.filter((d) => d === date.toLocaleDateString()):[];
      if(toAddDates.length){
        return "absent";
      }
    
    }
  }
  
  // console.log(value.toLocaleDateString());
  return (
    <Container textAlign="center">
      <Calendar
          className="calender"
          onChange={onChange}
          value={value}
          selectRange={true}
          showNavigation={'YYYY-MM-DD'}
          tileClassName = {tileClassName}
      />
      <Button onClick={()=>{
          // console.log("Please provide me with leave from ", value);
      }}>Request Leave</Button>
    </Container>
  );
}
 
export default Attendance;