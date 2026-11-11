# Email Spam Classifier

A Flask web application that classifies a text message as **Spam** or **Ham (legitimate)** using a TF-IDF vectorizer and a saved stacking-ensemble machine-learning model.

> This repository includes pre-trained artifacts (`stacking_model.pkl` and `tfidf_vectorizer.pkl`). The application loads these artifacts at startup; the original training dataset and training script are not currently included in this repository.

## Project structure

```text
email_spam_classifier/
├── app.py
├── requirements.txt
├── stacking_model.pkl
├── tfidf_vectorizer.pkl
├── templates/
│   └── index.html
└── static/
    ├── script.js
    └── style.css
```

## Technology stack

- Python
- Flask
- scikit-learn
- TF-IDF text vectorization
- Joblib (loading the saved model artifacts)
- HTML, CSS and JavaScript

## How the application works

1. The user enters a message in the web interface.
2. The browser sends the message to the Flask `/predict` endpoint.
3. The saved TF-IDF vectorizer converts the message into numerical features.
4. The saved stacking model predicts the class.
5. The application returns either `Spam 🚨` or `Ham ✅`.

The README describes the model as a stacking ensemble with Logistic Regression, Multinomial Naive Bayes and Support Vector Machine (SVM) base estimators. Confirm the exact estimators and training configuration from the original training code or model metadata before presenting those implementation details as verified facts.

## Run locally on Windows

Python 3.10 is a suitable starting point for the dependency versions currently listed in `requirements.txt`.

1. Clone this repository:

   ```powershell
   git clone https://github.com/miank55/email_spam_classifier.git
   cd email_spam_classifier
   ```

2. Create and activate a virtual environment:

   ```powershell
   py -3.10 -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

   If PowerShell blocks activation, use Command Prompt and run:

   ```bat
   .venv\Scripts\activate.bat
   ```

3. Install dependencies:

   ```powershell
   python -m pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. Start the application:

   ```powershell
   python app.py
   ```

5. Open [http://127.0.0.1:5000](http://127.0.0.1:5000).

The app also provides a health endpoint at [http://127.0.0.1:5000/health](http://127.0.0.1:5000/health).

## Prediction endpoint

The `POST /predict` endpoint accepts either form data or JSON.

Form data field:

```text
message=Your message text
```

JSON example:

```json
{
  "message": "Congratulations! You have won a prize."
}
```

A successful response has this shape:

```json
{
  "prediction": "Spam 🚨"
}
```

The exact prediction depends on the saved model. Do not assume a test message's result without running it through the application.

## Important notes and limitations

- The repository currently contains the saved model and vectorizer, but not the dataset or training script. Reproducing model training therefore requires recovering those original files.
- Joblib/pickle model files should only be loaded from a trusted source. Do not replace them with untrusted artifacts.
- The project should be tested in a clean Python environment before claiming that it runs successfully.
- Accuracy, precision, recall, F1-score and confusion-matrix values should only be reported if they can be reproduced from the original evaluation or a documented test run.

## Repository

Source code: https://github.com/miank55/email_spam_classifier
