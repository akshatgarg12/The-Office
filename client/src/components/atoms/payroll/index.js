import {useState} from 'react';
import { Container } from 'semantic-ui-react';
import MiniModal from '../modal';

const Payroll = () => {
  // console.log(value.toLocaleDateString());
  return (
    <Container textAlign="center">
     <MiniModal ButtonText={"Payroll"} onConfirm={()=> console.log("heelloo")}/>
    </Container>
  );
}
 
export default Payroll;