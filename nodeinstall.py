import subprocess
import sys

def check_installation():
    try:
        # Check if Node.js is installed
        subprocess.check_call(['node', '--version'])
        print("Node.js is already installed.")
    except subprocess.CalledProcessError:
        print("Node.js is not installed.")
        install_nodejs()

    try:
        # Check if npm is installed
        subprocess.check_call(['npm', '--version'])
        print("npm is already installed.")
    except subprocess.CalledProcessError:
        print("npm is not installed.")
        install_npm()

def install_nodejs():
    print("Installing Node.js...")
    # You may need to adjust the installation command based on your operating system
    subprocess.call(['sudo', 'apt', 'install', 'nodejs'])

def install_npm():
    print("Installing npm...")
    # You may need to adjust the installation command based on your operating system
    subprocess.call(['sudo', 'apt', 'install', 'npm'])

if __name__ == "__main__":
    check_installation()
