// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IERC20 {
 
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

interface IERC721{
 
    function balanceOf(address account) external view returns (uint256);
   
}

contract Staking {
    IERC20 stakeERC20;
    IERC721 boredApe = IERC721(0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D);

constructor( IERC20 tokenAddress) {
stakeERC20 = IERC20(tokenAddress);
}

    struct StakedDetails{
        uint tokenAmount;
        uint timeDeposited;
    }

    mapping (address => StakedDetails ) StakedBalances;

    function Stake(uint256 tokenAmount) public  {
        StakedDetails memory staked = StakedBalances[msg.sender];
        require(stakeERC20.balanceOf(msg.sender) >= tokenAmount, "Amount too big");
        require(boredApe.balanceOf(msg.sender) >= 1 , "you dont have a bored ape");
        require(stakeERC20.transferFrom(msg.sender, address(this), tokenAmount));
        staked.tokenAmount += tokenAmount;
        staked.timeDeposited = block.timestamp;
    }

    function withdrawStakedToken()  public {
        StakedDetails storage staked = StakedBalances[msg.sender];
        require( staked.timeDeposited >  staked.timeDeposited + 30 days, "time never reach");
        uint stakedamount = staked.tokenAmount;
        uint percentageAmount = stakedamount * 10/100;
        uint newAmount = stakedamount + percentageAmount;
        stakeERC20.transfer(msg.sender, newAmount);
    }

  
}