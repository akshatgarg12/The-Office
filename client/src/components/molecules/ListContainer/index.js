import {Segment, Icon, Card} from 'semantic-ui-react'
import TodoListItem from '../../atoms/todoListItem'

const ListContainer = ({listItems, heading, icon, refetch, showButtons}) => {
  return (
    <Segment >
        <h4>{heading} <Icon name={icon} /></h4>
        <Card.Group>
        {
          listItems.map(({_id, text, status, employee}) =>{
            return  <TodoListItem 
                      key = {_id}
                      _id={_id}
                      text={text}
                      status={status}
                      employee={employee}
                      refetch = {refetch}
                      showButtons = {showButtons}
                   />
          })
        }
          
        </Card.Group>
    </Segment>
  );
}
 
export default ListContainer;