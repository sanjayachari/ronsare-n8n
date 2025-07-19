# chatbot_app.py
import streamlit as st

st.set_page_config(page_title="Ronsare Chatbot", layout="centered")

st.title("🤖 Ronsare Chatbot")
st.write("Welcome to Ronsare's assistant. Ask anything about our services!")

# Store chat history
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

# Show sample questions only if chat is empty
if not st.session_state.chat_history:
    with st.expander("💡 Try asking one of these"):
        st.markdown("""
        - What is Ronsare?
        - What services do you offer?
        - How do I contact Ronsare?
        - Hello
        - Bye
        """)

# Dummy bot logic
def get_bot_response(message):
    message = message.lower()
    if "hello" in message:
        return "Hello! 👋 Welcome to Ronsare. How can I assist you today?"
    elif "what is ronsare" in message:
        return "Ronsare is a modern automation and integration platform built to help businesses streamline workflows."
    elif "services" in message:
        return "We offer automation, no-code workflows, API integrations, and AI-based task scheduling."
    elif "contact" in message:
        return "You can reach us at support@ronsare.com or visit our website."
    elif "bye" in message:
        return "Goodbye! Have a productive day from Ronsare 🚀"
    else:
        return "I'm Ronsare's demo assistant. Try asking about our services, pricing, or how we work."

# Chat input
user_input = st.chat_input("Type your question here...")

# Process input
if user_input:
    st.session_state.chat_history.append(("user", user_input))
    response = get_bot_response(user_input)
    st.session_state.chat_history.append(("bot", response))

# Render chat
for role, msg in st.session_state.chat_history:
    if role == "user":
        st.chat_message("user").markdown(msg)
    else:
        st.chat_message("assistant").markdown(msg)
