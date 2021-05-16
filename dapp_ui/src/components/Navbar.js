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
    // const show = false;
    drizzle.contracts.Healthcare.methods.showAccInfo(sender).call().then(result => {
        if (result[2] != "Insurance agent") {
            document.getElementById("show").hidden = true;
            // console.log(document.getElementById("show").hidden)
        }
    })
    return (
        <>
            <div className="title"><span><img src={logo} alt="DP" />
                <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showUserName" methodArgs={[sender, { from: sender }]} />
            </span></div>
            <ul>
                <li className="modify"><Link to="/dashboard">Profile</Link></li>
                <li className="modify"><Link to="/dashboard/history">Medical history</Link></li>
                <li id="show" className="modify"><Link to="/dashboard/insurance">Insurance claim</Link></li>
                <Button variant="outline-danger" onClick={handleLogout}>Sign out</Button>
            </ul>
        </>
    )
}

export default Navbar