from flask import Flask, request, jsonify
import joblib
import numpy as np
import traceback

app = Flask(__name__)

# ------------------------------
# LOAD MODEL
# ------------------------------
try:
    model = joblib.load("fraud_model.pkl")
    print("✅ Random Forest model loaded successfully")
    print("📌 Model Type:", type(model))
except Exception as e:
    print("❌ Failed to load model:", str(e))
    model = None

# ------------------------------
# HOME ROUTE
# ------------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "AI Fraud Detection ML Service Running 🚀",
        "model": "Random Forest Classifier"
    })

# ------------------------------
# HEALTH ROUTE
# ------------------------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "success": True,
        "model_loaded": model is not None,
        "model_type": str(type(model))
    })

# ------------------------------
# PREDICT ROUTE
# ------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        if model is None:
            return jsonify({
                "success": False,
                "error": "Model not loaded"
            }), 500

        data = request.get_json(force=True)

        print("📩 Incoming Request Data:", data)

        features = np.array([[
            float(data.get("login_attempts", 0)),
            float(data.get("failed_attempts", 0)),
            float(data.get("request_frequency", 0)),
            float(data.get("odd_hour_access", 0)),
            float(data.get("new_device", 0)),
            float(data.get("location_change", 0)),
            float(data.get("multiple_wallet_switches", 0))
        ]])

        print("📊 Features Sent to Model:", features)

        prediction = int(model.predict(features)[0])

        # Safe probability handling
        try:
            probability = model.predict_proba(features)[0].tolist()
        except Exception as prob_error:
            print("⚠️ predict_proba failed:", str(prob_error))
            probability = []

        result = "Fraudulent / Suspicious" if prediction == 1 else "Legitimate"

        response_data = {
            "success": True,
            "prediction": prediction,
            "result": result,
            "probability": probability,
            "model_used": "Random Forest"
        }

        print("✅ Prediction Response:", response_data)

        return jsonify(response_data)

    except Exception as e:
        print("❌ Prediction Error:")
        traceback.print_exc()

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# ------------------------------
# START APP
# ------------------------------
if __name__ == "__main__":
    app.run(port=8000, debug=True)