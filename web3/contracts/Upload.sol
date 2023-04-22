// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Upload {
    struct File {
        address owner;
        string name;
        string link;
    }

    mapping(uint256 => File) public files;

    uint256 public numberOfFiles = 0;

    function addFile(address _owner, string memory _name, string memory _link) public returns (uint256) {
        File storage newFile = files[numberOfFiles];
        
        newFile.owner = _owner;
        newFile.name = _name;
        newFile.link = _link;

        numberOfFiles++;
        return numberOfFiles - 1;
    }

    function getFile() public view returns (File[] memory) {
        File[] memory allFiles = new File[] (numberOfFiles);
        
        for (uint index = 0; index < numberOfFiles; index++) {
            File storage item = files[index];
            allFiles[index] = item;
        }

        return allFiles;
    }
}