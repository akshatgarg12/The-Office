import { useContext } from "react";
import { Container, Header} from "semantic-ui-react";
import { UserContext } from "../../context/UserContextProvider";
import EmployeeRequestMenu from "../molecules/EmployeeRequestMenu";
import UserInfoCard from "../molecules/UserInfoCard";
import AttendanceCalender from '../atoms/attendance';
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
         <Header as='h3'>Attendance Calender</Header>
         <AttendanceCalender
          absentDates= {['02/01/2021','05/01/2021','08/01/2021']}
          presentDates = {['01/01/2021','04/01/2021','02/01/2021']}
         />
         <Header as='h3'>Employee Request Menu</Header>
        <EmployeeRequestMenu />
        
    </Container>
  );
}
 
export default DashboardPage;