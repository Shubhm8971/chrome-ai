from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # omogućava komunikaciju s frontendom na localhost:5173

@app.route('/api/hello')
def hello():
    return jsonify(message="Zdravo iz Flask backenda!")

if __name__ == '__main__':
    app.run(debug=True)
