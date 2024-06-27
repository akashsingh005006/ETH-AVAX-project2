import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import marksGradeABI from "../artifacts/contracts/MarksGrade.sol/MarksGrade.json";

export default function MarksGradePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [marksGrade, setMarksGrade] = useState(undefined);
  const [marks, setMarks] = useState(undefined);
  const [grade, setGrade] = useState(undefined);

  const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
  const contractABI = marksGradeABI.abi; // Replace with your contract ABI

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(new ethers.providers.Web3Provider(window.ethereum));
      window.ethereum.on("accountsChanged", (accounts) => handleAccount(accounts));
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
      setAccount(undefined);
    }
  };

  const connectAccount = async () => {
    try {
      if (!ethWallet) {
        alert("MetaMask wallet is required to connect");
        return;
      }

      const accounts = await ethWallet.send("eth_requestAccounts");
      handleAccount(accounts);
      getMarksGradeContract();
    } catch (error) {
      console.error("Error connecting to account:", error);
    }
  };

  const getMarksGradeContract = () => {
    const signer = ethWallet.getSigner();
    const marksGradeContract = new ethers.Contract(contractAddress, contractABI, signer);
    setMarksGrade(marksGradeContract);
  };

  const fetchMarksAndGrade = async () => {
    try {
      if (marksGrade) {
        const fetchedMarks = await marksGrade.getMarks();
        const fetchedGrade = await marksGrade.getGrade();

        setMarks(fetchedMarks.toNumber());
        setGrade(fetchedGrade);
      }
    } catch (error) {
      console.error("Error fetching marks and grade:", error);
    }
  };

  const setMarksValue = async (marks) => {
    try {
      if (marksGrade) {
        let tx = await marksGrade.setMarks(marks);
        await tx.wait();
        fetchMarksAndGrade();
      }
    } catch (error) {
      console.error("Error setting marks:", error);
    }
  };

  const initUser = () => {
    // Check if MetaMask is installed
    if (!ethWallet) {
      return <p>Please install MetaMask to authenticate.</p>;
    }

    // Check if user is connected
    if (!account) {
      return (
        <button className="connect-button" onClick={connectAccount}>
          Authenticate with MetaMask Wallet
        </button>
      );
    }

    // Fetch marks and grade if not fetched yet
    if (marks === undefined) {
      fetchMarksAndGrade();
    }

    // Display marks and grade
    return (
      <div className="marks-container">
        <div className="set-marks">
          <label>Set Your Marks: </label>
          <input type="number" id="marksInput" name="marksInput" />
          <button onClick={() => setMarksValue(document.getElementById("marksInput").value)}>Set</button>
        </div>

        <div className="boundary"></div>

        <div className="result-section">
          <button className="result-button" onClick={fetchMarksAndGrade}>Show Result</button>
          <div>
            <p>Your Marks: {marks !== undefined ? marks : 'N/A'}</p>
            <p>Your Grade: {grade !== undefined ? grade : 'N/A'}</p>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1 className="title">Marks vs Grade</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: #f0f0f0;
          color: #333;
          border: 2px solid #ccc;
          padding: 20px;
          border-radius: 10px;
          margin: 20px auto;
          max-width: 600px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .title {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .connect-button, .result-button, .set-marks button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 5px;
          margin: 10px 0;
          transition: background-color 0.3s ease;
        }
        .connect-button:hover, .result-button:hover, .set-marks button:hover {
          background-color: #0056b3;
        }
        .marks-container {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .boundary {
          width: 100%;
          height: 2px;
          background-color: #ccc;
          margin: 20px 0;
        }
        .set-marks {
          margin-bottom: 20px;
        }
        .set-marks label {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .set-marks input {
          padding: 8px;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: 150px;
          font-size: 16px;
        }
        .set-marks button {
          padding: 8px 20px;
          font-size: 16px;
        }
        .result-section {
          margin-bottom: 20px;
        }
      `}</style>
    </main>
  );
}
