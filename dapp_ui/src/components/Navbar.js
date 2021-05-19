import Button from 'react-bootstrap/Button';
import './Navbar.css';
import logo from '../assets/profile-user.svg';
import { Link, useHistory } from 'react-router-dom';
import { newContextComponents } from "@drizzle/react-components";
const { ContractData } = newContextComponents;
function Navbar(props) {
    const { drizzle, drizzleState, role } = props;
    const history = useHistory();
    const handleLogout = () => {
        history.replace('/');
        history.go(0);
    }
    let sender = drizzle.web3.eth.accounts.givenProvider.selectedAddress;
    // drizzle.contracts.Healthcare.methods.showAccInfo(sender).call().then(result => {})
    if (role == "Insurance agent") {
        document.getElementById("Doc").hidden = true;
    }
    if (role == "Doctor") {
        document.getElementById("IA").hidden = true;
    }
    return (
        <>
            <div className="title"><span><img src={logo} alt="DP" />
                <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showUserName" methodArgs={[sender, { from: sender }]} />
            </span></div>
            <ul>
                <li className="modify"><Link to="/dashboard">Profile</Link></li>
                <li id="Doc" className="modify"><Link to="/dashboard/history">Medical history</Link></li>
                <li id="IA" className="modify"><Link to="/dashboard/insurance">Insurance claim</Link></li>
                <Button variant="outline-danger" onClick={handleLogout}>Sign out</Button>
            </ul>
        </>
    )
}

export default Navbar