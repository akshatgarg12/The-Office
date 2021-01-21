import { useContext } from "react";
import { Container, Segment } from "semantic-ui-react";
import { UserContext } from "../../context/UserContextProvider";
import EmployeeRequestMenu from "../molecules/EmployeeRequestMenu";
import UserInfoCard from "../molecules/UserInfoCard";
import AttendanceCalender from "../atoms/Attendance";
import { useQuery, gql } from "@apollo/client";
import RequestContainer from "../molecules/RequestContainer";
import LoadingPage from "./loadingPage";
import ErrorPage from "./errorPage";
import RefreshIcon from "../atoms/refreshIcon";

const DashboardPage = () => {
  const { state } = useContext(UserContext);
  const {
    _id,
    branch,
    department,
    dob,
    email,
    firstName,
    lastName,
    img,
    position,
    salary,
  } = state.user;

  const USER_QUERY = gql`
    query Employee($_id: String!) {
      employee(_id: $_id) {
        absentDates {
          date
        }
        presentDates {
          date
        }
      }
      requests(employee_id: $_id) {
        _id
        employee {
          _id
          name
          img
        }
        status
        data {
          amount
          message
          dates {
            startDate
            endDate
          }
        }
        type
        resolved_by {
          name
          img
        }
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery(USER_QUERY, {
    variables: { _id },
  });

  if (loading) {
    return <LoadingPage />
  }
  if (error) {
    return <ErrorPage error={error} />
  }
  if (data) {
    var { requests } = data;
    var { absentDates, presentDates } = data.employee;
    absentDates = absentDates.map((d) => new Date(d.date).toLocaleDateString());
    presentDates = presentDates.map((d) =>
      new Date(d.date).toLocaleDateString()
    );
    console.log(absentDates, presentDates);
  }
  const titleCase = (text) => {
    var temp = text.toLowerCase();
    return temp.charAt(0).toUpperCase() + temp.substr(1).toLowerCase();
  };
  return (
    <Container>
      <RefreshIcon refetch={refetch} />
      <Segment textAlign="center">
        <UserInfoCard
          fluid={true}
          _id={_id}
          branch={branch}
          department={department}
          dob={dob.split("T")[0]}
          email={email}
          firstName={titleCase(firstName)}
          lastName={titleCase(lastName)}
          img={img}
          position={position}
          salary={salary}
        />
      </Segment>
      <AttendanceCalender
        absentDates={absentDates || []}
        presentDates={presentDates || []}
      />
      <EmployeeRequestMenu />
      <RequestContainer requests={requests || []} disabled={true} showDeleteOption = {true} />
      <div style={{ height: "50px" }}></div>
    </Container>
  );
};

export default DashboardPage;
