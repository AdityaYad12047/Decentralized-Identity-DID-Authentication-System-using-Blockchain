const app = require("./app");
const config = require("./config/config");

const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Blockchain RPC: ${config.RPC_URL}`);
  console.log(`🤖 ML Service: ${config.ML_SERVICE_URL}`);
});