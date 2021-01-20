import { useState, useEffect } from "react";
import { Card, Menu, Segment, Container, Header } from "semantic-ui-react";
import RequestCard from "../../atoms/request";

const RequestContainer = ({ requests, disabled = false, showDeleteOption = false }) => {
  const [activeItem, setActiveItem] = useState("pending");
  const [requestsToShow, setRequestsToShow] = useState([]);
  useEffect(() => {
    const temp = requests.filter((req) => req.status === activeItem);
    setRequestsToShow(temp);
  }, [activeItem, requests]);
  const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <Container>
      <Header as="h3" block>
        Requests From Employees
      </Header>
      <Menu attached="top" tabular>
        <Menu.Item
          name="pending"
          active={activeItem === "pending"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="approved"
          active={activeItem === "approved"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="rejected"
          active={activeItem === "rejected"}
          onClick={handleItemClick}
        />
      </Menu>
      <Segment attached="bottom">
        <Card.Group centered>
          {requestsToShow.map((request, index) => {
            return (
              <RequestCard
                key={index}
                _id={request._id}
                status={request.status}
                employee={request.employee}
                data={request.data}
                type={request.type}
                resolved_by={request.resolved_by}
                disabled={disabled}
                showDeleteOption={showDeleteOption}
              />
            );
          })}
        </Card.Group>
      </Segment>
    </Container>
  );
};

export default RequestContainer;

// {{name:"Akshat garg", img:'https://react.semantic-ui.com/images/avatar/large/steve.jpg'}}
// {{
//   amount:500,
//   message:"I reallhy need this, its a necessity"
// }}
