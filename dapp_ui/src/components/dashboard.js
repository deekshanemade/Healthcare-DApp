import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './Navbar';
import history from './history';
import profile from './profile';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../components/dashboard.css';
function dashboard() {
    return (
        <>
            <Router>
                <Row>
                    <Col lg={3} className="sidenav">
                        <Navbar />
                    </Col>
                    <Col>
                        <div className="dash">Dashboard</div>
                        <Switch>
                            <Route path='/dashboard' exact component={profile} />
                            <Route path='/profile' exact component={profile} />
                            <Route path='/history' exact component={history} />
                        </Switch>
                    </Col>
                </Row>
            </Router>
        </>
    )
}

export default dashboard
