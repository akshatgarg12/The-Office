import {useState} from 'react';
import { Button, Container,Form, TextArea, Segment } from 'semantic-ui-react';
import './style.css';
const Bonus = () => {
  const [details, setDetails] = useState({
    money:null,
    message:""
  });
  return (
    <Container>
      <Segment>
          <Form>
          <Form.Input
                value={details.money}
                onChange={(e,{value})=> setDetails({...details, money:value})}
                label='Money amount'
                placeholder='Amount you want..'
                type="Number"
            />
            <Form.Field
                control={TextArea}
                value={details.message}
                onChange={(e,{value})=> setDetails({...details, message:value})}
                label='Why do you deserve a bonus?'
                placeholder='Elaborate your needs and arguments...'
            />
            </Form>
            <Button onClick={()=>{
                console.log(details);
            }} className="btn-padding">Bonus Request</Button>
      </Segment>
    </Container>
  );
}
 
export default Bonus;