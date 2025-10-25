from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/process', methods=['POST'])
def process():
    data = request.get_json()
    input_text = data.get('text', '')
    action_type = data.get('type', '')

    # Za sad samo vraćamo testni odgovor
    return jsonify(result=f"Primljeno: '{input_text}' | Akcija: {action_type}")
