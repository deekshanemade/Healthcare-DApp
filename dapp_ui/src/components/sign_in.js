import { React, useState } from 'react';
import './sign_in.css';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import { Col } from 'react-bootstrap';
import { newContextComponents } from "@drizzle/react-components";
const { ContractData, ContractForm } = newContextComponents;

function SignIn({ drizzle, drizzleState }) {
    const [user, setUser] = useState('');
    const [show, setShow] = useState(false);

    const acc = drizzle.web3.eth.accounts.givenProvider.selectedAddress;
    const history = useHistory();
    const handleLogin = () => {
        const u = user.toLowerCase();
        console.log("Metamask:" ,acc,"Input: ",u);
        if (u === acc) {
            history.push('/dashboard');
            history.go();
        }else{
            handleShow();
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <div >
            <Row>
                <Col>
                    <div className="form-wrapper">
                        <h2>Create Account</h2>
                        <br></br>
                        <ContractForm drizzle={drizzle} contract="Healthcare" method="addUser" sendArgs={{ from: acc, gas: 600000 }} />
                        {/* <ContractForm drizzle={drizzle} contract="Healthcare" method="updateUserInfo" sendArgs={{from: acc, gas: 600000}}/> */}
                        <br></br>
                        <p>
                            Number of users:<ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showUsersCount" />
                        </p>
                    </div>
                </Col>
                <Col>
                    <div className="form-wrapper2">
                        <h2>Login</h2>
                        <br></br>
                        <p>Enter account address:</p>
                        <input type="text" onChange={event => setUser(event.target.value)} />
                        <br></br><br></br>
                        <Button variant="primary" onClick={handleLogin}>Login</Button>
                    </div>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Incorrect account address</Modal.Title>
                </Modal.Header>
                <Modal.Body>Enter your account address from Metamask to Log in.</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default SignIn
// class SignIn extends React.Component {
//     state = {
//         dataKey: null,
//         sender: null
//     };

//     componentDidMount() {
//         const { drizzle, drizzleState } = this.props;
//         const contract = drizzle.contracts.Healthcare;
//         let dataKey = contract.methods["showUsersCount"].cacheCall(); // declare this call to be cached and synchronized
//         let sender = drizzle.web3.eth.accounts.givenProvider.selectedAddress; //gives the connected Metamask account
//         this.setState({ dataKey, sender });
//         // drizzle.contracts.Healthcare.methods.addUser("Chomu", "0x395Bc6F2Ba8F2CA27d83F77379140e332F8a1C47", "Role").send({ from: drizzleState.accounts[0], gas: 600000 });
//     }

//     handleLogin() {
//         console.log(this.props);
//         // this.props.history.push('/dashboard');
//     }
//     render() {
//         const { drizzle, drizzleState } = this.props;
//         const { Healthcare } = this.props.drizzleState.contracts;
//         const displayData = Healthcare.showUsersCount[this.state.dataKey]; // if displayData (an object) exists, then we can display the value below
//         const acc = this.state.sender;
//         console.log(acc, drizzleState.accounts[0])

//         return (

//             <div >
//                 <div className="form-wrapper">
//                     <h2>Create Account</h2>
//                     <ContractForm drizzle={drizzle} contract="Healthcare" method="addUser" sendArgs={{ from: acc, gas: 600000 }} />
//                     {/* <ContractForm drizzle={drizzle} contract="Healthcare" method="updateUserInfo" sendArgs={{from: acc, gas: 600000}}/> */}
//                     <div className="login-button">
//                         <Button variant="primary" onClick={this.handleLogin}>Login</Button>
//                     </div>
//                     <p>
//                         Number of users:<ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showUsersCount" />
//                     </p>
//                 </div>
//                 <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="showPersonalInfo" methodArgs={[drizzleState.accounts[0], { from: acc }]} />
//                 {/* <Form>
//                     <h2 className="heading">Login</h2>
//                     <Form.Group as={Col}>
//                         <Form.Control type="text" className="input-box" id="uName" placeholder="Enter username" />
//                         <Form.Control type="text" className="input-box" id="eKey" placeholder="Enter Ethereum key" />
//                         <Form.Control as="select" className="input-box" id="uRole">
//                             <option>Patient</option>
//                             <option>Doctor</option>
//                             <option>Insurance agent</option>
//                         </Form.Control>
//                     </Form.Group>
//                     <Button variant="warning"  type="submit" onSubmit={this.onFormSubmit()}>
//                         Create Ethereum account
//                         </Button>
//                 </Form> */}
//             </div>
//         )
//     }
// }
