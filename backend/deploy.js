const fs = require("fs");
const solc = require("solc");
const { ethers } = require("ethers");
const path = require("path");

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
    const wallet = new ethers.Wallet("0x814483205df495d58f5dc19c7d4dd1f056635e84d9234b5c1c7bc711e18aa494", provider);

    const contractPath = path.resolve(__dirname, "../blockchain/DIDRegistry.sol");
    const source = fs.readFileSync(contractPath, "utf8");

    const input = {
        language: "Solidity",
        sources: {
            "DIDRegistry.sol": {
                content: source,
            },
        },
        settings: {
            evmVersion: "paris",
            outputSelection: {
                "*": {
                    "*": ["*"],
                },
            },
        },
    };

    console.log("Compiling contract...");
    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    
    if (output.errors && output.errors.some(e => e.severity === 'error')) {
        console.error("Compilation failed:", output.errors);
        process.exit(1);
    }
    
    const contractFile = output.contracts["DIDRegistry.sol"]["DIDRegistry"];
    const abi = contractFile.abi;
    const bytecode = contractFile.evm.bytecode.object;

    console.log("Deploying contract...");
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy();
    await contract.waitForDeployment();

    const address = await contract.getAddress();
    console.log("Contract deployed at:", address);

    // Save ABI and Address to JSON for frontend/backend
    const artifact = {
        address: address,
        abi: abi
    };
    fs.writeFileSync(path.resolve(__dirname, "DIDRegistry.json"), JSON.stringify(artifact, null, 2));

    // Update .env
    const envPath = path.resolve(__dirname, ".env");
    let envContent = fs.readFileSync(envPath, "utf8");
    envContent = envContent.replace(/CONTRACT_ADDRESS=0x[a-fA-F0-9]{40}/, `CONTRACT_ADDRESS=${address}`);
    fs.writeFileSync(envPath, envContent);
    console.log("Updated .env with new contract address");
}

main().catch(console.error);
