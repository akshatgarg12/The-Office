import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CreateEmployeePage from './components/pages/createEmployee';
import LoginPage from './components/pages/loginPage';
import ProtectedRoute from './components/atoms/ProtectedRoute';
import DashboardPage from './components/pages/dashboard';
import 'react-calendar/dist/Calendar.css';
const App =()=> {
  return (
    <Router>
      <Switch>
        <Route path='/' exact children = {<CreateEmployeePage />}/>
        <ProtectedRoute path='/discussion' children = {<CreateEmployeePage />}/>
        <Route path='/login' children = {<LoginPage />}/>
        <ProtectedRoute path='/dashboard' component = {DashboardPage}/>
        <Route component={()=><h1>404 Page not found</h1>}/>
      </Switch>
    </Router>
  );
}

export default App;
