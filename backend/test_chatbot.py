from chatbot import query_furia_assistant

def test_furia_assistant():
    test_cases = [
        ("Quem é o capitão da FURIA CS2?", "arT"),
        ("Qual é o papel do FalleN na equipe?", "AWPer"),
        ("Liste os jogadores atuais", ["arT", "KSCERATO", "yuurih", "chelo", "FalleN"]),
        ("When was FURIA founded?", "2017")  # English test
    ]
    
    passed = 0
    for question, keyword in test_cases:
        response = query_furia_assistant(question)
        print(f"\nQ: {question}")
        print(f"A: {response}")
        
        if any(kw.lower() in response.lower() for kw in ([keyword] if isinstance(keyword, str) else keyword)):
            print("✅ Passed")
            passed += 1
        else:
            print(f"❌ Failed (expected: {keyword})")
    
    print(f"\nTest Results: {passed}/{len(test_cases)} passed")

if __name__ == "__main__":
    test_furia_assistant()