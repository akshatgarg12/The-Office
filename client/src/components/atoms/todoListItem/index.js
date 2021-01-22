import { useState } from 'react';
import { Card, Icon ,Image } from 'semantic-ui-react'
import { REQUEST } from '../../../actions/http';
import {TodoItemStatus} from '../../../constants'
import './style.css';

const TodoListItemButton = ({onClick, name, loading, title}) => {
  return  <div onClick={onClick}><Icon name={name} loading={loading} />{title}</div>
}

const TodoListItem = ({_id, text, status, employee, refetch, showButtons}) => {
  const [loading, setLoading] = useState(false)
  const updateStatus = async (status) => {
    try{
      const response = await REQUEST({
        path:'/api/kanban',
        method:"PATCH",
        data:{
          _id,
          status
        },
        setLoading
      })
      console.log(response)
    }catch(e){
      console.log(e.message)
    }finally{
      refetch && refetch()
      return;
    }
  }
  const deleteItem = async (e) => {
    e.preventDefault()
    try{
      const response = await REQUEST({
        path:'/api/kanban',
        method:"DELETE",
        data:{
          _id
        },
        setLoading
      })
      console.log(response)
    }catch(e){
      console.log(e.message)
    }finally{
      refetch && refetch()
      return;
    }
  }
  return (
  <Card>
      <Card.Content>
      <div className="employee-kanban">
        <Image avatar src={employee.img} />
        <h5>{employee.name}</h5>
      </div>
      </Card.Content>
      <Card.Content description={text} />
      <Card.Content extra className="buttons">
      
      {
        showButtons ? 
        status === TodoItemStatus.DONE ? 
        <>
          <TodoListItemButton 
            onClick={() => {updateStatus(TodoItemStatus.TODO)}}
            name="hourglass start"
            loading = {loading}
            title = "Todo"
          />
          <TodoListItemButton 
          onClick={() => {updateStatus(TodoItemStatus.DOING)}}
          name="hourglass half"
          loading = {loading}
          title = "Doing"
        />
        </> : 
        status === TodoItemStatus.DOING ? 
        <>
          <TodoListItemButton 
            onClick={() => {updateStatus(TodoItemStatus.TODO)}}
            name="hourglass start"
            loading = {loading}
            title = "Todo"
          />
          <TodoListItemButton 
            onClick={() => {updateStatus(TodoItemStatus.DONE)}}
            name="hourglass end"
            loading = {loading}
            title = "Done"
          />
        </> :
        <>
          <TodoListItemButton 
            onClick={() => {updateStatus(TodoItemStatus.DOING)}}
            name="hourglass half"
            loading = {loading}
            title = "Doing"
          />
          <TodoListItemButton 
            onClick={() => {updateStatus(TodoItemStatus.DONE)}}
            name="hourglass end"
            loading = {loading}
            title = "Done"
          />
        </> : null
      }
        { showButtons && <TodoListItemButton 
          onClick={deleteItem}
          name="trash"
          loading = {loading}
          title = {"Delete"}
        />}
      </Card.Content>
  </Card>
  );
}

export default TodoListItem;
