import Calendar from 'react-calendar';
import {REQUEST} from '../../../actions/http'
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
  const onClickHandler = async (e) => {
    e.preventDefault()
    
    try{
      const data = {
        date:new Date(),
        type:'present'
      }
      console.log(new Date())
      const response = await REQUEST({
        path:'/api/attendance',
        method:"POST",
        data,
      })
      console.log(response)
      return;
    }
   catch(e){
     console.log(e.message);
     return;
   }

  }
  return (
    <Container textAlign="center" fluid>

        <Calendar
            value={new Date()}
            className="calender"
            returnValue="start"
            selectRange={false}
            tileClassName = {tileClassName}
        />
        <Button onClick={onClickHandler}>Mark Today's Attendance</Button>

    </Container>
  );
}
 
export default AttendanceCalender;