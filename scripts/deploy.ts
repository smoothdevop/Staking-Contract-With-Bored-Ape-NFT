import { time } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {

  const StakedToken = await ethers.getContractFactory("SERC20");
  const stakedToken = await StakedToken.deploy();

  await stakedToken.deployed();

  console.log("Staked ERC20 Address\n",stakedToken.address);

//staking contract
  const StakingContract = await ethers.getContractFactory("Staking");
  const stakingContract = await StakingContract.deploy(stakedToken.address);

  await stakingContract.deployed();

  console.log("Staking Contract Address\n",stakingContract.address);

  //interaction

  ///////////////////////////////////////IMPERSOONATING///////////////////////////////////////////////
  const boredApeUser = "0xEF1BDC4a00b8231A3ac9D1c7D4BB63E6fDF290c0"
  await helpers.impersonateAccount(boredApeUser)
  const impersonatedBoredApeUser:any = await ethers.getSigner(boredApeUser);

  ///////////////////////////////CHECKING BALANCE/////////////////////////////////////////
  const bal =  await stakedToken.balanceOf(impersonatedBoredApeUser.address);
  console.log(".......................................BALANCE................................................................");
  
  console.log(bal, "BALANCE");
 
  /////////////////////////////////////////////////////APROVE CONTRACT AN AMOUNT OF TOKENS//////////////////////////////////////
  const amount = ethers.utils.parseUnits("10", 18)
  await stakedToken.connect(impersonatedBoredApeUser).approve(stakingContract.address, amount)
  console.log(await stakedToken.balanceOf(stakedToken.address), "balance........................");
  
  await stakedToken.connect(impersonatedBoredApeUser).transfer(stakingContract.address, ethers.utils.parseEther("20"));

////////////////////////////////////////////////STAKED///////////////////////////////////////////
  await stakingContract.connect(impersonatedBoredApeUser).Stake(amount);

  ///////////////////////////////////////////CHECKING CONTRACT BALANCE///////////////////////////////////
  console.log(await stakedToken.balanceOf(stakingContract.address), "staking contract balance......................");


  const currentTime = await time.latest()
  console.log("Your old time is\n", currentTime);
  await time.increaseTo(currentTime + 1667060466)
  const newCurrentTime = await time.latest()
  console.log("Your new time is\n", newCurrentTime);
  
//////////////////////////////////////////////////////WITHDRAWAL/////////////////////////////////////////////
  await stakingContract.connect(impersonatedBoredApeUser).withdrawStakedToken();


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
