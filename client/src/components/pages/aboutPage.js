import {gql, useQuery} from '@apollo/client'
import AttendanceCalender from '../atoms/Attendance'
import UserInfoCard from '../molecules/UserInfoCard'
import {useHistory} from 'react-router-dom'
import LoadingPage from './loadingPage';
import { Container, Header, Segment } from "semantic-ui-react";

const AboutPage = (props) => {
  const router = useHistory()
  const _id = props.match.params.id;
  const ABOUT_USER_QUERY = gql`
    query Employee($_id: String!) {
      employee(_id: $_id) {
        _id
        name
        email
        img
        branch
        department
        position
        dob
        salary
        isAdmin
        absentDates {
          date
        }
        presentDates {
          date
        }
      }
    }
  `;
  const {loading, error, data} = useQuery(ABOUT_USER_QUERY,{
    variables:{_id}
  })
  if(loading) return <LoadingPage />
  if(error || !data || !data.employee){
    router.push('/search')  
    return null;
  }
  console.log(data);
  const {name, email, img, branch, department, position, dob, salary, isAdmin} = data?.employee || {};
  var { absentDates, presentDates } = data.employee || {};
  absentDates = absentDates.map((d) => new Date(d.date).toLocaleDateString());
  presentDates = presentDates.map((d) =>
    new Date(d.date).toLocaleDateString()
  );
  return (
    <Container>
      <Header as="h3" block>{name}'s profile</Header>
      <Segment textAlign="center">
        <UserInfoCard
          fluid={true}
          _id={_id}
          branch={branch}
          department={department}
          dob={dob.split("T")[0]}
          email={email}
          firstName={name}
          img={img}
          position={position}
          salary={salary}
          isAdmin = {isAdmin}
          showDeleteButton={true}
        />
      </Segment>
      <AttendanceCalender
        absentDates={absentDates || []}
        presentDates={presentDates || []}
        showMarkAttendanceButton = {false}
      />
      <div style={{ height: "50px" }}></div>
    </Container>
  );
}
 
export default AboutPage;