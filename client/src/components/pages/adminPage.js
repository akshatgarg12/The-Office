import RequestContainer from "../molecules/RequestContainer";
import {Container} from 'semantic-ui-react';
import AddEmployeeForm from "../molecules/AddEmployeeForm";
import { useQuery, gql } from "@apollo/client";
import CreatePostMenu from "../molecules/CreatePostMenu";
import LoadingPage from "./loadingPage";
import ErrorPage from "./errorPage";
import RefreshIcon from "../atoms/refreshIcon";


const AdminPage = () => {
  const REQUESTS_QUERY = gql`
    query AdminDashboard {
      requests {
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
  const { loading, error, data, refetch } = useQuery(REQUESTS_QUERY);
  if (loading) {
    return (
      <LoadingPage />
    );
  }
  if (error) {
    return (
     <ErrorPage error={error} />
    );
  }
  const { requests } = data;
  // console.log(requests)
  return (
    <Container>
      <RefreshIcon refetch={refetch} />
      <div style={{ height: "20px" }}></div>
      <RequestContainer requests={requests} />
      <div style={{ height: "50px" }}></div>
      <CreatePostMenu />
      <div style={{ height: "50px" }}></div>
      <AddEmployeeForm />
      <div style={{ height: "50px" }}></div>
    </Container>
  );
};

export default AdminPage;
