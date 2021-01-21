import './style.css'
import {Icon} from 'semantic-ui-react'

const Footer = () => {
  return (
    <footer className="footer">
     <div>
        <p>Created by <strong>Akshat Garg</strong> with 🖤 and ☕️ for stackHack 2.0🚀</p>
        <a href="https://github.com/akshatgarg12" target="_blank" rel="noreferrer"><Icon name="github" color="grey" size="big"/></a>
        <a href="https://www.linkedin.com/in/akshat-garg-ba1ab0183/" target="_blank" rel="noreferrer"><Icon name="linkedin" color="grey" size="big"/></a>
        
     </div>
    </footer>
  );
}
 
export default Footer;