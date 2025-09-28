from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

app = Flask(__name__)
CORS(app) 


sms_model_path = "models/fraud_model.pkl"
gmail_model_path = "models/email_model.pkl"

if not os.path.exists(sms_model_path):
    raise FileNotFoundError(f"SMS model not found at {sms_model_path}")
if not os.path.exists(gmail_model_path):
    raise FileNotFoundError(f"Gmail model not found at {gmail_model_path}")

sms_model = joblib.load(sms_model_path)
gmail_model = joblib.load(gmail_model_path)


@app.route("/predict/sms", methods=["POST"])
def predict_sms():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 415

    data = request.get_json()
    message = data.get("message", "")

    if not message:
        return jsonify({"error": "Message is required"}), 400

    prediction = sms_model.predict([message])[0]
    return jsonify({"prediction": str(prediction)})


@app.route("/predict/gmail", methods=["POST"])
def predict_gmail():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 415

    data = request.get_json()
    message = data.get("message", "")

    if not message:
        return jsonify({"error": "Message is required"}), 400

    prediction = gmail_model.predict([message])[0]
    return jsonify({"prediction": str(prediction)})


# ----------------- NEW ROUTE FOR REPORTS -----------------
@app.route("/report", methods=["POST"])
def report():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 415

    data = request.get_json()

    name = data.get("name", "")
    email = data.get("email", "")
    details = data.get("details", "")
    detected_type = data.get("detectedType", "")
    spam_message = data.get("spamMessage", "")

    if not name or not email:
        return jsonify({"error": "Name and Email are required"}), 400

    # For now, just print to server logs (later you can save to DB / file)
    print("🚨 New Spam Report:")
    print(f"Name: {name}")
    print(f"Email: {email}")
    print(f"Detected Type: {detected_type}")
    print(f"Spam Message: {spam_message}")
    print(f"Details: {details}")

    return jsonify({"message": "Report submitted successfully!"}), 200
# ---------------------------------------------------------


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "🚀 Fraud Detection Backend is Running!"})


if __name__ == "__main__":
    app.run(debug=True)
