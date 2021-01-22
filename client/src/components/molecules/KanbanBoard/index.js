import {Header, Container} from 'semantic-ui-react'
import RefreshIcon from '../../atoms/refreshIcon'
import {gql, useQuery} from '@apollo/client'
import LoadingPage from '../../pages/loadingPage'
import ErrorPage from '../../pages/errorPage'
import ListContainer from '../ListContainer'
import {TodoItemStatus} from '../../../constants'

const KanbanBoard = ({section}) => {
  // gql request to todos of the department
  // const 
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
    console.log(data);
    const {kanbanItems} = data;
    var TodoItems = kanbanItems.filter((item) => item.status === TodoItemStatus.TODO)
    var DoingItems = kanbanItems.filter((item) => item.status === TodoItemStatus.DOING)
    var DoneItems = kanbanItems.filter((item) => item.status === TodoItemStatus.DONE)
  }
  return (
    <Container>
        <RefreshIcon refetch={refetch} />
        <Header as="h3" content={section} block />
        <ListContainer 
            listItems = {TodoItems}
            heading={"Todo"}
            icon = {"hourglass start"}
        />
        <ListContainer 
            listItems = {DoingItems}
            heading={"Doing"}
            icon = {"hourglass half"}
        />
        <ListContainer 
            listItems = {DoneItems}
            heading={"Done"}
            icon = {"hourglass end"}
        />
    </Container>
  )
}
 
export default KanbanBoard;