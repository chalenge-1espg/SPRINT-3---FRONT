import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

# ========================
# CONFIGURAÇÕES INICIAIS
# ========================
genai.configure(api_key="AIzaSyCMcoxStrIOvx1beAWCRzGF84hRbc-Gmjw")
app = Flask(__name__)
CORS(app)

# Caminho para arquivo JSON (persistência)
ARQUIVO_DADOS = "dados.json"

# ========================
# FUNÇÕES DE PERSISTÊNCIA
# ========================
def carregar_dados():
    """Carrega dados do arquivo JSON."""
    try:
        if not os.path.exists(ARQUIVO_DADOS):
            with open(ARQUIVO_DADOS, "w") as f:
                json.dump({"faq": {}, "historico": []}, f)
        with open(ARQUIVO_DADOS, "r") as f:
            return json.load(f)
    except Exception as e:
        print("Erro ao carregar dados:", e)
        return {"faq": {}, "historico": []}


def salvar_dados(dados):
    """Salva dados no arquivo JSON."""
    try:
        with open(ARQUIVO_DADOS, "w") as f:
            json.dump(dados, f, indent=4)
    except Exception as e:
        print("Erro ao salvar dados:", e)

# ========================
# CRUD (Create, Read, Update, Delete)
# ========================

def criar_faq(pergunta, resposta):
    dados = carregar_dados()
    dados["faq"][pergunta] = resposta
    salvar_dados(dados)
    return "✅ Pergunta adicionada com sucesso!"

def ler_faq(pergunta):
    dados = carregar_dados()
    return dados["faq"].get(pergunta, "❌ Pergunta não encontrada no FAQ.")

def atualizar_faq(pergunta, nova_resposta):
    dados = carregar_dados()
    if pergunta in dados["faq"]:
        dados["faq"][pergunta] = nova_resposta
        salvar_dados(dados)
        return "✅ Resposta atualizada com sucesso!"
    return "❌ Pergunta não encontrada."

def deletar_faq(pergunta):
    dados = carregar_dados()
    if pergunta in dados["faq"]:
        del dados["faq"][pergunta]
        salvar_dados(dados)
        return "✅ Pergunta removida!"
    return "❌ Pergunta não encontrada."

# ========================
# MODELO GEMINI
# ========================
def consultar_gemini(pergunta: str) -> str:
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        resposta = model.generate_content(
            f"Você é um especialista em futebol feminino. Responda de forma clara e objetiva: {pergunta}"
        )
        return resposta.text.strip()
    except Exception as e:
        return f"⚠️ Erro ao consultar o modelo: {e}"

# ========================
# ROTAS FLASK
# ========================

@app.route("/chat", methods=["POST"])
def chat():
    """Rota principal do chat."""
    data = request.json
    pergunta = data.get("message", "").strip().lower()

    if not pergunta:
        return jsonify({"response": "⚠️ Nenhuma mensagem recebida."})

    dados = carregar_dados()

    if pergunta in dados["faq"]:
        resposta = dados["faq"][pergunta]
    else:
        resposta = consultar_gemini(pergunta)
        dados["historico"].append({"usuario": pergunta, "bot": resposta})
        salvar_dados(dados)

    return jsonify({"response": resposta})

@app.route("/faq", methods=["GET"])
def listar_faq():
    """Consulta todo o FAQ (READ)."""
    return jsonify(carregar_dados()["faq"])

@app.route("/faq", methods=["POST"])
def adicionar_faq():
    """Adiciona novo item ao FAQ (CREATE)."""
    data = request.json
    return jsonify({"msg": criar_faq(data["pergunta"], data["resposta"])})

@app.route("/faq", methods=["PUT"])
def editar_faq():
    """Atualiza item existente no FAQ (UPDATE)."""
    data = request.json
    return jsonify({"msg": atualizar_faq(data["pergunta"], data["nova_resposta"])})

@app.route("/faq", methods=["DELETE"])
def remover_faq():
    """Remove item do FAQ (DELETE)."""
    data = request.json
    return jsonify({"msg": deletar_faq(data["pergunta"])})

@app.route("/interface", methods=["GET"])
def interface():
    """Interface simples via HTML (simulação de UI intuitiva)."""
    return """
    <h2>🤖 Chat Futebol Feminino</h2>
    <form action="/chat" method="post">
        <input type="text" name="message" placeholder="Digite sua pergunta..." />
        <button type="submit">Enviar</button>
    </form>
    """

# ========================
# MAIN
# ========================
if __name__ == "__main__":
    app.run(port=5000, debug=True)
