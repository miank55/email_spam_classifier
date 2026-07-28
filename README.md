# Project Title
# Email Spam Classifier

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Render-success)](https://email-spam-classifier-f4ev.onrender.com)
[![NumPy](https://img.shields.io/badge/NumPy-Data_Processing-013243?logo=numpy&logoColor=white)](https://numpy.org/)
[![Pandas](https://img.shields.io/badge/Pandas-Data_Analysis-150458?logo=pandas&logoColor=peach)](https://pandas.pydata.org/)
[![Python](https://img.shields.io/badge/Python-3.10.8-blue)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-Web_App-yellow)](https://flask.palletsprojects.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-ML-orange)](https://scikit-learn.org/)
[![Status](https://img.shields.io/badge/Status-Active-success)]()
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github&logoColor=cyan)](https://github.com/LavkushPrasad)
<!-- [![License](https://img.shields.io/badge/License-MIT-green)]() -->


Machine Learning-based Email Spam Classifier using TF-IDF and Stacking Ensemble.

# Brief Summary

A machine learning-based web application that classifies emails as Spam or Ham (Legitimate) using TF-IDF and a Stacking Ensemble model. The application is deployed on Render and can be accessed here: https://email-spam-classifier-f4ev.onrender.com

# Overview

This project is a Machine Learning-based Email Spam Detection System that classifies emails as Spam or Ham (Legitimate) using a Stacking Ensemble Learning approach.

The model combines the strengths of multiple machine learning algorithms to improve classification performance and reduce false predictions.

# Problem Statement

Email spam and phishing attacks continue to be major cybersecurity threats. Manually filtering unwanted emails is inefficient and error-prone. This project aims to automate spam detection using machine learning techniques.

# Dataset

* SMS Spam Collection Dataset (used for model training and experimentation)
* Contains labeled spam and ham messages
* Preprocessed and transformed using TF-IDF Vectorization

# Tools and Technologies

* Python
* Flask
* Scikit-learn
* Pandas
* NumPy
* Joblib
* HTML
* CSS
* JavaScript
* Git & GitHub

# Methods

1. Data Cleaning and Preprocessing
2. Text Vectorization using TF-IDF
3. Model Training

   * Logistic Regression
   * Multinomial Naive Bayes
   * Support Vector Machine (SVM)
4. Stacking Ensemble Learning
5. Model Evaluation
6. Flask Deployment

# Key Insights

* TF-IDF effectively converts text into numerical features.
* Stacking Ensemble combines multiple models to improve robustness.
* Ensemble methods achieved better overall performance compared to individual models.

# Dashboard / Model / Output

### Input

Paste email content into the application.

### Processing

TF-IDF Vectorization → Stacking Ensemble Prediction

### Output

* Spam Email 🚨
* Ham (Legitimate) Email ✅

# How to Run this Project?

### Clone Repository

```bash
git clone https://github.com/LavkushPrasad/email_spam_classifier.git
cd email_class
```

### Create Virtual Environment

```bash
python -m venv myenv
myenv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Application

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

# Results & Conclusion

The model successfully classifies spam and legitimate messages using machine learning techniques. The Stacking Ensemble model demonstrated strong classification performance and provides a practical approach for spam detection applications.

# Future Work

* Train on large-scale email datasets such as Enron and SpamAssassin
* Add phishing detection features
* Integrate email header analysis
* Implement deep learning models (LSTM/BERT)
* Support multilingual spam detection

# 👨‍💻 Author & Contact

**Lavkush Prasad**

GitHub: https://github.com/LavkushPrasad

LinkedIn: https://www.linkedin.com/in/lavkushprasad27/
