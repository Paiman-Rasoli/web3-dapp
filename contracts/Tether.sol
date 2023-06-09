// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0; 

contract Tether {
      string public name = "Tether";
      string public symbole = "mUSDT";
      uint256 public  totalSupply = 1000000000000000000000000; // 1 million token
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
            require(balanceOf[msg.sender] >= _value ,"Error while transfering");

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
            require(_value <= balanceOf[_from] , "From param is insuffecient.");
            require(_value <= allowance[_from][msg.sender] , "Need approval for this transaction");

            balanceOf[_to] += _value;
            balanceOf[_from] -= _value;
            if(allowance[msg.sender][_from] > 0){
            
                allowance[msg.sender][_from] -= _value;
            }

            emit Transfer(_from , _to , _value);
            return true;
      }

}