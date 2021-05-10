// SPDX-License-Identifier: MIT


// SPDX-License-Identifier: Something Else
pragma solidity >=0.4.22 <=0.8.4;

contract CRUD{

 struct User{
     uint userId;//patient P_NO;doc D_NO,I_NO;
     string username;
 }

User public users=User({userId:1,username:"Diyu"});
uint public nextId=1;

//add User(patient,Doctor,Insurance_Agent)
function create_User(uint Id, string memory name)public{
    nextId=Id;
    users.username=name;
    }
    
//find user by passing ID

function read_Userdata() view public returns (uint,string memory)
{
    // if(users.length>0){
        // uint i = 0;
    return(users.userId,users.username);
    // }
    // return (0,"None");
}

//Update username by passing ID and updated name;

// function update_Userdata(uint userId,string memory _username)public {
//     uint i = find_Id(userId);
//    users[i].username = _username;
// }

// // delete user;
// function delete_User(uint userId) public
// {
//     uint i = find_Id(userId);
//     delete users[i];
// }

// //finding the id 
// function find_Id(uint _userId) view internal returns(uint){
//     for(uint i=0;i<users.length;i++)
//     {
//         if(users[i].userId == _userId)
//         {
//             return i;
//         }
//     }
//     revert('User does not exists!');
// }
}
//create events 

//write functions with modifiers

//IPFS storage

