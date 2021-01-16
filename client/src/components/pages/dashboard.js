import { useContext } from "react";
import { Container} from "semantic-ui-react";
import { UserContext } from "../../context/UserContextProvider";
import EmployeeRequestMenu from "../molecules/EmployeeRequestMenu";
import UserInfoCard from "../molecules/UserInfoCard";
import AttendanceCalender from '../atoms/attendance';
import { useQuery, gql } from '@apollo/client';
import UserRequests from "../molecules/UserRequests";

const DashboardPage = () => {
  const {state} = useContext(UserContext)
  const {_id, branch, department, dob, email, firstName, lastName, img, position, salary} = state.user

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
      requests(employee_id:$_id){
        _id
        employee{
          _id
          name
          img
        }
        status
        data{
          amount 
          message
          dates{
            startDate
            endDate
          }
        }
        type
        resolved_by{
          name
          img
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
    var {requests} = data;
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
          salary={salary}
         />

         <AttendanceCalender
            absentDates= {absentDates || []}
            presentDates = {presentDates || []}
         />

        <EmployeeRequestMenu />
        <UserRequests requests={requests || []} />
        
    </Container>
  );
}
 
export default DashboardPage;