// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SERC20 is ERC20 {
    constructor() ERC20("Staketoken", "STKERC20") {
        _mint(0xEF1BDC4a00b8231A3ac9D1c7D4BB63E6fDF290c0, 10_000_000e18);
        _mint(address(this), 10_000_000e18);
    }
}


