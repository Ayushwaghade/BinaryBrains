from flask import Flask, request, jsonify, render_template
import google.generativeai as genai

# Initialize Flask app
app = Flask(__name__)

# Configure Gemini API (replace with your API key)
genai.configure(api_key="AIzaSyAfD5QOrOEmCOtyjtsCr1XWtFAFyZ90Bng")

# Function to generate Socratic-style responses
def generate_socratic_response(user_question):
    model = genai.GenerativeModel("gemini-1.5-pro")  # Load the Gemini model
    response = model.generate_content(user_question)  # Generate response
    return response.text if response else "Can you think about it in a different way?"


# API endpoint for chatbot interaction
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_question = data.get("question", "")
    bot_response = generate_socratic_response(user_question)
    return jsonify({"response": bot_response})

# Serve the frontend
@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True,port=5008)
