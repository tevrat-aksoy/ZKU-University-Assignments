// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Contract definition
contract HelloWorld {
    // State variable definition for storage number
    uint256 public numberStorage;

    function storeNumber(uint256 newStorageNumber) public {
        numberStorage = newStorageNumber;
    }

    function retrieveNumber() public view returns (uint256) {
        return numberStorage;
    }
}
