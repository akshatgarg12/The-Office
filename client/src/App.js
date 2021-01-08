import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CreateEmployeePage from './components/pages/createEmployee';
import LoginPage from './components/pages/loginPage';
import ProtectedRoute from './components/atoms/ProtectedRoute';

const App =()=> {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component = {CreateEmployeePage}/>
        <Route path='/login' exact component = {LoginPage}/>
        <ProtectedRoute path='/dashboard' component = {CreateEmployeePage}/>
        <Route component={()=><h1>404 Page not found</h1>}/>
      </Switch>
    </Router>
  );
}

export default App;
