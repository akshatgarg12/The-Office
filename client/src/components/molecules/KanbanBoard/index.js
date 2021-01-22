import {Header, Card, Container, Segment, Icon} from 'semantic-ui-react'
import TodoListItem from '../../atoms/todoListItem'
  
const KanbanBoard = ({department}) => {
  // gql request to todos of the department
  return (
    <Container>
        <Header as="h3" content={department} block />
        <Segment >
            <h4>Todo <Icon name="hourglass start" /></h4>
            <Card.Group>
            <TodoListItem 
            _id={1}
            text={"this is a todo"}
            status={"Todo"}
            employee={{
              name:"akshat",
              img:""
            }}
          />
           </Card.Group>
        </Segment>
      <Segment>
      <h4>Doing <Icon name="hourglass half" /></h4>
      <Card.Group>
          <TodoListItem 
          _id={1}
          text={"this is a todo"}
          status={"Doing"}
          employee={{
            name:"akshat",
            img:""
          }}
        />
      </Card.Group>
      </Segment>
      <Segment>
      <h4>Done <Icon name="hourglass end" /></h4>
      <Card.Group>
          <TodoListItem 
          _id={1}
          text={"this is a todo"}
          status={"Done"}
          employee={{
            name:"akshat",
            img:""
          }}
        />
      </Card.Group>
      </Segment>
    </Container>
  )
}
 
export default KanbanBoard;