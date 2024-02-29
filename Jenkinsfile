pipeline {
    agent {
        label ' jenkins-agent1'
    }

    stages {
         stage("Checkout from SCM"){
            steps{
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/shorya1104/experessjs.git'
            }

         }
         stage('Install node') {
            steps {
                // Run npm install to install dependencies
                sh 'python3 nodeinstall.py'
            }
        }
        
        stage('Build') {
            steps {
                // Run npm install to install dependencies
                sh 'npm install'
            }
        }

        stage('Run Application') {
            steps {
                // Run Node.js application
                sh 'node your-app.js'
            }
        }
    }
}
