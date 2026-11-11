# MailShield — Email & SMS Spam Classifier

A web-based message classification demo powered by a pre-trained TF-IDF vectorizer and stacking ensemble model. The interface accepts message text and returns a Spam/Ham prediction. The deployed service also exposes a lightweight health endpoint.

## Live demo

https://email-spam-classifier-f4ev.onrender.com

## Features

- Responsive dark interface with a focused message-analysis workflow
- Sample messages for quick testing
- Character counter and clear action
- Flask prediction API with input validation
- Optional model confidence when the estimator exposes `predict_proba`
- Health check at `/health`

## Technology

Python · Flask · scikit-learn · TF-IDF · Stacking Ensemble · Joblib · HTML · CSS · JavaScript · Render

## How it works

1. A user pastes an email or SMS message.
2. The saved TF-IDF vectorizer transforms the text into numerical features.
3. The saved stacking ensemble predicts the class.
4. The Flask API returns the Spam/Ham label and, when supported, the predicted-class probability.

The model artifacts (`stacking_model.pkl` and `tfidf_vectorizer.pkl`) are included in the repository. This repository uses the existing trained artifacts; the interface and API hardening have been updated for this deployment.

## Run locally

```bash
git clone https://github.com/miank55/email_spam_classifier.git
cd email_spam_classifier
python -m venv .venv
```

Windows PowerShell:
```powershell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Open http://127.0.0.1:5000.

## API

- `GET /` — web interface
- `GET /health` — service health response
- `POST /predict` — form field `message`; returns `prediction`, `label`, and `confidence` when supported by the model

## Important notes

- This is an educational demonstration, not a production email security gateway.
- The model was trained before this interface refresh; UI changes do not imply that the model was retrained.
- A model score is not a guarantee that a message is safe. Verify links, senders, and requests independently.
- Training data and model provenance should be checked against the original project documentation before making claims about dataset size or evaluation metrics.

## Attribution

The original project and trained model artifacts were created by **Luvkush Prasad**. This repository is a permitted personal deployment/adaptation. The current maintainer, **Mayank Kumar Singh**, updated the interface, Flask request handling, and project documentation for this deployment. Original authorship of the underlying model and source project remains with the original developer.

Original developer:
- GitHub: https://github.com/LavkushPrasad
- LinkedIn: https://www.linkedin.com/in/lavkushprasad27/

Deployment repository:
- https://github.com/miank55/email_spam_classifier

---
MailShield is a presentation name for this adapted deployment; it does not imply ownership of the original model or training work.
