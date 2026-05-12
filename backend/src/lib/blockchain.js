const { ethers } = require("ethers");
const config = require("../config/config");

const getContract = () => {
  const provider = new ethers.JsonRpcProvider(config.RPC_URL);

  if (!config.PRIVATE_KEY) {
    console.warn("⚠️ PRIVATE_KEY not found.");
    return null;
  }

  const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);

  console.log("👉 Backend contract:", config.CONTRACT_ADDRESS);
  console.log("👉 Backend wallet:", wallet.address);

  return new ethers.Contract(
    config.CONTRACT_ADDRESS,
    config.ABI,
    wallet
  );
};

module.exports = { getContract };