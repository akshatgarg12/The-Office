import {useState} from 'react';
import { Button, Container } from 'semantic-ui-react';

const Bonus = () => {
  // console.log(value.toLocaleDateString());
  return (
    <Container textAlign="center">
      <Button onClick={()=>{
          // console.log("Please provide me with leave from ", value);
      }}>Bonus Request</Button>
    </Container>
  );
}
 
export default Bonus;