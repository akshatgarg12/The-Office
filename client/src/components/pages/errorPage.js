import {Dimmer} from 'semantic-ui-react'

const ErrorPage = ({error}) => {
  console.log(error)
  return (
    <Dimmer active>
      <p>Some error occured!</p>
    </Dimmer>
  );
}
 
export default ErrorPage;