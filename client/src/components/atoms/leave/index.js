import Calendar from "react-calendar";
import { useState } from "react";
import { Button, Container, Form, TextArea } from "semantic-ui-react";
import { REQUEST } from "../../../actions/http";
import { USER_REQUESTS_TYPE } from "../../../constants";
import "./style.css";
import ShowMessage from "../showMessage";

var getDaysArray = function (start, end) {
  const startDate = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate() + 1
  );
  const endDate = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate() + 1
  );
  for (
    var arr = [], dt = new Date(startDate);
    dt <= endDate;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};

const LeaveRequest = () => {
  const [details, setDetails] = useState({
    value: new Date(),
    message: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      if (!details.value[0] || !details.value[1]) {
        setError("Choose some dates");
        return;
      }
      const dates = getDaysArray(details.value[0], details.value[1]);
      const data = {
        dates: dates,
        message: details.message,
      };
      const response = await REQUEST({
        path: "/api/request",
        method: "POST",
        data: {
          type: USER_REQUESTS_TYPE.LEAVE,
          data,
        },
        setLoading,
      });
      console.log(response);
      setSuccess("request has been created!");
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
    <Container textAlign="left">
      <Calendar
        className="calender"
        onChange={(val) => {
          console.log(val);
          setDetails({ ...details, value: val });
        }}
        value={details.value}
        returnValue={"range"}
        selectRange={true}
      />
      {details.value[0] && details.value[1] ? (
        <h4>
          Leave from {details.value[0].toLocaleDateString()} to{" "}
          {details.value[1].toLocaleDateString()} (inc.)
        </h4>
      ) : null}
      <Form>
        <Form.Field
          control={TextArea}
          value={details.message}
          onChange={(e, { value }) =>
            setDetails({ ...details, message: value })
          }
          label="Leave Application"
          placeholder="Please elaborate your leave application..."
        />
      </Form>
      <br />
      <Button loading={loading} onClick={onClickHandler}>
        Request Leave
      </Button>
     <ShowMessage error={error} success={success} />
    </Container>
  );
};

export default LeaveRequest;
