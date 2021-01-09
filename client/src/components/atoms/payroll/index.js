import {useState} from 'react';
import { Button, Container,Form, TextArea } from 'semantic-ui-react';

const Payroll = () => {
  const [details, setDetails] = useState({
    message:""
  });
  return (
    <Container>
          <Form>
            <Form.Field
                control={TextArea}
                value={details.message}
                onChange={(e,{value})=> setDetails({...details, message:value})}
                label='Message'
                placeholder='Message along with the request...'
            />
            </Form>
            <Button onClick={()=>{
                console.log(details);
            }} className="btn-padding">Payroll Request</Button>
    </Container>
  );
}
 
export default Payroll;

