// SPDX-License-Identifier: MIT

// SPDX-License-Identifier: Something Else
pragma solidity 0.8.4;

contract Healthcare {
    mapping(address => uint256) public userID;
    uint256 public numberOfUsers;

    struct User {
        address userPK;
        string userName;
        string userRole;
    }
    User[] public users;

    constructor() {
        numberOfUsers = 0;
        users.push(User(msg.sender,"Admin","Admin"));
    }

    function addUser(string memory userName, address userAddr,string memory userRole) public{
        if (userID[userAddr] == 0 && userAddr!=msg.sender) {
            userID[userAddr] = users.length;
            users.push(User(userAddr, userName, userRole));
            numberOfUsers = numberOfUsers + 1;
        }
    }
    
    function updateUserInfo(string memory userName,string memory userRole) public payable{
        uint256 id = userID[msg.sender];
        if(id!=0){
        users[id].userName=userName;
        users[id].userRole=userRole;
        }
    }
    
    function showId() public view returns (uint256) {
        return (numberOfUsers);
    }
}
