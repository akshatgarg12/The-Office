import {Card, Image, Icon, Segment } from 'semantic-ui-react'
import './style.css';

const UserInfoCard = ({_id, branch, department, dob, email, firstName, lastName, img, position, fluid }) => {
  return (
    <Segment>
      {
        fluid &&
        <Image src={img} wrapped ui={true} size="medium" style={{margin:"auto"}} />
      }
    <Card fluid = {fluid}>
      { 
      !fluid &&
      <Image src={img} wrapped ui={false} />
      }
      <Card.Content>
        <Card.Header><h2>{firstName} {lastName}</h2></Card.Header>
        <Card.Description>Employee_id: <span className="highlight">{_id}</span></Card.Description>
        <Card.Meta>Date of Birth: {dob.toString()}</Card.Meta>
        <Card.Description>
         Department : <span className="highlight">{department}</span>
        </Card.Description>
        <Card.Description>
         Position : <span className="highlight">{position}</span>
        </Card.Description>
        <Card.Description>
         Branch : <span className="highlight">{branch}</span>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Icon name='mail' />
          {email}
      </Card.Content>
  </Card>
  </Segment>
  );
}
 
export default UserInfoCard;