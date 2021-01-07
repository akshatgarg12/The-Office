import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App =()=> {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component = {()=><h1>Hello World</h1>}/>
        <Route path='/home' component = {()=><h1>Home Page</h1>}/>
        <Route component={()=><h1>404 Page not found</h1>}/>
      </Switch>
    </Router>
  );
}

export default App;
