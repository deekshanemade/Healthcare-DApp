import {React, useState} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './Navbar';
import History from './history';
import Profile from './profile';
import SignIn from './sign_in';
import { useHistory } from 'react-router-dom';
import Medical_details from './medical_details';
import Insurance from './insurance';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../components/dashboard.css';

function Dashboard(props) {
    const { drizzle, drizzleState } = props;
    const [role, setRole] = useState('Patient');
    let sender = drizzle.web3.eth.accounts.givenProvider.selectedAddress;
    drizzle.contracts.Healthcare.methods.showAccInfo(sender).call().then(result => {
        setRole(result[2]);
    })

    return (
        <>
            <Router>
                <Route exact path='/' render={() => <SignIn drizzle={drizzle} drizzleState={drizzleState} />}></Route>
                <Row>
                    <Col lg={3} className="sidenav">
                        <Navbar drizzle={drizzle} drizzleState={drizzleState} role={role}/>
                    </Col>
                    <Col>
                        <div className="dash">Dashboard</div>
                        <Switch>
                            <Route exact path='/dashboard' render={() => <Profile drizzle={drizzle} drizzleState={drizzleState} />} />
                            <Route path='/dashboard/history' render={() => <History drizzle={drizzle} drizzleState={drizzleState} />} />
                            {/* <Route path='/dashboard/medical-details' render={() => <Medical_details />} /> */}
                            <Route path='/dashboard/medical-details' render={() => <Medical_details drizzle={drizzle} drizzleState={drizzleState} />} />
                            <Route path='/dashboard/insurance' render={() => <Insurance drizzle={drizzle} drizzleState={drizzleState} role={role}/>} />
                        </Switch>
                    </Col>
                </Row>

            </Router>
        </>
    )
}

export default Dashboard
