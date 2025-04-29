import requests
import openai
import re
import os
from typing import Optional

OPENROUTER_API_KEY = "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"

FURIA_KNOWLEDGE = """
Você é o assistente oficial da FURIA Esports no CS2. Informações atualizadas em abril/2025:

🔹 Elenco Atual:
  • arT (IGL/Rifler) - Capitão desde novembro de 2023
  • KSCERATO (Rifler) - Jogador mais consistente desde 2018
  • yuurih (Rifler) - Destaque em clutches importantes
  • molodoy (AWPer) - Novo jogador do Cazaquistão (contratado em abril/2025)
  • YEKINDAR (Stand-in) - Jogador letão cobrindo ausências

🔹 Ex-jogadores notáveis:
  • FalleN (atualmente rifler/IGL substituto)
  • chelo (transferido em 2024)
  • VINI (lendário entry-fragger)

🏆 Principais Conquistas:
  • Vice-campeões do ESL Pro League Season 17 (2023)
  • Semifinalistas do IEM Rio Major 2022 (melhor campanha brasileira)
  • Campeões da DreamHack Open Winter 2020
  • 2º lugar no ESL One: Cologne 2020 (Online)
  • 5x Campeões brasileiros consecutivos (2019-2023)

📊 Estatísticas Recentes:
  • Top 15 do ranking HLTV em 2024
  • 3º lugar no IEM Katowice 2024
  • Eliminados na fase de grupos do Major de Copenhagen 2025

📌 História:
  • Fundada em agosto de 2017 em São Paulo
  • Primeira organização brasileira a competir regularmente na Europa
  • Conhecida pelo estilo de jogo agressivo ("FURIA Style")
  • Base de fãs estimada em 2.5 milhões (maior do CS2 no Brasil)

💡 Curiosidades:
  • Recorde de 87 mapas consecutivos com pelo menos 10 rounds
  • arT detém o recorde de maior número de clutches em Majors (23)
  • KSCERATO já foi nomeado 3x para o Top 20 do mundo

Responda sempre em português brasileiro, exceto quando explicitamente solicitado em outro idioma. Mantenha um tom empolgado mas profissional, como um comentarista esportivo.
"""

def query_furia_assistant(prompt: str) -> str:
    client = openai.OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=OPENROUTER_API_KEY
    )
    
    try:
        response = client.chat.completions.create(
            model="deepseek/deepseek-v3-base:free",
            messages=[
                {"role": "system", "content": FURIA_KNOWLEDGE},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0.7  # Balances creativity vs accuracy
        )
        return response.choices[0].message.content
        
    except Exception as e:
        print(f"API Error: {e}")
        return "Não consegui responder agora. Sabia que a FURIA foi fundada em 2017?"
    
if __name__ == "__main__":
    test_questions = [
        ("Quem é o capitão da FURIA CS2?", "arT"),
        ("Qual é o papel do FalleN na equipe?", "rifler"),
        ("Liste os jogadores atuais", ["arT", "KSCERATO", "yuurih", "molodoy", "YEKINDAR"]),
        ("When was FURIA founded?", "2017")
    ]
    
    for question, expected in test_questions:
        print(f"\nQ: {question}")
        response = query_furia_assistant(question)
        print(f"A: {response}")
        if any(kw.lower() in response.lower() for kw in ([expected] if isinstance(expected, str) else expected)):
            print("✅ Passed")
        else:
            print(f"❌ Failed (expected: {expected})")


def analyze_interests(text: str) -> List[str]:
    """Analyze user input for FURIA-related interests"""
    text = text.lower()
    interests = []
    
    interest_map = {
        "players": ["art", "kscerato", "yuurih", "fallen", "molodoy"],
        "matches": ["jogo", "partida", "match", "torneio"],
        "history": ["história", "fundação", "2017"],
        "merch": ["camisa", "produto", "loja"]
    }
    
    for category, keywords in interest_map.items():
        if any(keyword in text for keyword in keywords):
            interests.append(category)
    
    return interests