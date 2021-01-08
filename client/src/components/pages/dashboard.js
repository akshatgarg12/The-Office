import { useState } from "react";
import { Container, Segment, Menu } from "semantic-ui-react";
import Attendance from "../atoms/Attendance";
import Bonus from "../atoms/bonus";
import Payroll from "../atoms/payroll";

const DashboardPage = () => {
  const [activeItem, setActiveItem] = useState('leave')
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Container>
        <Menu attached='top' tabular>
          <Menu.Item
            name='leave'
            active={activeItem === 'leave'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='payroll'
            active={activeItem === 'payroll'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='bonus'
            active={activeItem === 'bonus'}
            onClick={handleItemClick}
          />
        </Menu>
        <Segment attached='bottom'>
          { 
            activeItem ==='bonus' ?
            <Bonus /> : 
            activeItem === "leave" ?
            <Attendance absentDates = {['01/01/2021','05/01/2021','20/01/2021']} />:
            <Payroll />
          }
        </Segment>
    </Container>
  );
}
 
export default DashboardPage;