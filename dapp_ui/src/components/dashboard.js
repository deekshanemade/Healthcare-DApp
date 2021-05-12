import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './Navbar';
import History from './history';
import Profile from './profile';
import SignIn from './sign_in';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../components/dashboard.css';

function dashboard(props) {
    const { drizzle, drizzleState } = props;
    return (
        <>
            <Router>
            <Route exact path='/' render={() => <SignIn drizzle={drizzle} drizzleState={drizzleState} />}></Route>
                <Row>
                    <Col lg={3} className="sidenav">
                        <Navbar />
                    </Col>
                    <Col>
                        <div className="dash">Dashboard</div>
                        <Switch>
                            <Route exact path='/dashboard' render={() => <Profile drizzle={drizzle} drizzleState={drizzleState} />} />
                            <Route exact path='/dashboard/history' render={() => <History drizzle={drizzle} drizzleState={drizzleState} />} />
                        </Switch>
                    </Col>
                </Row>

            </Router>
        </>
    )
}

export default dashboard
