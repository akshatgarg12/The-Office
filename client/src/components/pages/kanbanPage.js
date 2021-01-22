import KanbanBoard from "../molecules/KanbanBoard"
import { Container } from 'semantic-ui-react'
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";

const KanbanPage = () => {
  const {state} = useContext(UserContext)

  return (
    <Container>
      <KanbanBoard
        section={state?.user?.department}
      />
      <div style={{height:"50px"}}></div>
      {
        state?.user?.isAdmin ? 
        <>
          <KanbanBoard
            section={"Sales Department"}
            showForm = {false}
            showButtons = {false}
          />
          <div style={{height:"50px"}}></div>
          <KanbanBoard
            section={"Finance Department"}
            showForm = {false}
            showButtons = {false}

          />
        </> : null
      } 
      
      
    </Container>
  );
}
 
export default KanbanPage;