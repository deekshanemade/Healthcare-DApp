import React from 'react';
import './sign_in.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import { Col } from 'react-bootstrap';
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

class SignIn extends React.Component {
    state = {
        dataKey: null,
        sender:null
    };

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Healthcare;
        let dataKey = contract.methods["showId"].cacheCall(); // declare this call to be cached and synchronized
        let sender = drizzle.web3.eth.accounts.givenProvider.selectedAddress; //gives the connected Metamask account
        this.setState({dataKey,sender});
        // drizzle.contracts.Healthcare.methods.addUser("Chomu", "0x395Bc6F2Ba8F2CA27d83F77379140e332F8a1C47", "Role").send({ from: drizzleState.accounts[0], gas: 600000 });

    }

    render() {
        const { drizzle, drizzleState } = this.props;
        const { Healthcare } = this.props.drizzleState.contracts;
        const displayData = Healthcare.showId[this.state.dataKey]; // if displayData (an object) exists, then we can display the value below
        const acc = this.state.sender;
        console.log(acc,drizzleState.accounts[0])
        return (
            <div >
                <div className="form-wrapper">
                    <p>Number of users: {displayData && displayData.value}</p>
                    <h2>Create Account</h2>
                    {/* <AccountData drizzle={drizzle} drizzleState={drizzleState} accountIndex={0} units="ether" precision={3} /> */}
                    <ContractForm drizzle={drizzle} contract="Healthcare" method="addUser" sendArgs={{ from: acc, gas: 600000 }} />
                    <ContractForm drizzle={drizzle} contract="Healthcare" method="updateUserInfo" sendArgs={{from: acc, gas: 600000}}/>
                    <div className="login-button">
                        <Link to='/dashboard' className="link">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
                <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Healthcare" method="users" methodArgs={[1]} />
                {/* <Form>
                    <h2 className="heading">Login</h2>
                    <Form.Group as={Col}>
                        <Form.Control type="text" className="input-box" id="uName" placeholder="Enter username" />
                        <Form.Control type="text" className="input-box" id="eKey" placeholder="Enter Ethereum key" />
                        <Form.Control as="select" className="input-box" id="uRole">
                            <option>Patient</option>
                            <option>Doctor</option>
                            <option>Insurance agent</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="warning"  type="submit" onSubmit={this.onFormSubmit()}>
                        Create Ethereum account
                        </Button>
                </Form> */}
            </div>
        )
    }
}

export default SignIn