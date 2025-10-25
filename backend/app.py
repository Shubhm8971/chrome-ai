from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# 🔹 Učitaj .env varijable
load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

# 🔹 Inicijalizuj Flask
app = Flask(__name__)
CORS(app)

# 🔹 Testni endpoint
@app.route('/api/process', methods=['POST'])
def process():
    data = request.get_json()
    input_text = data.get('text', '')
    action_type = data.get('type', '')
    return jsonify(result=f"Primljeno: '{input_text}' | Akcija: {action_type}")

# 🔹 Summarization endpoint
@app.route("/api/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    text = data.get("text")

    if not text:
        return jsonify({"status": "error", "message": "Missing 'text' field"}), 400

    headers = {
        "Authorization": f"Bearer {HF_TOKEN}"
    }

    response = requests.post(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        headers=headers,
        json={"inputs": text}
    )

    if response.status_code != 200:
        return jsonify({"status": "error", "message": "Hugging Face API failed"}), 500

    result = response.json()
    summary = result[0]["summary_text"] if isinstance(result, list) else result.get("summary_text")

    return jsonify({"status": "success", "summary": summary})

if __name__ == "__main__":
    app.run(debug=True, port=5050)


print("HF_TOKEN:", HF_TOKEN)
