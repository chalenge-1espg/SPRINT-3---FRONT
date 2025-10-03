import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

# Configure a chave da API
genai.configure(api_key="AIzaSyCMcoxStrIOvx1beAWCRzGF84hRbc-Gmjw")

# Escolhe o modelo
model = genai.GenerativeModel("gemini-2.5-flash")
# Lista para armazenar o histórico da conversa
historico = []

# Dicionário para salvar informações rápidas (exemplo local, sem chamar API)
faq = {
    "quando comecou": "O futebol feminino no Brasil começou oficialmente em 1983, após o fim da proibição.",
    "primeira copa": "A primeira Copa do Mundo de Futebol Feminino foi realizada em 1991, na China.",
    "seleção brasileira": "A seleção brasileira feminina é uma das mais fortes do mundo, revelando craques como Marta."
}

# Função para chamar o modelo Gemini
def consultar_gemini(pergunta: str) -> str:
    response = model.generate_content(
        f"Você é um especialista em futebol feminino. Responda de forma sucinta clara e objetiva: {pergunta}"
    )
    return response.text

# -----------------------------
# 🚀 ADIÇÃO: Servidor Flask
# -----------------------------
app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    pergunta = data.get("message", "").strip().lower()

    if not pergunta:
        return jsonify({"response": "⚠️ Nenhuma mensagem recebida."})

    # Se estiver no FAQ, responde direto
    if pergunta in faq:
        resposta = faq[pergunta]
    else:
        resposta = consultar_gemini(pergunta)

    # Salva no histórico
    historico.append({"usuario": pergunta, "bot": resposta})

    return jsonify({"response": resposta})

if __name__ == "__main__":
    # Inicia o Flask
    app.run(port=5000, debug=True)
    