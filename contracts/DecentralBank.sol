// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
 string public name = "Decentral Bank";
 address public owner;
 Tether public tether;
 RWD public rwd;

 address[] public stackers;
 mapping (address => uint) public stackingBalance;
 mapping(address => bool) public hasStacked;
 mapping(address => bool) public isStaking;

 constructor(RWD _rwd ,Tether _tether) {
      rwd = _rwd;
      tether = _tether;
      owner = msg.sender;
 }

 // staking function
 function depositTokens(uint _amount) public {
     require(_amount > 0, "Ammount can not be 0");

     tether.transferFrom(msg.sender , address(this) , _amount);

     stackingBalance[msg.sender] += _amount;

     // update stacking balance
     if(!hasStacked[msg.sender]){
          stackers.push(msg.sender);
     }

     //update stacking
     isStaking[msg.sender] = true;
     hasStacked[msg.sender] = true;
 }

 modifier onlyOwner() {
     require(msg.sender == owner , "The caller must be owner.");
     _;
 }

// issue rewards
  function issueTokens() public onlyOwner {
     uint256 size = stackers.length;
     for (uint256 index = 0; index < size; index++) {

         address recipient = stackers[index];
         uint balance = stackingBalance[recipient];
         if(balance > 0) {
           // reward for each recipient according to thier stacked balance.
           // if stacked 20 token / 9 =  2.2 reward token
           rwd.transfer(recipient , balance / 9);
        }
     }
  }

}