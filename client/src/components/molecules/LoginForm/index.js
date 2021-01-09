import { Button,Form, Segment, Container, Message } from 'semantic-ui-react'
import {UserContext} from '../../../context/UserContextProvider';
import {useState, useContext} from 'react';
import {login} from '../../../actions/login';
import {useHistory} from 'react-router-dom'

const LoginForm = () => {
  
  const router = useHistory()
  const {state,dispatch} = useContext(UserContext);
  const [error, setError] = useState('');
  const [details, setDetails] = useState({
    email:"",
    password:""
  })
  const changeHandler = ((e, {name, value}) => setDetails({...details, [name]:value}))
  
  const submitHandler = async (e) => {
      e.preventDefault();
      const loginUser = await login(dispatch,details);
      if(loginUser){
        return router.replace('/dashboard');
      }else{
        setError(state.error);
        console.log(error);
      }
  }

  return (
    <Container>
      <Segment inverted>
        <Form inverted onSubmit={submitHandler} loading={state.loading}>
            <Form.Input
                fluid
                label='email'
                placeholder='email'
                name="email"
                type="email"
                value={details.email} 
                onChange={changeHandler}
            />
          <Form.Input
              fluid
              label='password'
              placeholder='password'
              name="password"
              type="password"
              value={details.password} 
              onChange={changeHandler}
          />
          <Button type='submit'>Submit</Button>
      </Form>
      {
        state.error ? <Message 
        error={state.error?true:false}
        header="Error"
        content={state.error}
        />
        :null
      }
    </Segment>
  </Container>
  );
}
 
export default LoginForm;