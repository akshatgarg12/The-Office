import {Dimmer} from 'semantic-ui-react'

const ErrorPage = ({error}) => {
  return (
    <Dimmer active>
      <p>Some error occured! {error}</p>
    </Dimmer>
  );
}
 
export default ErrorPage;