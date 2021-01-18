import {Switch, Route} from 'react-router-dom';
// import CreateEmployeePage from './components/pages/createEmployee';
import LoginPage from './components/pages/LoginPage';
import ProtectedRoute from './components/atoms/ProtectedRoute';
import AdminRoute from './components/atoms/AdminRoute';
import DashboardPage from './components/pages/Dashboard';
import AdminPage from './components/pages/AdminPage';
import DiscussionPage from './components/pages/Discussion';
import SearchPage from './components/pages/SearchPage';
import HomePage from './components/pages/HomePage';
import 'react-calendar/dist/Calendar.css';

const App =()=> {
  return (
      <Switch>
        <Route path='/' exact children = {HomePage}/>
        <Route path='/login' children = {<LoginPage />}/>
        <ProtectedRoute path='/dashboard' component = {DashboardPage}/>
        <ProtectedRoute path='/discussion' component = {DiscussionPage} />
        <ProtectedRoute path='/search' component = {SearchPage} />
        <AdminRoute path='/admin' component={AdminPage} />
        <Route component={()=><h1>404 Page not found</h1>}/>
      </Switch>
  );
}

export default App;
