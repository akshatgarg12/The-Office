import { useState } from "react";
import { Button, Container, Form, TextArea,} from "semantic-ui-react";
import ShowMessage from '../showMessage'
import { REQUEST } from "../../../actions/http";
import { USER_REQUESTS_TYPE } from "../../../constants";
import "./style.css";

const Bonus = () => {
  const [details, setDetails] = useState({
    money: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        amount: details.money,
        message: details.message,
      };
      const response = await REQUEST({
        path: "/api/request",
        method: "POST",
        data: {
          type: USER_REQUESTS_TYPE.BONUS,
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
        <Form.Input
          value={details.money}
          onChange={(e, { value }) => setDetails({ ...details, money: value })}
          label="Money amount"
          placeholder="Amount you want.."
          type="Number"
        />
        <Form.Field
          control={TextArea}
          value={details.message}
          onChange={(e, { value }) =>
            setDetails({ ...details, message: value })
          }
          label="Why do you deserve a bonus?"
          placeholder="Elaborate your needs and arguments..."
        />
      </Form>
      <Button
        loading={loading}
        onClick={onClickHandler}
        className="btn-padding"
      >
        Bonus Request
      </Button>
      <ShowMessage error={error} success={success} />
    </Container>
  );
};

export default Bonus;
