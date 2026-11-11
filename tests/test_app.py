import unittest

from app import app


class SpamClassifierSmokeTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_health_endpoint(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["status"], "ok")
        self.assertTrue(response.get_json()["model_loaded"])

    def test_home_page_loads(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Email Spam Classifier", response.data)

    def test_empty_message_is_rejected(self):
        response = self.client.post("/predict", data={"message": "   "})
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.get_json())

    def test_non_text_json_message_is_rejected(self):
        response = self.client.post("/predict", json={"message": 123})
        self.assertEqual(response.status_code, 400)

    def test_message_over_limit_is_rejected(self):
        response = self.client.post("/predict", json={"message": "a" * 2001})
        self.assertEqual(response.status_code, 400)

    def test_form_prediction_returns_expected_response_shape(self):
        response = self.client.post(
            "/predict",
            data={"message": "Hi, are we meeting at the library tomorrow?"}
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn(response.get_json()["prediction"], {"Spam 🚨", "Ham ✅"})

    def test_json_prediction_returns_expected_response_shape(self):
        response = self.client.post(
            "/predict",
            json={"message": "Congratulations! You have won a free prize."}
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn(response.get_json()["prediction"], {"Spam 🚨", "Ham ✅"})


if __name__ == "__main__":
    unittest.main()
