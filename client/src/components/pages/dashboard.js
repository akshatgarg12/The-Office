import { useContext } from "react";
import { Container} from "semantic-ui-react";
import { UserContext } from "../../context/UserContextProvider";
import EmployeeRequestMenu from "../molecules/EmployeeRequestMenu";
import UserInfoCard from "../molecules/UserInfoCard";
import AttendanceCalender from '../atoms/attendance';
import { useQuery, gql } from '@apollo/client';

const DashboardPage = () => {
  const {state} = useContext(UserContext)
  const {_id, branch, department, dob, email, firstName, lastName, img, position} = state.user

  const USER_QUERY =  gql
  `
    query Employee($_id: String!) {
      employee(_id:$_id){
        absentDates{
          date
        }
        presentDates{
          date
        }
      }
    }
  `
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { _id },
  })

  if(loading) console.log("loading...")
  if(error) console.log(error);
  if(data) {
    var {absentDates, presentDates} = data.employee;
    absentDates = absentDates.map((d)=>new Date(d.date).toLocaleDateString());
    presentDates = presentDates.map((d)=>new Date(d.date).toLocaleDateString());
    console.log(absentDates, presentDates)
  }
  const titleCase = (text) => {
    var temp = text.toLowerCase();
    return temp.charAt(0).toUpperCase() + temp.substr(1).toLowerCase()
  }
  return (
    <Container>
        <UserInfoCard
          fluid={true}
          _id={_id}
          branch ={branch}
          department = {department}
          dob={dob.split('T')[0]}
          email={email}
          firstName={titleCase(firstName)}
          lastName={titleCase(lastName)}
          img={img}
          position={position}
         />

         <AttendanceCalender
            absentDates= {absentDates || []}
            presentDates = {presentDates || []}
         />

        <EmployeeRequestMenu />
        
    </Container>
  );
}
 
export default DashboardPage;