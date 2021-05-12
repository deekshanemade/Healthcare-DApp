//import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './Navbar.css';
import logo from '../assets/profile-user.svg';
import { Link,useHistory } from 'react-router-dom';
function Navbar() {
    const history = useHistory();
    const handleLogout=()=>{
        history.replace('/');
        history.go(0);
    }
    return (
        <>
            <div className="title"><span><img src={logo} alt="DP" /> UserName</span></div>
            <ul>
                <li className="modify"><Link to="/dashboard">Profile</Link></li>
                <li className="modify"><Link to="/dashboard/history">Medical history</Link></li>
                <li className="modify"><Link to="/dashboard/#">Insurance claim</Link></li>
                <Button variant="outline-danger" onClick={handleLogout}>Sign out</Button>
            </ul>
        </>
    )
}

export default Navbar