import { useState } from "react";
import { Button, Card, Image, Message,Icon } from "semantic-ui-react";
import { USER_REQUESTS_TYPE } from "../../../constants";
import { REQUEST } from "../../../actions/http";

const RequestCard = ({
  _id,
  employee,
  type,
  data,
  status,
  resolved_by,
  disabled = false,
  showDeleteOption = false
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const onClickHandler = async (e, { name }) => {
    e.preventDefault();
    try {
      const response = await REQUEST({
        path: "/api/request",
        method: "PATCH",
        data: {
          _id,
          status: name,
        },
        setLoading,
      });
      setError(null);
      console.log(response);
      setSuccess(response);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setSuccess(null);
    } finally {
      return;
    }
  };

  const deleteRequestHandler = async () => {
    try {
      const response = await REQUEST({
        path: "/api/request",
        method: "DELETE",
        data: {
          _id,
        },
        setLoading,
      });
      console.log(response);
      setDeleteMessage(response);
    } catch (e) {
      console.log(e.message);
      setDeleteMessage(e.message);
    } finally {
      return;
    }
  }
  return (
    <Card color="grey">
        { showDeleteOption ?
            <>
            {
              deleteMessage ?
              <Message>{deleteMessage}</Message> :
              null 
            }
            <Card.Content extra textAlign="right">
              Delete the request <Icon name="trash" loading={loading} style={{cursor:"pointer"}} onClick={deleteRequestHandler} />
            </Card.Content> 
           </>
           : 
           null
        }
      <Card.Content>
        <Image floated="right" size="mini" src={employee?.img} />
        <Card.Header>{employee?.name}</Card.Header>
        <Card.Meta>{type} request</Card.Meta>
        <Card.Description>
          <strong>
            {type === USER_REQUESTS_TYPE.LEAVE &&
              ` is asking for leave from ${data.dates.startDate} to ${data.dates.endDate}`}
            {type === USER_REQUESTS_TYPE.BONUS &&
              ` is asking for bonus of ${data.amount}`}
            {type === USER_REQUESTS_TYPE.PAYROLL && ` is asking for payroll`}
          </strong>
          <br />
          {data.message}
        </Card.Description>
      </Card.Content>
      {status === "pending" ? (
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              basic
              color="green"
              onClick={onClickHandler}
              name="approved"
              disabled={disabled}
            >
              Approve
            </Button>
            <Button
              basic
              color="red"
              onClick={onClickHandler}
              name="rejected"
              disabled={disabled}
            >
              Decline
            </Button>
          </div>
          {/* success or error based on server response */}
          {error ? (
            <Message error size="mini">
              <p>{error}</p>
            </Message>
          ) : null}
          {success ? (
            <Message success size="mini">
              <p>{success}</p>
            </Message>
          ) : null}
        </Card.Content>
      ) : (
        <Card.Content extra>
          <Image floated="right" size="mini" avatar src={resolved_by.img} />
          <p>resolved by {resolved_by.name}</p>

          <Message color={status === "approved" ? "green" : "red"} size="mini">
            <p>request has been {status}.</p>
          </Message>
        </Card.Content>
      )}
      
    </Card>
  );
};

export default RequestCard;
