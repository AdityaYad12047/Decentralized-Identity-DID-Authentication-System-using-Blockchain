import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

print("Loading dataset...")
data = pd.read_csv("creditcard.csv")

# Features & label
X = data.drop(["Class", "Time"], axis=1)
y = data["Class"]

print("Splitting dataset...")
# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("Training model...")
# Train model (use n_estimators=10 and max_depth=5 to train quickly on the large dataset)
model = RandomForestClassifier(n_estimators=10, max_depth=5, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)

print("Evaluating...")
# Evaluate
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))

print("Saving model...")
# Save model
joblib.dump(model, "fraud_model.pkl")
print("Model saved successfully ✅")