// create a post for discussion
// resolve requests
// see purani requests
// create an employee
// search any employee along with filters and edit.
import RequestContainer from '../molecules/RequestContainer'
import {Loader, Dimmer} from 'semantic-ui-react'
import { useQuery, gql } from '@apollo/client';

// import {Header} from 'semantic-ui-react'

const AdminPage = () => {
  const REQUESTS_QUERY = gql
    `
    query AdminDashboard{
      requests{
        _id
        employee{
          _id
          name
          img
        }
        status
        data{
          amount 
          message
          dates{
            startDate
            endDate
          }
        }
        type
        resolved_by{
          name
          img
        }
      }
    } 
  `;
  const { loading, error, data } = useQuery(REQUESTS_QUERY);
  if(loading){
    return (
    <Dimmer active>
      <Loader size='small'>Loading</Loader>
    </Dimmer>
  )
  }
  if(error){
    return (
    <Dimmer active>
     <p>Some error occured! {error}</p>
    </Dimmer>
    )
  }
  const {requests} = data;
  // console.log(requests)
  return (
    <div>
      <RequestContainer
        requests = {requests}
       />
    </div>
  );
}
 
export default AdminPage;