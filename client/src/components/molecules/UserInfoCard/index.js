import { Card, Image, Icon, Message } from "semantic-ui-react";
import {useContext, useState} from 'react'
import {REQUEST} from '../../../actions/http'
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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    // eslint-disable-next-line no-restricted-globals
    if(!confirm(`Are you sure you want to delete ${firstName}`)){
      console.log("canceled delete");
      return;
    }
    try{
      const response = await REQUEST({
        path:'/api/employee',
        method:"DELETE",
        data:{
          _id
        },
        setLoading
      })
      setSuccess(response)
      setError(null)
    }catch(e){
      setSuccess(null)
      setError(e.message)
    }finally{
      return;
    }
  }
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
            <Icon name="trash" onClick={deleteHandler} loading={loading} />
            {/* <Icon name="pencil" /> */}
          </Card.Content> : null }
          {error ? 
          <Message negative>
            <p>{error}</p>
          </Message>
           : null}
        {success ? 
          <Message success>
            <p>{success}</p>
          </Message>
           : null}
      </Card>
    </>
  );
};

export default UserInfoCard;
