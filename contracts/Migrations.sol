// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {

 address public owner;
 uint public last_completed_migration;

 constructor () {
    owner = msg.sender;
 }

 modifier onlyOwner {
  require(msg.sender == owner);
  _;
 }

 function setCompleted(uint completed) public onlyOwner {
  last_completed_migration = completed;
 }

 function upgrade(address new_address) public onlyOwner {
  Migrations upgradeInstance = Migrations(new_address);
  upgradeInstance.setCompleted(last_completed_migration);
 }

}
