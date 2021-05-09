import { Button, Form, Segment, Container, Message } from "semantic-ui-react";
import { UserContext } from "../../../context/UserContextProvider";
import { useState, useContext } from "react";
import { login } from "../../../actions/login";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const router = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e, { name, value }) =>
    setDetails({ ...details, [name]: value });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loginUser = await login(dispatch, details);
    setLoading(false);
    if (loginUser) {
      return router.replace("/dashboard");
    } else {
      setError(state.error);
      console.log(error);
    }
  };

  return (
    <Container>
      <Segment inverted>
        <Form inverted onSubmit={submitHandler} loading={state.loading}>
          <Form.Input
            fluid
            label="email"
            placeholder="email"
            name="email"
            type="email"
            value={details.email}
            onChange={changeHandler}
          />
          <Form.Input
            fluid
            label="password"
            placeholder="password"
            name="password"
            type="password"
            value={details.password}
            onChange={changeHandler}
          />
          <Button loading={loading} type="submit">
            Submit
          </Button>
        </Form>
        {state.error ? (
          <Message
            error={state.error ? true : false}
            header="Error"
            content={state.error}
          />
        ) : null}
      </Segment>
      {/* instructions for testing app */}
      <Segment>
        <h2 style={{textDecoration:"underline"}}>To test the application</h2>
        <br/>
        <h3>As a regular employee</h3>
        <h4>email : jim@dundermifflin.com</h4>
        <h4>password : Jim7</h4>
        <br/>
        <h3>As a admin</h3>
        <h4>email : michael@dundermifflin.com</h4>
        <h4>password : Michael5</h4>
      </Segment>
    </Container>
  );
};

export default LoginForm;
