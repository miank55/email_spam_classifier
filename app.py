from pathlib import Path

import joblib
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Resolve model files relative to this file so the app works regardless
# of the directory from which it is launched.
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "stacking_model.pkl"
VECTORIZER_PATH = BASE_DIR / "tfidf_vectorizer.pkl"
MAX_MESSAGE_LENGTH = 2000

for artifact_path in (MODEL_PATH, VECTORIZER_PATH):
    if not artifact_path.is_file():
        raise FileNotFoundError(
            f"Required model artifact not found: {artifact_path.name}. "
            "Make sure the repository includes both .pkl files."
        )

# Only load pickle/joblib artifacts from this trusted project repository.
model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/health", methods=["GET"])
def health():
    """Simple endpoint for checking whether the Flask app has started."""
    return jsonify({"status": "ok", "model_loaded": model is not None})


@app.route("/predict", methods=["POST"])
def predict():
    # Support the existing HTML FormData frontend and JSON API clients.
    if request.is_json:
        payload = request.get_json(silent=True) or {}
        message = payload.get("message", "")
    else:
        message = request.form.get("message", "")

    if not isinstance(message, str):
        return jsonify({"error": "Message must be text."}), 400

    message = message.strip()
    if not message:
        return jsonify({"error": "Please enter a message."}), 400

    if len(message) > MAX_MESSAGE_LENGTH:
        return jsonify(
            {"error": f"Message must be {MAX_MESSAGE_LENGTH} characters or fewer."}
        ), 400

    try:
        message_tfidf = vectorizer.transform([message])
        prediction = model.predict(message_tfidf)[0]
        is_spam = str(prediction).strip().lower() in {"1", "1.0", "spam"}
        result = "Spam 🚨" if is_spam else "Ham ✅"
        return jsonify({"prediction": result})
    except Exception:
        app.logger.exception("Message prediction failed")
        return jsonify({"error": "Prediction failed. Check the server logs."}), 500


if __name__ == "__main__":
    # Debug mode is disabled by default.
    app.run(host="127.0.0.1", port=5000, debug=False)
