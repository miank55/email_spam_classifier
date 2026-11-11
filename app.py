from pathlib import Path

import joblib
from flask import Flask, jsonify, render_template, request

BASE_DIR = Path(__file__).resolve().parent
app = Flask(__name__)

# Load the pre-trained artifacts distributed with this project.
model = joblib.load(BASE_DIR / "stacking_model.pkl")
vectorizer = joblib.load(BASE_DIR / "tfidf_vectorizer.pkl")


@app.get("/")
def home():
    return render_template("index.html")


@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "MailShield"})


@app.post("/predict")
def predict():
    message = (request.form.get("message") or "").strip()
    if not message:
        return jsonify({"error": "Please provide a non-empty message."}), 400
    if len(message) > 5000:
        return jsonify({"error": "Message must be 5,000 characters or fewer."}), 413

    features = vectorizer.transform([message])
    prediction = int(model.predict(features)[0])
    response = {
        "prediction": "Spam" if prediction == 1 else "Ham",
        "label": prediction,
    }

    # Some estimators expose probabilities; keep the endpoint compatible
    # with models that only implement predict().
    if hasattr(model, "predict_proba"):
        try:
            probabilities = model.predict_proba(features)[0]
            classes = list(model.classes_)
            response["confidence"] = float(probabilities[classes.index(prediction)])
        except (AttributeError, ValueError, TypeError):
            pass

    return jsonify(response)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)