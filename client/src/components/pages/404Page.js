import { Link } from 'react-router-dom'
import {Dimmer} from 'semantic-ui-react'

const NotFoundPage = () => {
  return (
    <Dimmer active>
      <p>404 Page not Found!</p>
      <p ><Link style={{color:"yellow"}} to="/">Click here to go to HomePage</Link></p>
    </Dimmer>
  );
}
 
export default NotFoundPage;