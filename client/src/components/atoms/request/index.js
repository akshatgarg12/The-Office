import { Button, Card, Image, Message } from 'semantic-ui-react'
import {USER_REQUESTS_TYPE} from '../../../constants'

const RequestCard = ({_id,employee,type,data,status}) => {

  return (
    <Card color="brown">
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={employee.img}
        />
        <Card.Header>{employee.name}</Card.Header>
        <Card.Meta>{type} request</Card.Meta>
        <Card.Description>
        <strong>{
          type === USER_REQUESTS_TYPE.LEAVE &&
          ` is asking for leave from ${data.startDate} to ${data.endDate}`
        }
        {
          type === USER_REQUESTS_TYPE.BONUS &&
          ` is asking for bonus of ${data.amount}`
        }
        {
          type === USER_REQUESTS_TYPE.PAYROLL &&
          ` is asking for payroll`
        }</strong>
        <br/>
        {data.message}
        </Card.Description>
      </Card.Content>
      {
        status === 'pending' ? 
        <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick = {()=> console.log("request  approved")}>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
        {/* success or error based on server response */}
        <Message success size="mini"><p>request has been approved.</p></Message>
      </Card.Content> : 
      <Card.Content extra>
        <Message success size="mini"><p>request has been {status}.</p></Message>
      </Card.Content> 
      }
     
    </Card>
  );
}
 
export default RequestCard;
