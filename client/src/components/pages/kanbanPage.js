import KanbanBoard from "../molecules/KanbanBoard"
import { Container } from 'semantic-ui-react'

const KanbanPage = () => {
  // if admin show all the departments
  // else only show the list of particular department
  return (
    <Container>

      <KanbanBoard
        section={"Sales Department"}
      />
      
    </Container>
  );
}
 
export default KanbanPage;