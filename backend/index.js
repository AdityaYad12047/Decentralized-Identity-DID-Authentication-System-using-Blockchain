const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ------------------------------
// BLOCKCHAIN CONFIGURATION
// ------------------------------
const RPC_URL = "http://127.0.0.1:7545";
const CONTRACT_ADDRESS = "0x8d365dE6E72E40bA028E9838604C4A2fECc13c0b";

// ------------------------------
// CONTRACT ABI
// ------------------------------
const ABI = [
  {
    inputs: [
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "string", name: "_did", type: "string" }
    ],
    name: "registerDID",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getDID",
    outputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "address", name: "", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  }
];

// ------------------------------
// BLOCKCHAIN READ-ONLY CONNECTION
// ------------------------------
const provider = new ethers.JsonRpcProvider(RPC_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

// ------------------------------
// TEMP FRAUD LOG STORAGE
// ------------------------------
let fraudLogs = [];

// ------------------------------
// ROOT ROUTE
// ------------------------------
app.get("/", (req, res) => {
  res.send("DID Authentication Backend Running with Blockchain + AI 🚀");
});

// ------------------------------
// HEALTH CHECK
// ------------------------------
app.get("/health", async (req, res) => {
  try {
    const network = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();

    res.json({
      status: "OK",
      backend: "Running",
      blockchain: "Connected",
      chainId: Number(network.chainId),
      latestBlock: blockNumber,
      contractAddress: CONTRACT_ADDRESS,
      mlService: "Expected on http://127.0.0.1:8000"
    });
  } catch (error) {
    console.error("Health Check Error:", error);
    res.status(500).json({
      status: "ERROR",
      backend: "Running",
      blockchain: "Connection Failed",
      error: error.message
    });
  }
});

// ------------------------------
// FETCH DID FROM BLOCKCHAIN
// ------------------------------
app.get("/get-did/:walletAddress", async (req, res) => {
  try {
    const walletAddress = req.params.walletAddress;

    if (!ethers.isAddress(walletAddress)) {
      return res.status(400).json({ error: "Invalid wallet address" });
    }

    const result = await contract.getDID(walletAddress);
    const did = result[0];
    const owner = result[1];

    if (!did || did.trim() === "") {
      return res.status(404).json({ error: "No DID found for this address" });
    }

    res.json({
      success: true,
      did,
      owner
    });
  } catch (error) {
    console.error("Fetch DID Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch DID from blockchain",
      details: error.message
    });
  }
});

// ------------------------------
// AI FRAUD DETECTION ROUTE
// ------------------------------
app.post("/check-fraud", async (req, res) => {
  try {
    const payload = {
      login_attempts: req.body.login_attempts ?? 0,
      failed_attempts: req.body.failed_attempts ?? 0,
      request_frequency: req.body.request_frequency ?? 0,
      odd_hour_access: req.body.odd_hour_access ?? 0,
      new_device: req.body.new_device ?? 0,
      location_change: req.body.location_change ?? 0,
      multiple_wallet_switches: req.body.multiple_wallet_switches ?? 0
    };

    console.log("Fraud Check Payload:", payload);

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("ML Raw Response:", data);

    if (!data.success) {
      return res.status(500).json({
        success: false,
        error: data.error || "ML prediction failed"
      });
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      input: payload,
      result: data.result,
      prediction: data.prediction,
      probability: data.probability,
      model_used: data.model_used
    };

    fraudLogs.push(logEntry);

    res.json({
      success: true,
      result: data.result,
      prediction: data.prediction,
      probability: data.probability,
      model_used: data.model_used
    });

  } catch (error) {
    console.error("Fraud Detection Error:", error);
    res.status(500).json({
      success: false,
      error: "ML service error",
      details: error.message
    });
  }
});

// ------------------------------
// GET FRAUD LOGS
// ------------------------------
app.get("/fraud-logs", (req, res) => {
  res.json({
    totalLogs: fraudLogs.length,
    logs: fraudLogs
  });
});

// ------------------------------
// CLEAR FRAUD LOGS
// ------------------------------
app.delete("/fraud-logs", (req, res) => {
  fraudLogs = [];
  res.json({
    message: "Fraud logs cleared successfully 🧹"
  });
});

// ------------------------------
// START SERVER
// ------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});