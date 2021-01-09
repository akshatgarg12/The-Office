import { useState } from "react";
import { Segment, Menu } from "semantic-ui-react";
import Attendance from "../../atoms/Attendance";
import Bonus from "../../atoms/bonus";
import Payroll from '../../atoms/payroll';

const EmployeeRequestMenu = () => {
  const [activeItem, setActiveItem] = useState('leave')
  const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <>
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
    </>
  );
}
 
export default EmployeeRequestMenu;