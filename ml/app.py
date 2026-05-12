from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Load trained model
BASE_DIR = Path(__file__).resolve().parent
model = joblib.load(BASE_DIR / "fraud_model.pkl")

REQUIRED_FEATURES = [
    f"V{i}" for i in range(1, 29)
] + ["Amount"]



@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "online", "service": "ml-fraud-detection"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(silent=True) or {}
        missing = [feature for feature in REQUIRED_FEATURES if feature not in data]

        if missing:
            return jsonify({
                "error": "Missing required feature(s)",
                "missing": missing
            }), 400

        features = pd.DataFrame(
            [[float(data[feature]) for feature in REQUIRED_FEATURES]],
            columns=REQUIRED_FEATURES
        )

        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0].tolist()

        result = "Fraudulent / Suspicious" if prediction == 1 else "Legitimate"

        return jsonify({
            "prediction": int(prediction),
            "result": result,
            "probability": probability
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8000, debug=True)
