import Calendar from 'react-calendar';
import {useState} from 'react';
import { Button, Container, Form, TextArea, Message } from 'semantic-ui-react';
import {REQUEST} from '../../../actions/http'
import {USER_REQUESTS_TYPE} from '../../../constants'
import './style.css';

var getDaysArray = function(start, end) {
  for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
      arr.push(new Date(dt));
  }
  
  return arr
};


const LeaveRequest = () => {
  const [details, setDetails] = useState({
    value : new Date(),
    message:""
  });
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const onClickHandler = async (e) => {
    e.preventDefault()
    try{
      const dates = getDaysArray(details.value[0],details.value[1])
      const data = {
        dates:dates,
        message:details.message
      }
      const response = await REQUEST({
        path:'/api/request',
        method:"POST",
        data:{
          type:USER_REQUESTS_TYPE.LEAVE,
          data
        },
      })
      console.log(response)
      setSuccess('request has been created!')
      setError(null)
      return;
    }
   catch(e){
     console.log(e.message);
     setError(e.message);
     setSuccess(null)
     return;
   }
  }

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
        <Button onClick={onClickHandler}>Request Leave</Button>
         {error ?
              <Message negative>
                <p>{error}</p>
              </Message> : null
            }
            {success ?
              <Message success>
                <p>{success}</p>
              </Message> : null
            }
    </Container>
  );
}
 
export default LeaveRequest;