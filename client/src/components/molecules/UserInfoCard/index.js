import { Card, Image, Icon } from "semantic-ui-react";
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
  return (
    <>
      {fluid && (
        <div>
          <Image
            rounded
            bordered
            src={img}
            wrapped
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
      </Card>
    </>
  );
};

export default UserInfoCard;
