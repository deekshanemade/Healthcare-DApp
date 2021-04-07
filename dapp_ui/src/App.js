import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import sign_in from './components/sign_in';
import sign_up from './components/sign_up';
import history from './components/history';
import medical_details from './components/medical_details'
import { DrizzleProvider } from '@drizzle/react-plugin'
import CRUD from './artifacts/CRUD.json'

const drizzleOptions = {
    contracts: [CRUD]
}

function App() {
    return (
        <DrizzleProvider options={drizzleOptions}>
            <Router>
                <Switch>
                    <Route path='/' exact component={history}></Route>
                    <Route path='/sign_up' exact component={sign_up}></Route>
                    <Route path='/medical-details' exact component={medical_details}></Route>
                </Switch>
            </Router>



            {/* sign-in-page */}


            {/* profile-page */}
            {/* <div class="user-main-page-wrapper">
                <div class="left-tab-list">
                    <p class="nav-tab">Profile</p>
                    <p class="nav-tab">Medical History</p>
                    <p class="nav-tab">Insurance Claim</p>
                    <p class="nav-tab">Notification</p>
                </div>
                <div class="main-page-container">
                    <div class="profile-wrapper">
                        <img src="../../assets/icons/profile-user.svg" class="profile-pic" />
                        <p class="user-name">UserName</p>
                        <p class="uid">P123456789</p>
                    </div>
                    <div class="medical-history-wrapper">

                    </div>
                </div>
            </div> */}
            </DrizzleProvider>
    );
}

export default App;
