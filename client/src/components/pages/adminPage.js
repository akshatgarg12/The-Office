// create a post for discussion
// resolve requests
// see purani requests
// create an employee
// search any employee along with filters and edit.
import RequestContainer from '../molecules/RequestContainer'

const AdminPage = () => {
  return (
    <div>
      {/* <EmployeeRequests /> */}
      <RequestContainer
        requests = {[
          {
            status:"pending",
            employee:{name:"Akshat garg", img:'https://react.semantic-ui.com/images/avatar/large/steve.jpg'},
            data:{
              amount:500,
              message:"I reallhy need this, its a necessity"
            },
            type:'bonus'
          },
          {
            status:"pending",
            employee:{name:"Akshat garg", img:'https://react.semantic-ui.com/images/avatar/large/steve.jpg'},
            data:{
              amount:500,
              message:"I reallhy need this, its a necessity"
            },
            type:'bonus'
          },{
            status:"pending",
            employee:{name:"Akshat garg", img:'https://react.semantic-ui.com/images/avatar/large/steve.jpg'},
            data:{
              amount:500,
              message:"I reallhy need this, its a necessity"
            },
            type:'bonus'
          },{
            status:"pending",
            employee:{name:"Akshat garg", img:'https://react.semantic-ui.com/images/avatar/large/steve.jpg'},
            data:{
              amount:500,
              message:"I reallhy need this, its a necessity"
            },
            type:'bonus'
          },
          {
            status:"approved",
            employee:{name:"Akshat garg", img:'https://react.semantic-ui.com/images/avatar/large/steve.jpg'},
            data:{
              startDate:'13/01/2021',
              endDate:'15/01/2021',
              dates:['13/01/2021', '14/01/2021', '15/01/2021'],
              message:"I reallhy need this, its a necessity"
            },
            type:'leave'
          },
          {
            status:"rejected",
            employee:{name:"Akshat garg", img:'https://react.semantic-ui.com/images/avatar/large/steve.jpg'},
            data:{
              startDate:'13/01/2021',
              endDate:'15/01/2021',
              dates:['13/01/2021', '14/01/2021', '15/01/2021'],
              message:"I reallhy need this, its a necessity"
            },
            type:'leave'
          }]}
       />
    </div>
  );
}
 
export default AdminPage;