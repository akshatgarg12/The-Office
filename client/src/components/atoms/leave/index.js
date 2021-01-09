import Calendar from 'react-calendar';
import {useState} from 'react';
import { Button, Container, Form, TextArea } from 'semantic-ui-react';
import './style.css';

var getDaysArray = function(start, end) {
  for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
      arr.push(new Date(dt));
  }
  
  return arr.map(d => d.toLocaleDateString());
};

const LeaveRequest = ({absentDates}) => {
  const [details, setDetails] = useState({
    value : new Date(),
    message:""
  });
  
  return (
    <Container textAlign="left">
        <Calendar
            className="calender"
            onChange={(val) => {
                console.log(val);
                setDetails({...details, value:val}
              )}}
            value={details.value}
            returnValue={"range"}
            selectRange={true}
        />
        <Form>
            <Form.Field
                  control={TextArea}
                  value={details.message}
                  onChange={(e,{value})=> setDetails({...details, message:value})}
                  label='Leave Application'
                  placeholder='Please elaborate your leave application...'
                />
        </Form>
        <br/>
        <Button onClick={()=>{
            const dates = getDaysArray(details.value[0], details.value[1]);
            console.log("Please provide me with leave from ", dates);
        }}>Request Leave</Button>
    </Container>
  );
}
 
export default LeaveRequest;