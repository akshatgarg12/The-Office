import {Segment, Card} from 'semantic-ui-react';
import RequestCard from '../../atoms/request'

const UserRequests = ({requests}) => {
  return (
    <Segment attached='bottom'>
      <Card.Group centered>
        {requests.map((request, index) => {
          return <RequestCard 
                      key = {index}
                      _id = {request._id}
                      status = {request.status}
                      employee = {request.employee}
                      data = {request.data}
                      type = {request.type}
                      resolved_by = {request.resolved_by}
                      disabled = {true}
                  />
        })}
      </Card.Group>
    </Segment>
  );
}
 
export default UserRequests;