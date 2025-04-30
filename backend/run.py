import subprocess
import os
import threading
import time
import webbrowser
import requests
import json

from pathlib import Path

def get_project_root():
    return Path(__file__).parent.parent  # Goes up two levels from backend/run.py

def run_backend():
    backend_dir = get_project_root() / "backend"
    os.chdir(str(backend_dir))
    print(f"Starting backend in: {os.getcwd()}")
    subprocess.run(["uvicorn", "app:app", "--reload"])

def run_frontend():
    frontend_dir = get_project_root() / "frontend"
    os.chdir(str(frontend_dir))
    print(f"Starting frontend in: {os.getcwd()}")
    subprocess.run(["npm", "start"], shell=True)  # shell=True for Windows

def check_backend_status():
    try:
        response = requests.get("http://localhost:8000/")
        if response.status_code == 200:
            print("Backend is running!")
        else:
            print("Backend is not responding.")
    except requests.exceptions.RequestException as e:
        print(f"Error checking backend status: {e}")

if __name__ == "__main__":
    # Verify paths
    root = get_project_root()
    print(f"Project root: {root}")
    print(f"Backend exists: {(root/'backend').exists()}")
    print(f"Frontend exists: {(root/'frontend').exists()}")
    
    # Start backend
    backend_thread = threading.Thread(target=run_backend)
    backend_thread.daemon = True
    backend_thread.start()

   
    time.sleep(5)  # Wait for backend to start
    check_backend_status()  # Check backend status 
    
    # Start frontend
    time.sleep(2)  # Wait for backend to initialize
    frontend_thread = threading.Thread(target=run_frontend)
    frontend_thread.daemon = True
    frontend_thread.start()
    
    # Open browser
    time.sleep(5)  # Wait for frontend to start
    # webbrowser.open("http://localhost:3000")
    
    # Keep main thread alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nServers shutting down...")