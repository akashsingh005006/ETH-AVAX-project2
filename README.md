# MarksGrade

## Description

The MarksGrade contract is a Solidity smart contract designed to manage academic records of students on the Ethereum blockchain. It features a Student structure with fields for marks and grade, stored in a mapping (students) keyed by Ethereum addresses. The contract provides functionality through public methods: setMarks(uint _marks) allows students to set their marks and computes the corresponding grade ("A", "B", "C", "D") based on predefined thresholds, storing these values in the mapping for the caller's address (msg.sender). Additional methods getMarks() and getGrade() retrieve the marks and grade respectively for the caller. This contract is intended for integration into educational decentralized applications, ensuring transparent and immutable storage of academic achievements on the blockchain.

## Getting Started

### Installing

1. **Setting Metamask**
    - Ensure you have access to an wallet (e.g., MetaMask).
    - create a localhost network and connect it with Metamask wallet.
    
2. **preparing Gitpod**
   - Visit [Gitpod]
   - import package into Gitpod from Metachris repository.
   - update a `deploy.js` file with  `Marksgrade.sol` file.

3. **Modification**
   - Insert the updated code into `MarksGrade.sol`.

4. **Compile and Deploy**
   - Compile the code using the `Gitpod`.
  
     ### Executing Program
      After cloning the package in github, you have  to do the following to get the code running on your computer.

     1.Inside the project directory, in the terminal type: npm i
     ```solidity
     npm i
     ```
     2.In the second terminal type: npx hardhat node
     ```solidity
     npx hardhat node
     ```
     3.In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
     ```solidity
     //deploy the contract
     npx hardhat run --network localhost scripts/deploy.js
     ```
     4.Back in the first terminal, type npm run dev to launch the front-end.
     ```solidity
     npm run dev
     ```
     5.After this, the project will be run on your localhost. Typically at ```http://localhost:3000/```.
### Contract Code

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MarksGrade {
    struct Student {
        uint marks;
        string grade;
    }

    // Mapping to store student information
    mapping(address => Student) public students;

    // Function to set marks and calculate grade
    function setMarks(uint _marks) public {
        string memory _grade;
        // Determine grade based on marks
        if (_marks >= 90) {
            _grade = "A";
        } else if (_marks >= 75) {
            _grade = "B";
        } else if (_marks >= 50) {
            _grade = "C";
        } else {
            _grade = "D";
        }
        // Store marks and grade in mapping
        students[msg.sender] = Student(_marks, _grade);
    }

    // Function to get the marks of the caller
    function getMarks() public view returns (uint) {
        return students[msg.sender].marks;
    }

    // Function to get the grade of the caller
    function getGrade() public view returns (string memory) {
        return students[msg.sender].grade;
    }
}

```
### Help
For common issues like, refer to the following

- 1.Error: "Invalid provider": Verify that your RPC URL and private key are correct.
- 2.Error: "Contract not deployed": Ensure that the contract is correctly deployed on the specified network.

To display help Information :
```
npx hardhat help
```

### Author
Akash Singh

### License
this project is licensed under the MIT License

