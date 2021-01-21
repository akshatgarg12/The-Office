import Calendar from "react-calendar";
import { REQUEST } from "../../../actions/http";
import { Button, Container, Header } from "semantic-ui-react";
import ShowMessage from '../showMessage';
import "./style.css";
import { useState } from "react";

const AttendanceCalender = ({ presentDates, absentDates, showMarkAttendanceButton=true }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1
  );
  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      const absent = absentDates
        ? absentDates.filter((d) => d === date.toLocaleDateString())
        : [];
      const present = presentDates
        ? presentDates.filter((d) => d === date.toLocaleDateString())
        : [];
      if (present.length) {
        return "present";
      }
      if (absent.length) {
        return "absent";
      }
    }
  }
  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        date: date,
        type: "present",
      };
      console.log(data);
      const response = await REQUEST({
        path: "/api/attendance",
        method: "POST",
        data,
        setLoading,
      });
      console.log(response);
      setSuccess("attendance for today marked,refresh to see the results.");
      setError(null);
      return;
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      setSuccess(null);
      return;
    }
  };
  return (
    <Container textAlign="center" fluid>
      <Header as="h3" attached="top" textAlign="left">
        Attendance Calendar
      </Header>
      <h4>Today is {new Date().toLocaleDateString()}</h4>
      <Calendar
        value={new Date()}
        className="calender"
        returnValue="start"
        selectRange={false}
        tileClassName={tileClassName}
      />
      {showMarkAttendanceButton && <Button loading={loading} onClick={onClickHandler}>
        Mark Today's Attendance
      </Button>}
     <ShowMessage error={error} success={success}/>
    </Container>
  );
};

export default AttendanceCalender;
