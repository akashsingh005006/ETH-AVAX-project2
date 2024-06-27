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
