//import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './Navbar.css';
import logo from '../assets/profile-user.svg';
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <>
            <div class="title"><span><img src={logo} /> UserName</span></div>
            <ul>
                <li class="modify"><Link to="/profile">Profile</Link></li>
                <li class="modify"><Link to="/history">Medical history</Link></li>
                <li class="modify"><Link>Insurance claim</Link></li>
                <Button variant="outline-danger">Sign out</Button>
            </ul>
        </>
    )
}

export default Navbar