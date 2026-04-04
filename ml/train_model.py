import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# ------------------------------
# LOAD DATASET
# ------------------------------
df = pd.read_csv("fraud_dataset.csv")

print("📌 Dataset Preview:")
print(df.head())

print("\n📌 Dataset Shape:", df.shape)
print("\n📌 Dataset Columns:", df.columns.tolist())

# ------------------------------
# FEATURES & TARGET
# ------------------------------
X = df.drop("label", axis=1)
y = df["label"]

# ------------------------------
# TRAIN-TEST SPLIT
# ------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ------------------------------
# RANDOM FOREST MODEL
# ------------------------------
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# ------------------------------
# PREDICTIONS
# ------------------------------
y_pred = model.predict(X_test)

# ------------------------------
# EVALUATION
# ------------------------------
accuracy = accuracy_score(y_test, y_pred)

print("\n✅ Model Accuracy:", accuracy)
print("\n📊 Classification Report:")
print(classification_report(y_test, y_pred))

print("\n📉 Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# ------------------------------
# SAVE MODEL
# ------------------------------
joblib.dump(model, "fraud_model.pkl")

print("\n💾 Random Forest model saved as fraud_model.pkl")