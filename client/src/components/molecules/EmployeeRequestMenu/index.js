import { useState } from "react";
import { Segment, Menu, Header } from "semantic-ui-react";
import LeaveRequest from "../../atoms/leave";
import Bonus from "../../atoms/bonus";
import Payroll from "../../atoms/payroll";
import "./style.css";

const EmployeeRequestMenu = () => {
  const [activeItem, setActiveItem] = useState("leave");
  const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <div className="user-request-menu">
      <Header attached="top" as="h3" textAlign="left">
        User Request Menu
      </Header>
      <Menu attached="top" tabular>
        <Menu.Item
          name="leave"
          active={activeItem === "leave"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="payroll"
          active={activeItem === "payroll"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="bonus"
          active={activeItem === "bonus"}
          onClick={handleItemClick}
        />
      </Menu>
      <Segment attached="bottom">
        {activeItem === "bonus" ? (
          <Bonus />
        ) : activeItem === "leave" ? (
          <LeaveRequest
            absentDates={["01/01/2021", "05/01/2021", "20/01/2021"]}
          />
        ) : (
          <Payroll />
        )}
      </Segment>
    </div>
  );
};

export default EmployeeRequestMenu;
