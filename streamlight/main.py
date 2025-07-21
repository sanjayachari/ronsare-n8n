import streamlit as st
import requests

st.title("Upload PDF to n8n Webhook")

uploaded_file = st.file_uploader("Choose a PDF file", type="pdf")

if uploaded_file is not None:
    st.success(f"File ready: {uploaded_file.name}")

    if st.button("Upload to n8n"):
        files = {
            'file': (uploaded_file.name, uploaded_file, 'application/pdf')
        }

        try:
            res = requests.post(
                'https://beetle-accepted-typically.ngrok-free.app/webhook-test/upload-pdf',
                files=files
            )

            if res.status_code == 200:
                st.success("File uploaded successfully to n8n!")
            else:
                st.error(f"Upload failed: {res.status_code} - {res.text}")

        except Exception as e:
            st.error(f"Error: {e}")