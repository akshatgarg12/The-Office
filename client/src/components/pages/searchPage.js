import { useState, useEffect } from 'react';
import { Container, Input, Dimmer, Loader, Segment, Card, Button, Message, Select } from 'semantic-ui-react'
import {gql, useQuery} from '@apollo/client'
import UserInfoCard from '../molecules/UserInfoCard'
import Fuse from 'fuse.js'
const options = [
  { key: 'department', text: 'department', value: 'department' },
  { key: 'branch', text: 'branch', value: 'branch' },
  { key: 'position', text: 'position', value: 'position'},
  { key: 'name', text: 'name', value: 'name'},

]
const GET_ALL_EMPLOYEES = gql`
{
  employees{
    _id
    name
    email
    img
    branch
    department
    position
    dob
    salary
  }
}`;
const SearchPage = () => {
  const [sortBy, setSortBy] = useState('department')
  const [value, setValue] = useState('')
  const {loading, error, data} = useQuery(GET_ALL_EMPLOYEES);
  const [employees, setEmployees] = useState(data?.employees || [])
  const [allEmployee, setAllEmployee] = useState(data?.employees || [])
  useEffect(()=>{
    setEmployees(data?.employees || [])
    setAllEmployee(data?.employees || [])
  },[data]);

  const searchEmployee = (e) =>{
    e.preventDefault()
    const options = {
      includeScore: true,
      keys: [sortBy]
    }
    const fuse = new Fuse(allEmployee || [], options)
    const result = fuse.search(value)
    const searchedResult = result.map(r => r.item);
    console.log(searchedResult);
    setEmployees(searchedResult)
  }

  if(loading){
    return (
      <Dimmer active>
        <Loader size='small'>Loading</Loader>
      </Dimmer>
    )
  }
  if(error){
    return (
      <Dimmer active>
        <p>Some error occured! {error}</p>
      </Dimmer>
    )
  }
  // console.log(data);
  
  return (
    <Container>
      <Input
         type='text' placeholder='Search...' action
         value={value}
         onChange={(e, {value}) => setValue(value)}
      > 
      <input />
      <Select compact options={options} value={sortBy} onChange={(e,{value}) => {
              setSortBy(value)
            }}/>
      <Button type='submit' onClick={searchEmployee}>Search</Button>
      </Input>

      <Segment>
      <Card.Group centered>
        {
          employees.length === 0 ? 
          <Message>No results found!</Message> : 
          employees.map(employee => {
            return <UserInfoCard 
              key = {employee._id}
              _id = {employee._id}
              branch= {employee.branch}
              department = {employee.department}
              position = {employee.position}
              firstName = {employee.name}
              img = {employee.img}
              fluid={false}
              dob = {employee.dob}
              email={employee.email}
              salary = {employee.salary}
            />
        })}
      </Card.Group>
      </Segment>
    </Container>
  );
}
 
export default SearchPage;