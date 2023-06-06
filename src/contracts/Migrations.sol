// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
 address public owner;
 uint public last_completed_migration;

 constructor () public {
    owner = msg.sender;
 }
}
