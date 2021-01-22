import { Card, Icon, Feed } from 'semantic-ui-react'
import {TodoItemStatus} from '../../../constants'
import './style.css';

const TodoListItem = ({_id, text, status, employee}) => {
  // const updateStatus = (status) => {

  // }
  // const deleteItem = () => {

  // }
  return (
  <Card>
      <Card.Content>
      <Feed.Label image={employee.img} content={employee.name} />
      </Card.Content>
      <Card.Content description={text} />
      <Card.Content extra className="buttons">
      {
        status === TodoItemStatus.DONE ? 
        <>
          <div><Icon name='hourglass start' />Todo</div>
          <div><Icon name='hourglass half' />Doing</div>
        </> : 
        status === TodoItemStatus.DOING ? 
        <>
          <div><Icon name='hourglass start' />Todo</div>
          <div><Icon name='hourglass end' />Done</div>
        </> :
        <>
          <div><Icon name='hourglass half' />Doing</div>
          <div><Icon name='hourglass end' />Done</div>
        </> 
      }
      <div><Icon name='trash'/>Delete</div>
      </Card.Content>
  </Card>
  );
}
 
export default TodoListItem;
