// SPDX-License-Identifier: MIT

// SPDX-License-Identifier: Something Else
pragma solidity 0.8.4;

contract Healthcare {
    mapping(address => uint256) internal userID;
    uint256 internal numberOfUsers;
    address internal owner = msg.sender;

    struct User {
        address userPK;
        string userName;
        string userRole;
        string firstName;
        string middleName;
        string lastName;
        bool gender;
        uint8 age;
    }
    User[] users;

    constructor() {
        numberOfUsers = 0;
        users.push(User(owner,"Admin","Admin","Admin","Admin","Admin",false,0));
    }

    function addUser(string memory userName, address userAddr,string memory userRole) public{
        require(userID[userAddr] == 0 && msg.sender!=owner,"User already exists!");
        require(userAddr==msg.sender,"Provided account address does not match sender account!");
            userID[userAddr] = users.length;
            users.push(User(userAddr, userName, userRole,"First Name","Middle Name","Last Name",false,0));
            numberOfUsers = numberOfUsers + 1;
    }
    
    function updateUserInfo(string memory fName,string memory mName,string memory lName,bool gender, uint8 age) public{
        uint256 id = userID[msg.sender];
        require(id!=0,"You don't have permission to update user info!");
        users[id].firstName=fName;
        users[id].middleName=mName;
        users[id].lastName=lName;
        users[id].gender=gender;
        users[id].age=age;
        
    }
    
    function showUsersCount() public view returns(uint256){
        return(numberOfUsers);
    }
    
    function showAccInfo(address userAddr) public view returns(address Account,string memory UserName,string memory UserRole){
        require(msg.sender==userAddr && userID[userAddr] != 0 ,"You don't have permission to view user account details!");
        uint256 id = userID[userAddr];
        return(users[id].userPK,users[id].userName,users[id].userRole); 
    }
    
    function showPersonalInfo(address userAddr) public view returns(string memory FirstName,string memory MiddleName,string memory LastName,string memory Gender,uint8 Age){
        uint256 id = userID[userAddr];
        string memory gender;
        if(users[id].gender)
            gender="Female";
        else
            gender="Male";
        return(users[id].firstName,users[id].middleName,users[id].lastName,gender,users[id].age); 
    }
    
}
