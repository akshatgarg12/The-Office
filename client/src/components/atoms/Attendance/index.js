import Calendar from 'react-calendar';
import {useState} from 'react';
import { Button, Container, Segment } from 'semantic-ui-react';
import './style.css';

var getDaysArray = function(start, end) {
  for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
      arr.push(new Date(dt));
  }
  
  return arr.map(d => d.toLocaleDateString());
};

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
  
  return (
    <Container textAlign="center">
      <Segment>
        <Calendar
            className="calender"
            onChange={onChange}
            value={value}
            returnValue={"range"}
            selectRange={true}
            showNavigation={'YYYY-MM-DD'}
            tileClassName = {tileClassName}
        />
        <Button onClick={()=>{
            const dates = getDaysArray(value[0], value[1]);
            console.log("Please provide me with leave from ", dates);
        }}>Request Leave</Button>
      </Segment>
    </Container>
  );
}
 
export default Attendance;