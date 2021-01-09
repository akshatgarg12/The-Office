import {useState} from 'react';
import { Button, Container,Form, TextArea, Segment } from 'semantic-ui-react';
import MiniModal from '../modal';

const Payroll = () => {
  const [details, setDetails] = useState({
    message:""
  });
  return (
    <Container>
      <Segment>
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
      </Segment>
    </Container>
  );
}
 
export default Payroll;

