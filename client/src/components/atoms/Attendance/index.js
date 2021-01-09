import Calendar from 'react-calendar';
import { Button, Container } from 'semantic-ui-react';
import './style.css';

const AttendanceCalender = ({presentDates,absentDates}) => {
  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      const absent = absentDates?absentDates.filter((d) => d === date.toLocaleDateString()):[];
      const present = presentDates?presentDates.filter((d) => d === date.toLocaleDateString()):[];
     
        if(absent.length){
          return "absent";
        }
        if(present.length){
          return "present";
        }
      
      
    }
  }
  return (
    <Container textAlign="center" fluid>
      {/* <Segment> */}
        <Calendar
            value={new Date()}
            className="calender"
            returnValue="start"
            selectRange={false}
            tileClassName = {tileClassName}
        />
        <Button onClick={()=>{
            console.log(new Date().toLocaleDateString());
        }}>Mark Today's Attendance</Button>
        {/* </Segment> */}
    </Container>
  );
}
 
export default AttendanceCalender;