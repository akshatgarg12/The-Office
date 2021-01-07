import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CreateEmployeePage from './components/pages/createEmployee';

const App =()=> {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component = {CreateEmployeePage}/>
        <Route path='/home' component = {()=><h1>Home Page</h1>}/>
        <Route component={()=><h1>404 Page not found</h1>}/>
      </Switch>
    </Router>
  );
}

export default App;
