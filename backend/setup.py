#!/usr/bin/env python3
import os
import sys
import subprocess
import traceback
from pathlib import Path

def log_error(message):
    """Print error messages in red for better visibility"""
    RED = '\033[91m'
    RESET = '\033[0m'
    print(f"{RED}ERROR: {message}{RESET}", file=sys.stderr)

def log_warning(message):
    """Print warning messages in yellow"""
    YELLOW = '\033[93m'
    RESET = '\033[0m'
    print(f"{YELLOW}WARNING: {message}{RESET}")

def run_command(cmd, description, check=True):
    """Run a command with error handling"""
    print(f"\n{description}...")
    print(f"Running: {' '.join(cmd)}")
    try:
        result = subprocess.run(
            cmd,
            check=check,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        if result.stdout:
            print(result.stdout)
        if result.stderr:
            log_warning(result.stderr)
        return True
    except subprocess.CalledProcessError as e:
        log_error(f"Command failed: {' '.join(cmd)}")
        if e.stdout:
            print("Output:", e.stdout)
        if e.stderr:
            log_error("Error output:")
            print(e.stderr)
        return False
    except Exception as e:
        log_error(f"Unexpected error: {str(e)}")
        traceback.print_exc()
        return False

def upgrade_pip(venv_dir):
    """Special handling for pip upgrade on Windows"""
    if os.name == "nt":  # Windows
        python_exe = str(venv_dir / "Scripts" / "python.exe")
        return run_command(
            [python_exe, "-m", "pip", "install", "--upgrade", "pip"],
            "Upgrading pip using python -m pip",
            check=False  # Don't fail if this doesn't work
        )
    else:
        pip = str(venv_dir / "bin" / "pip")
        return run_command(
            [pip, "install", "--upgrade", "pip"],
            "Upgrading pip",
            check=False
        )

def main():
    print("\n=== FURIA Chatbot Backend Setup ===")
    
    # Check Python version
    if sys.version_info < (3, 7):
        log_error("Python 3.7 or higher is required.")
        sys.exit(1)
    
    backend_dir = Path(__file__).parent
    venv_dir = backend_dir / "venv"
    requirements = backend_dir / "requirements.txt"
    
    # Verify requirements file exists
    if not requirements.exists():
        log_error(f"Requirements file not found: {requirements}")
        sys.exit(1)
    
    # Create virtual environment
    if not run_command(
        [sys.executable, "-m", "venv", str(venv_dir)],
        "Creating virtual environment"
    ):
        sys.exit(1)
    
    # Determine correct paths based on OS
    if os.name == "nt":  # Windows
        pip = venv_dir / "Scripts" / "pip.exe"
        python_exe = venv_dir / "Scripts" / "python.exe"
        activate_cmd = f"{venv_dir}\\Scripts\\activate"
    else:  # Unix/macOS
        pip = venv_dir / "bin" / "pip"
        python_exe = venv_dir / "bin" / "python"
        activate_cmd = f"source {venv_dir}/bin/activate"
    
    # Verify pip exists in the virtual environment
    if not pip.exists():
        log_error(f"pip not found at expected location: {pip}")
        sys.exit(1)
    
    # Upgrade pip (with special Windows handling)
    upgrade_pip(venv_dir)
    
    # Install requirements
    if not run_command(
        [str(python_exe), "-m", "pip", "install", "-r", str(requirements)],
        "Installing dependencies"
    ):
        sys.exit(1)
    
    # Success message
    print("\n=== Setup completed successfully! ===")
    print("\nTo use the backend:")
    print(f"1. Activate virtual environment: {activate_cmd}")
    print("2. Start the server: uvicorn app:app --reload")
    
    # Check for common issues
    print("\nTroubleshooting tips:")
    print("- If you get 'uvicorn not found', make sure to activate the virtual environment first")
    print("- On Windows, you might need to run this in Command Prompt (not Git Bash)")
    print("- If ports are in use, try changing the port: uvicorn app:app --reload --port 8001")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nSetup cancelled by user.")
        sys.exit(1)