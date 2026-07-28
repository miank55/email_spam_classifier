from flask import Flask, render_template, request, jsonify
import joblib

app = Flask(__name__)

# Load Model and Vectorizer
model = joblib.load("stacking_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():

    message = request.form['message']

    message_tfidf = vectorizer.transform([message])

    prediction = model.predict(message_tfidf)

    result = "Spam 🚨" if prediction[0] == 1 else "Ham ✅"

    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True)