import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
    // sign-in-page
    <div class="sign-in-page-wrapper">
    <div class="sign-in-page-container">
        <input type="text"/>
        <input type="text"/>
        <button>Login</button>
    </div>
</div>
// profile-page
<div class="user-main-page-wrapper">
    <div class="left-tab-list">
        <p class="nav-tab">Profile</p>
        <p class="nav-tab">Medical History</p>
        <p class="nav-tab">Insurance Claim</p>
        <p class="nav-tab">Notification</p>
    </div>
    <div class="main-page-container">
        <div class="profile-wrapper">
            <img src="../../assets/icons/profile-user.svg" class="profile-pic"/>
            <p class="user-name">UserName</p>
            <p class="uid">P123456789</p>
        </div>
    <div class="medical-history-wrapper">
        
    </div>
</div>
</div>
</div>
  );
}

export default App;
