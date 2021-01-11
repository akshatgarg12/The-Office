import Calendar from 'react-calendar';
import { Button, Container } from 'semantic-ui-react';
import axios from 'axios';
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
      console.log(new Date())
      const response = await axios('/api/attendance',{
        method:'POST',
        data:{
          date:new Date(),
          type:'present'
        },
        headers:{
          'Content-Type':'application/json'
        }
      });
      const {data} = response;
      console.log(data)
    }
   catch(e){
     console.log(e.response);
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