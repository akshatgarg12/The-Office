import { useState, useEffect } from "react";
import LoadingPage from './loadingPage'
import ErrorPage from './errorPage'
import {
  Container,
  Input,
  Segment,
  Card,
  Button,
  Message,
  Select,
  Header,
  Icon,
} from "semantic-ui-react";
import { gql, useQuery } from "@apollo/client";
import UserInfoCard from "../molecules/UserInfoCard";
import Fuse from "fuse.js";
import RefreshIcon from "../atoms/refreshIcon";
const options = [
  { key: "department", text: "department", value: "department" },
  { key: "branch", text: "branch", value: "branch" },
  { key: "position", text: "position", value: "position" },
  { key: "name", text: "name", value: "name" },
];
const GET_ALL_EMPLOYEES = gql`
  {
    employees {
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
    }
  }
`;
const SearchPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_EMPLOYEES);
  const [sortBy, setSortBy] = useState("department");
  const [value, setValue] = useState("");
  const [employees, setEmployees] = useState(data?.employees || []);
  const [allEmployee, setAllEmployee] = useState(data?.employees || []);
  useEffect(() => {
    setEmployees(data?.employees || []);
    setAllEmployee(data?.employees || []);
  }, [data]);

  const searchEmployee = (e) => {
    e.preventDefault();
    const options = {
      includeScore: true,
      keys: [sortBy],
    };
    const fuse = new Fuse(allEmployee || [], options);
    const result = fuse.search(value);
    const searchedResult = result.map((r) => r.item);
    console.log(searchedResult);
    setEmployees(searchedResult);
  };

  if (loading) {
    return <LoadingPage />
  }
  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <Container style={{ overflowX: "hidden" }}>
      <RefreshIcon refetch={refetch} />
      <Header as="h4" block>
        Search Employee by {sortBy}
      </Header>
      <Input
        type="text"
        placeholder="Search..."
        action
        value={value}
        onChange={(e, { value }) => setValue(value)}
      >
        <input />
        <Select
          compact
          options={options}
          value={sortBy}
          onChange={(e, { value }) => {
            setSortBy(value);
          }}
        />
        <Button type="submit" onClick={searchEmployee}>
          <Icon name="search" />
        </Button>
      </Input>

      <Segment>
        <Card.Group centered>
          {employees.length === 0 ? (
            <Message>No results found!</Message>
          ) : (
            employees.map((employee) => {
              return (
                <UserInfoCard
                  key={employee._id}
                  _id={employee._id}
                  branch={employee.branch}
                  department={employee.department}
                  position={employee.position}
                  firstName={employee.name}
                  img={employee.img}
                  fluid={false}
                  dob={employee.dob}
                  email={employee.email}
                  salary={employee.salary}
                  isAdmin={employee.isAdmin}
                  showProfileButton={true}
                />
              );
            })
          )}
        </Card.Group>
      </Segment>
    </Container>
  );
};

export default SearchPage;
