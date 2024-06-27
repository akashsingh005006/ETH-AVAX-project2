const hre = require("hardhat");

async function main() {
  // Get the contract to deploy
  const MarksGrade = await hre.ethers.getContractFactory("MarksGrade");
  const marksGrade = await MarksGrade.deploy();
  await marksGrade.deployed();

  console.log(`MarksGrade contract deployed to: ${marksGrade.address}`);
}

// Handle errors and execute the script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
