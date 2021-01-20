import { useState } from "react";
import { Button, Container, Form, TextArea} from "semantic-ui-react";
import { REQUEST } from "../../../actions/http";
import { USER_REQUESTS_TYPE } from "../../../constants";
import ShowMessage from "../showMessage";

const Payroll = () => {
  const [details, setDetails] = useState({
    message: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        message: details.message,
      };
      const response = await REQUEST({
        path: "/api/request",
        method: "POST",
        data: {
          type: USER_REQUESTS_TYPE.PAYROLL,
          data,
        },
        setLoading,
      });
      console.log(response);
      setSuccess("request has been created!");
      return;
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      return;
    }
  };
  return (
    <Container>
      <Form>
        <Form.Field
          control={TextArea}
          value={details.message}
          onChange={(e, { value }) =>
            setDetails({ ...details, message: value })
          }
          label="Message"
          placeholder="Message along with the request..."
        />
      </Form>
      <Button
        loading={loading}
        onClick={onClickHandler}
        className="btn-padding"
      >
        Payroll Request
      </Button>
      <ShowMessage error={error} success={success} />
    </Container>
  );
};

export default Payroll;
