// SPDX-License-Identifier: MIT

// SPDX-License-Identifier: Something Else
pragma solidity 0.8.4;

contract Healthcare {
    address internal owner = msg.sender; //store account address that deployed the smart contract

    struct User {                       //For storing user info
        address userPK;
        string userName;
        string userRole;
        string firstName;
        string middleName;
        string lastName;
        bool gender;
        uint8 age;
        uint noOfRecords;
        string docAddr;
    }
    mapping(address => User) user;
    address[] usersArray;               //To get total number of users
    
    struct Document{                    //For storing user documents using unique key made of userAddr_index
        string reason;
        string desc;
        string[] medicalDocs;
        string[] bills;
    }
    mapping(string=>Document) documents;
    
    struct InsuranceClaim{
        address userPK;
        string key;
        bool generated;
        bool granted;
        string Claim_Request;
    }
    mapping(address => InsuranceClaim) claim;
    
    function addUser(string memory userName, address userAddr,string memory userRole) public{
        require(userAddr==msg.sender && msg.sender!=owner,"Incorrect user address!");
            User memory u = user[userAddr];
            u.userPK=userAddr;
            u.userName=userName;
            u.userRole=userRole;
            u.firstName="First Name";
            u.middleName="Middle Name";
            u.lastName="Last Name";
            u.gender=false;
            u.age=0;
            u.noOfRecords=0;
            u.docAddr="";
            user[userAddr]=u;
            usersArray.push(userAddr);
    }
    
    function updateUserInfo(string memory fName,string memory mName,string memory lName,bool gender, uint8 age) public{
        require(msg.sender!=owner,"You cannot update user info!");
        user[msg.sender].firstName=fName;
        user[msg.sender].middleName=mName;
        user[msg.sender].lastName=lName;
        user[msg.sender].gender=gender;
        user[msg.sender].age=age;
    }
    
    function showUsersCount() public view returns(uint256){
        return(usersArray.length);
    }
    
    function showAccInfo(address userAddr) public view returns(address Account,string memory UserName,string memory UserRole){
        require(msg.sender==userAddr && userAddr != owner ,"You don't have permission to view user account details!");
        return(user[userAddr].userPK,user[userAddr].userName,user[userAddr].userRole); 
    }
    
    function showPersonalInfo(address userAddr) public view returns(string memory FirstName,string memory MiddleName,string memory LastName,string memory Gender,uint8 Age,uint TotalRecords){
        string memory gender;
        if(user[userAddr].gender)
            gender="Female";
        else
            gender="Male";
        return(user[userAddr].firstName,user[userAddr].middleName,user[userAddr].lastName,gender,user[userAddr].age,user[userAddr].noOfRecords); 
    }
    
    function showUserName(address userAddr) public view returns(string memory UserName){
        return(user[userAddr].userName);
    }
    
    function giveAccess(string memory _docAddr,address userAddr) public payable{
        user[userAddr].docAddr=_docAddr;
    }
    
    function checkAccess(address patientAddr) public view returns(string memory AllowedAccess){ //use the returned value to check if access is given, then show records
        return(user[patientAddr].docAddr);
    }
    
    function retrieveAccess(address userAddr) public payable{
        user[userAddr].docAddr="";
    }
        
    function addRecord(string memory index,address userAddr, string memory _reason,string memory _desc) public payable{
        Document memory d = documents[index];
        d.reason=_reason;
        d.desc=_desc;
        documents[index]=d;
        user[userAddr].noOfRecords++;
    }
    function addMedicalDocs(string memory index,string memory hash) public payable{
     documents[index].medicalDocs.push(hash);   
    }
    
    function addBills(string memory index,string memory hash) public payable{
     documents[index].bills.push(hash);   
    }
    
    function showRecord(string memory index) public view returns(string memory Reason, string memory Description,string[] memory MedicalDocs,string[] memory Bills){
        return(documents[index].reason,documents[index].desc, documents[index].medicalDocs,documents[index].bills);
    }
    
    function createClaimRequest(bool _generated,address userAddr,string memory _key) public payable{
        require(userAddr==msg.sender && msg.sender!=owner,"Incorrect user address!");
        InsuranceClaim memory ic= claim[userAddr];
        ic.userPK=userAddr;
        ic.key=_key;
        ic.generated=_generated;
        ic.granted=false;
        ic.Claim_Request="Pending";
        claim[userAddr]=ic;
    }
    
    function showClaimRequest(address userAddr) public view returns(string memory Key,bool Request_Generated,string memory Request_Status){
        return(claim[userAddr].key,claim[userAddr].generated,claim[userAddr].Claim_Request);
    }
    
    function grantClaimRequest(address userAddr) public payable{
        claim[userAddr].granted=true;
        claim[userAddr].Claim_Request="Granted";
    }
    
    function rejectClaimRequest(address userAddr) public payable{
        claim[userAddr].granted=false;
        claim[userAddr].Claim_Request="Rejected";
    }
    
    function deleteClaimRequest(address userAddr) public payable{
        claim[userAddr].key='';
        claim[userAddr].generated=false;
        claim[userAddr].granted=false;
        claim[userAddr].Claim_Request="Deleted";
    }
    
}