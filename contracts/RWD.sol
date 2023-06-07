// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0; 

import "truffle/Console.sol";

contract RWD {
      string public name = "Rewad Token";
      string public symbole = "RWD";
      uint256 public totalSupply = 1000000000000000000000000; // 1 million token
      uint256 public decimals = 18;

      event Transfer(
            address indexed _from,
            address indexed _to,
            uint _value
      );

      event Approval(
            address indexed _owner,
            address indexed _spender,
            uint _value
      );

      mapping(address => uint256) public balanceOf;
      mapping (address => mapping(address => uint256)) public allowance;


      constructor () {
            balanceOf[msg.sender] = totalSupply;
      }

      function transfer(address _to ,uint256 _value) public returns (bool success) {
            require(balanceOf[msg.sender] >= _value , "The value is larger than balance");

            balanceOf[msg.sender] -= _value;
            balanceOf[_to] += _value;
            emit Transfer(msg.sender , _to , _value);
            return true;
      }

      function approve(address _spender ,uint256 _value) public returns (bool success) {
            allowance[msg.sender][_spender] = _value;
            emit Approval(msg.sender , _spender , _value);
            return true;
      }

       function transferFrom(address _from ,address _to ,uint256 _value) public returns (bool success) {
            require(_value <= balanceOf[_from]);
            require(_value <= allowance[_from][msg.sender]);

            balanceOf[_to] += _value;
            balanceOf[_from] -= _value;

            allowance[msg.sender][_from] -= _value;

            emit Transfer(_from , _to , _value);
            return true;
      }

}