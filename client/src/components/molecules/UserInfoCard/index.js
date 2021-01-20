import { Card, Image, Icon } from "semantic-ui-react";
import {useContext} from 'react'
import {UserContext} from '../../../context/UserContextProvider'
import "./style.css";

const UserInfoCard = ({
  _id,
  branch,
  department,
  dob,
  email,
  firstName,
  lastName,
  img,
  salary,
  position,
  fluid,
}) => {
  const {state} = useContext(UserContext)
  return (
    <>
      {fluid && (
        <div>
          <Image
            rounded
            bordered
            src={img}
            ui={true}
            size="medium"
            centered
          />
        </div>
      )}
      <Card fluid={fluid}>
        {!fluid && <img src={img} className="user-card-img" alt="some" />}
        <Card.Content className="content">
          <Card.Header>
            <h2>
              {firstName} {lastName}
            </h2>
          </Card.Header>
          <Card.Description>
            Employee_id: <span className="highlight">{_id}</span>
          </Card.Description>
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
          <Card.Description>
            Salary : <span className="highlight">${salary}</span>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="mail" />
          {email}
        </Card.Content>
          {state?.user?.isAdmin ? <Card.Content extra textAlign="right">
            <Icon name="trash" />
            <Icon name="pencil" />
          </Card.Content> : null }
      </Card>
    </>
  );
};

export default UserInfoCard;
