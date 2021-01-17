import './style.css'
import {useContext} from 'react';
import {UserContext} from '../../../context/UserContextProvider'
import {logout} from '../../../actions/logout'
import {Link} from 'react-router-dom';

const Navbar = () => {
  const {state, dispatch} = useContext(UserContext);
  var navLinks = [
    'Login'
  ];
  if(state.user){
      navLinks = [
      'Discussion',
      'Search',
      'Dashboard',
    ];
    if(state.user.isAdmin){
      navLinks = [
        'Discussion',
        'Search',
        'Dashboard',
        'Admin',
      ]
    }
  }
  const logoLink = state.user ? '/dashboard' : '/';
  const clickHandler =  () => logout(dispatch);
  return (
    <nav>
      <Link to={logoLink}><h1>The Office</h1></Link>
      <div>
        <ul className="nav-links">
          {navLinks.map((link, idx)=>{
            console.log(link);
            return <Link className="link" to={`/${link.toLowerCase()}`} key={idx}><li>{link}</li></Link>
          })}
          {state.user ? <li onClick={clickHandler}>Logout</li> : null}
        </ul>
      </div>
    </nav>
  );
}
 
export default Navbar;