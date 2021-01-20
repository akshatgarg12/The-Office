import {Dimmer, Loader} from 'semantic-ui-react'

const LoadingPage = () => {
  return (
    <Dimmer active>
      <Loader size="small">Loading</Loader>
    </Dimmer>
  );
}
 
export default LoadingPage;