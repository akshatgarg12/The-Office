import {Switch, Route} from 'react-router-dom';
// import CreateEmployeePage from './components/pages/createEmployee';
import LoginPage from './components/Pages/LoginPage';
import ProtectedRoute from './components/Atoms/ProtectedRoute';
import AdminRoute from './components/Atoms/AdminRoute';
import DashboardPage from './components/Pages/Dashboard';
import AdminPage from './components/Pages/AdminPage';
import DiscussionPage from './components/Pages/Discussion';
import SearchPage from './components/Pages/SearchPage';
import HomePage from './components/Pages/HomePage';
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
