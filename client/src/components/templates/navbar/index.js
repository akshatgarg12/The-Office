import './style.css'
import {useContext} from 'react';
import {UserContext} from '../../../context/UserContextProvider'
import {logout} from '../../../actions/logout'

const Navbar = () => {
  const {state, dispatch} = useContext(UserContext);
  var navLinks = [
    'Login'
  ];
  if(state.user){
      navLinks = [
      'Discussion',
      'My Profile',
    ];
    if(state.user.isAdmin){
      navLinks = [
        'Discussion',
        'My Profile',
        'Admin Section',
      ]
    }
  }
  const clickHandler =  () => logout(dispatch);
  return (
    <nav>
      <h1>The Office</h1>
      <div>
        <ul className="nav-links">
          {navLinks.map((link, idx)=>{
            return <li key = {idx}>{link}</li>
          })}
          {state.user ? <li onClick={clickHandler}>Logout</li> : null}
        </ul>
      </div>
    </nav>
  );
}
 
export default Navbar;