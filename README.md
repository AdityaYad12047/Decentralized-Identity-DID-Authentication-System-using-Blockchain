# 🔐 Decentralized Identity (DID) Authentication System

### Blockchain + AI-Powered Secure Identity Verification Platform

<p align="center">
  <img src="https://img.shields.io/badge/Blockchain-Solidity-blue?style=for-the-badge&logo=ethereum" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/ML-Flask%20%2B%20ScikitLearn-red?style=for-the-badge&logo=python" />
  <img src="https://img.shields.io/badge/Web3-MetaMask-orange?style=for-the-badge&logo=metamask" />
</p>

<p align="center">
A decentralized, wallet-based authentication platform leveraging Blockchain and Machine Learning to provide secure, passwordless identity verification with AI-powered fraud detection.
</p>

---

# 📌 Project Overview

Traditional authentication systems rely heavily on centralized identity providers and password-based access control, creating major risks including credential theft, centralized breaches, phishing attacks, and poor user privacy.

This project introduces a **Decentralized Identity (DID) Authentication System** where users authenticate using their crypto wallets instead of traditional usernames and passwords.

The platform combines:

* 🔗 Blockchain-based decentralized identity verification
* 🧠 AI-powered fraud detection
* 🔐 Wallet-based authentication
* ⚡ Real-time backend orchestration
* 🏗️ Modular microservice architecture

Built as part of the **IBM Internship Program**, the system demonstrates how Web3 and AI can work together to create secure and privacy-first authentication infrastructure.

---

# 🚀 Key Features

## ✅ Implemented Features

* MetaMask wallet authentication
* DID registration linked to wallet addresses
* Smart contract-based identity verification
* Passwordless login system
* Backend API orchestration using Node.js
* AI-based fraud detection pipeline
* Real-time authentication validation
* Modular full-stack architecture
* REST API communication across services
* React-based responsive frontend UI

---

# 🧠 AI Fraud Detection System

The platform integrates a Machine Learning fraud detection module capable of identifying suspicious authentication behavior patterns.

## 🔍 Detection Capabilities

* Unusual login frequency
* Geo-location anomalies
* Device fingerprint mismatches
* Odd-hour access attempts
* Suspicious authentication behavior
* Repeated failed verification attempts

## ⚙️ ML Stack

* Python
* Flask
* Scikit-learn
* Pandas
* Joblib

## 📈 Model Highlights

* Fraud detection accuracy: ~85–95%
* Real-time inference support
* Lightweight REST-based ML inference service
* Extendable behavioral analytics pipeline

---

# 🏗️ System Architecture

The system follows a distributed multi-layered architecture integrating Blockchain, Backend APIs, Frontend UI, and Machine Learning services.

---

## 🔹 High-Level Architecture

```text
        ┌──────────────────────────────┐
        │        Frontend (React)      │
        │  - MetaMask + Ethers.js      │
        └──────────────┬───────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │     Backend (Node.js)        │
        │  - REST APIs                 │
        │  - Authentication Logic      │
        └──────────────┬───────────────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
┌───────────────────┐     ┌──────────────────────┐
│ Blockchain Layer  │     │   ML Fraud Service   │
│  (Solidity)       │     │   (Python + Flask)   │
│ - Smart Contracts │     │ - Fraud Detection    │
│ - DID Verification│     │ - Risk Analysis      │
└───────────────────┘     └──────────────────────┘
```

---

# 🔄 Authentication Workflow

## Step-by-Step Flow

1. User connects MetaMask wallet
2. Frontend sends authentication request
3. Backend validates DID ownership
4. Smart contract verifies identity
5. ML service analyzes fraud risk
6. Risk score returned to backend
7. Authentication result sent to frontend
8. User granted or denied access

---

# 🧩 Technology Stack

## 🎨 Frontend

* React.js
* CSS3
* Ethers.js
* MetaMask SDK

## ⚙️ Backend

* Node.js
* Express.js
* REST APIs

## 🔗 Blockchain

* Solidity
* Ethereum
* Remix IDE
* MetaMask

## 🧠 Machine Learning

* Python
* Flask
* Scikit-learn
* Pandas
* Joblib

---

# 📂 Project Structure

```bash
DID_Auth_System/
│
├── backend/          # Node.js API server
├── blockchain/       # Solidity smart contracts
├── frontend/         # React frontend
├── ml/               # Fraud detection service
│
├── README.md
└── package.json
```

---

# ⚡ Performance Metrics

| Metric                        | Value                      |
| ----------------------------- | -------------------------- |
| Fraud Detection Accuracy      | 85–95%                     |
| API Response Time             | ~100–300ms                 |
| Unauthorized Access Reduction | ~30–50%                    |
| Authentication Type           | Wallet-Based               |
| Architecture                  | Distributed Modular System |

---

# 🔐 Security Features

* Passwordless authentication
* Wallet signature verification
* Smart contract validation
* Decentralized identity ownership
* Fraud behavior analysis
* API-level validation
* Modular service isolation

---

# 🛠️ Installation & Setup

# 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/DID-Auth-System.git
cd DID-Auth-System
```

---

# 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

---

# 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

# 4️⃣ ML Service Setup

```bash
cd ml
pip install -r requirements.txt
python app.py
```

---

# 5️⃣ Blockchain Setup

* Open Remix IDE
* Deploy Solidity smart contract
* Connect MetaMask wallet
* Update contract address in backend/frontend

---

# 🌩️ Planned Enhancements

* AI risk scoring dashboard
* Cloud deployment (AWS/GCP)
* Advanced behavioral analytics
* Multi-chain identity support
* Role-based access control (RBAC)
* Zero-knowledge proof integration
* OAuth/Web3 hybrid authentication
* Real-time security monitoring

---

# 📚 Learning Outcomes

This project provided hands-on experience with:

* Blockchain-based identity systems
* Smart contract development
* Full-stack architecture design
* AI + Web3 integration
* REST API orchestration
* Fraud detection systems
* Distributed authentication workflows
* Microservice communication

---

# 🤝 Contributing

Contributions, feature suggestions, and improvements are welcome.

## Steps:

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

---

# ⭐ Support

If you found this project useful:

* ⭐ Star the repository
* 🍴 Fork the project
* 🔗 Share it with others

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Aditya Yadav & Anjali Rawat**

* GitHub: https://github.com/adityayad12047
* GitHub: https://github.comanjali15-rawat/
* LinkedIn: https://www.linkedin.com/in/aditya-y-7644961aa/
* LinkedIn: https://www.linkedin.com/in/anjali-rawat-33687132a/
* Portfolio: https://adityacodes.gt.tc/
* Portfolio: https://anjalirawatcodes.netlify.app/
  
