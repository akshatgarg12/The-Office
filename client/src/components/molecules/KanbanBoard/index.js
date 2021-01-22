import {Header, Container} from 'semantic-ui-react'
import {useContext} from 'react'
import RefreshIcon from '../../atoms/refreshIcon'
import {gql, useQuery} from '@apollo/client'
import LoadingPage from '../../pages/loadingPage'
import ErrorPage from '../../pages/errorPage'
import ListContainer from '../ListContainer'
import {TodoItemStatus} from '../../../constants'
import ListItemForm from '../../atoms/listItemForm'
import { UserContext } from '../../../context/UserContextProvider'

const KanbanBoard = ({section, showForm=true, showButtons = true}) => {
  // gql request to todos of the department
  const {state} = useContext(UserContext)
  const KANBAN_QUERY = gql`
    query KanbanBoard($section:String!){
      kanbanItems(section : $section){
        _id
        status
        text
        section
        employee{
          name
          img
        }
      }
    }
  `;
  const {loading, error, data, refetch} = useQuery(KANBAN_QUERY, {
    variables:{
      section
    }
  })
  if(loading) return <LoadingPage />
  if(error) return <ErrorPage />
  if(data){
    // console.log(data);
    const {kanbanItems} = data;
    var TodoItems = kanbanItems.filter((item) => item.status === TodoItemStatus.TODO)
    var DoingItems = kanbanItems.filter((item) => item.status === TodoItemStatus.DOING)
    var DoneItems = kanbanItems.filter((item) => item.status === TodoItemStatus.DONE)
  }
  return (
    <Container>
        {showButtons && <RefreshIcon refetch={refetch} />}
        {showForm ? <ListItemForm section = {state?.user?.department} refetch={refetch} /> : null}
        <Header as="h3" content={section} block />
        <ListContainer 
            listItems = {TodoItems}
            heading={"Todo"}
            icon = {"hourglass start"}
            refetch = {refetch}
            showButtons = {showButtons}
        />
        <ListContainer 
            listItems = {DoingItems}
            heading={"Doing"}
            icon = {"hourglass half"}
            refetch = {refetch}
            showButtons = {showButtons}
        />
        <ListContainer 
            listItems = {DoneItems}
            heading={"Done"}
            icon = {"hourglass end"}
            refetch = {refetch}
            showButtons = {showButtons}
        />
    </Container>
  )
}
 
export default KanbanBoard;