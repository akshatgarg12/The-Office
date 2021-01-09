import { useContext, useState } from "react";
import { Container} from "semantic-ui-react";
import { UserContext } from "../../context/UserContextProvider";
import EmployeeRequestMenu from "../molecules/EmployeeRequestMenu";
import UserInfoCard from "../molecules/UserInfoCard";

const DashboardPage = () => {
  const {state} = useContext(UserContext)
  const {_id, branch, department, dob, email, firstName, lastName, img, position} = state.user;
  return (
    <Container>
        <UserInfoCard
          fluid={true}
          _id={_id}
          branch ={branch}
          department = {department}
          dob={dob}
          email={email}
          firstName={firstName}
          lastName={lastName}
          img={img}
          position={position}
         />
        <EmployeeRequestMenu />
    </Container>
  );
}
 
export default DashboardPage;