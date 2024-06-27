# ETH-AVAX-project2
## Start
A mapping structure is used by the MarksGrade contract in Solidity to manage student marks and grades. It offers services to retrieve marks and grades for the caller's address, sets marks, and automatically calculates grades (A, B, C, and D) depending on predetermined thresholds. This contract allows for the transparent management of academic data on the blockchain through integration with decentralized educational purposes.
### Description
The MarksGrade contract is a Solidity smart contract designed to manage academic records of students on the Ethereum blockchain. It features a Student structure with fields for marks and grade, stored in a mapping (students) keyed by Ethereum addresses. The contract provides functionality through public methods: setMarks(uint _marks) allows students to set their marks and computes the corresponding grade ("A", "B", "C", "D") based on predefined thresholds, storing these values in the mapping for the caller's address (msg.sender). Additional methods getMarks() and getGrade() retrieve the marks and grade respectively for the caller. This contract is intended for integration into educational decentralized applications, ensuring transparent and immutable storage of academic achievements on the blockchain.
#### Author
Akash Singh
