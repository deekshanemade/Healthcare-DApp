import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './Navbar';
import history from './history';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../components/dashboard.css';
//import '../components/Navbar.css';
function dashboard() {
    return (
        <>
        <Router>
            <Row className="sec">
                <Col xs={3} className="sidenav">
                    <Navbar />
                </Col>
                <Col>
                <Link to="/nav"> nav</Link>
                    {/* <Link to="/history"> nav</Link> */}
                    <Switch>
                        <Route path='/' exact />
                        <Route path='/nav' exact component={Navbar} />
                        <Route path='/history' exact component={history} />
                    </Switch></Col>
            </Row>
        </Router>
        </>
    )
}

export default dashboard
