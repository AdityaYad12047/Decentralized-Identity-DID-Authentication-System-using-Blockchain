const fetch = require("node-fetch").default;
const config = require("../config/config");

// 🔥 REGISTER (NO blockchain write here)
exports.registerDID = async (req, res) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    const generatedDID = `did:example:${walletAddress.slice(2)}`;

    res.json({
      message: "DID generated (frontend will store it on blockchain)",
      did: generatedDID
    });

  } catch (error) {
    res.status(500).json({
      error: "Failed to generate DID",
      details: error.message
    });
  }
};


// 🔥 FETCH DID (READ from blockchain)
exports.getDID = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    console.log("🔍 Fetching DID for:", walletAddress);
    console.log("👉 Using contract:", config.CONTRACT_ADDRESS);

    const { ethers } = require("ethers");

    const provider = new ethers.JsonRpcProvider(config.RPC_URL);

    const contract = new ethers.Contract(
      config.CONTRACT_ADDRESS,
      config.ABI,
      provider
    );

    const result = await contract.getDID(walletAddress);

    console.log("✅ Contract result:", result);

    const did = result[0];
    const owner = result[1];

    if (!did || did.trim() === "" || owner === "0x0000000000000000000000000000000000000000") {
      return res.status(404).json({ error: "No DID found for this address" });
    }

    res.json({ did, owner });

  } catch (error) {
    console.error("❌ Fetch DID Error:", error);

    res.status(500).json({
      error: "Failed to fetch DID from blockchain",
      details: error.message
    });
  }
};


// 🔥 ML FRAUD CHECK (unchanged)
exports.checkFraud = async (req, res) => {
  try {
    const response = await fetch(config.ML_SERVICE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error || "ML service rejected the request",
        details: data
      });
    }

    res.json(data);

  } catch (error) {
    console.error("Fraud Detection Error:", error);
    res.status(502).json({
      error: "ML service unavailable",
      details: error.message
    });
  }
};


// 🔥 HEALTH
exports.healthCheck = (req, res) => {
  res.send("DID Authentication Backend Running 🚀");
};
exports.healthCheck = (req, res) => {
  res.json({ status: "online", service: "did-backend" });
};
