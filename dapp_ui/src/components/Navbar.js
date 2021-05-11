//import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './Navbar.css';
import logo from '../assets/profile-user.svg';
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <>
            <div className="title"><span><img src={logo} /> UserName</span></div>
            <ul>
                <li className="modify"><Link to="/dashboard">Profile</Link></li>
                <li className="modify"><Link to="/dashboard/history">Medical history</Link></li>
                <li className="modify"><Link to="/dashboard/#">Insurance claim</Link></li>
                <Button variant="outline-danger">Sign out</Button>
            </ul>
        </>
    )
}

export default Navbar