//import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './Navbar.css';
import logo from '../assets/profile-user.svg';
import { Link, useHistory } from 'react-router-dom';
import { newContextComponents } from "@drizzle/react-components";
const { ContractData } = newContextComponents;
function Navbar(props) {
    const { drizzle, drizzleState } = props;
    const history = useHistory();
    const handleLogout = () => {
        history.replace('/');
        history.go(0);
    }
    let sender = drizzle.web3.eth.accounts.givenProvider.selectedAddress;
    return (
        <>
            <div className="title"><span><img src={logo} alt="DP" />
            <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showUserName" methodArgs={[sender, { from: sender }]} />
            </span></div>
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