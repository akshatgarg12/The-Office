import Calendar from 'react-calendar';
import {REQUEST} from '../../../actions/http'
import { Button, Container, Message } from 'semantic-ui-react';
import './style.css';
import { useState } from 'react';

const AttendanceCalender = ({presentDates,absentDates}) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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
      setSuccess('attendance for today marked,refresh to see the results.')
      setError(null)
      return;
    }
   catch(e){
     console.log(e.message)
     setError(e.message)
     setSuccess(null)
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
        {
          error ? 
          <Message error>
            <p>{error}</p>
          </Message>:null
        }
        {
          success ? 
          <Message success>
            <p>{success}</p>
          </Message>:null
        }

    </Container>
  );
}
 
export default AttendanceCalender;