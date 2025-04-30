import requests
import openai
import re
import os
from typing import Optional, Dict, Any

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

"""
conversation_history = {}

def get_conversation_history(user_id: str) -> list:
    """Get or initialize conversation history for a user"""
    if user_id not in conversation_history:
        conversation_history[user_id] = [
            {
                "role": "system",
                "content": f"""Você é o assistente oficial da FURIA Esports no CS2. Siga estas regras:
                
1. Use este conhecimento como base:
{FURIA_KNOWLEDGE}

2. Seja natural e amigável
3. Mantenha respostas curtas (1-3 frases)
4. Use emojis ocasionalmente 🎯
5. Se não souber, diga "Não tenho essa informação"
6. Personalize respostas quando possível
7. Foco apenas na FURIA
"""
            }
        ]
    return conversation_history[user_id]

def query_furia_assistant(
    prompt: str, 
    user_id: str, 
    user_data: Optional[Dict[str, Any]] = None
) -> str:
    client = openai.OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=OPENROUTER_API_KEY
    )
    
    try:
        messages = get_conversation_history(user_id)
        
        # Add personalization if user data exists
        if user_data:
            personalized_prompt = (
                f"[Usuário: {user_data.get('name', 'Fã da FURIA')}] "
                f"[Jogador Favorito: {user_data.get('favoritePlayer', 'Não especificado')}]\n"
                f"Pergunta: {prompt}"
            )
            messages.append({"role": "user", "content": personalized_prompt})
        else:
            messages.append({"role": "user", "content": prompt})
        
        response = client.chat.completions.create(
            model="anthropic/claude-3-haiku",
            messages=messages,
            max_tokens=250,
            temperature=0.5,
            presence_penalty=0.3,
            frequency_penalty=0.3
        )
        
        answer = response.choices[0].message.content
        
        # Update conversation history (keep last 6 messages)
        messages.append({"role": "assistant", "content": answer})
        conversation_history[user_id] = messages[-6:]
        
        return answer
        
    except Exception as e:
        print(f"API Error: {e}")
        return "Eita, tive um probleminha aqui! 😅 Mas me conta, qual seu mapa favorito pra ver a FURIA jogar?"

def analyze_interests(text: str) -> list[str]:
    """Analyze user input for FURIA-related interests"""
    text = text.lower()
    interests = []
    
    interest_map = {
        "players": ["art", "kscerato", "yuurih", "fallen", "molodoy", "yekindar", "chelo", "vini"],
        "matches": ["jogo", "partida", "match", "torneio", "campeonato", "major", "iem", "esl"],
        "history": ["história", "fundação", "2017", "origem", "começo"],
        "stats": ["estatística", "número", "dado", "rank", "ranking"],
        "merch": ["camisa", "produto", "loja", "comprar", "merchandising"]
    }
    
    for category, keywords in interest_map.items():
        if any(re.search(rf'\b{re.escape(keyword)}\b', text) for keyword in keywords):
            interests.append(category)
    
    return interests