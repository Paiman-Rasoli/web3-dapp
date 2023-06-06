// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {

 address public owner;
 uint public last_completed_migration;

 constructor () public {
    owner = msg.sender;
 }

 modifier onlyOwner {
  require(msg.sender == owner);
  _;
 }

 function set_completed(uint completed) public onlyOwner {
  last_completed_migration = completed;
 }

 function upgrade(address new_address) public onlyOwner {
  Migrations upgrade = Migrations(new_address);
  upgrade.set_completed(last_completed_migration);
 }

}
