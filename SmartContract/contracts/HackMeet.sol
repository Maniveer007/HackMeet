// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

contract HackMeet {
    
    struct NFTmeeting{
        string name;
        string description;
       address host;
       string encreptedkey;
       string decrpytingkey;
       address NFTaddress;
       uint256 no_of_nfts;
    }
    struct sismomeeting{
        string name;
        string description;
        address host;
        string sismogroupid;
        string meetingid;
    }
    // enum Meeting{
    //     NFTmeeting,
    //     sismomeeting
    // }

    NFTmeeting[] public NFTmeets;
    sismomeeting[] public sismomeets;

    function createsismomeeting(string memory _name,string memory _des,string memory _gid , string memory _meetingid) public{
        sismomeets.push(sismomeeting(_name,_des,msg.sender,_gid,_meetingid));
    } 
    function createNFTmeeting(string memory _name,string memory _des,string memory _en , string memory _de,address _nft,uint _value) public{
        NFTmeets.push(NFTmeeting(_name,_des,msg.sender,_en,_de,_nft,_value));
    } 

    function getallNFTmeetings() external view returns(NFTmeeting[] memory){
        return NFTmeets;
    }
    function getallsismomeetings() external view returns(sismomeeting[] memory){
        return sismomeets;
    }
    
    
}

//0xB5855CE815f5c0779Ee0741E194760AC16F1E918



//   0x0386BE4E536a8652CBDb5B3c906C4bd438Ac2987
