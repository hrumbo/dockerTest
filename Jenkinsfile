pipeline {
    agent any

    stages {
        stage('Build and Run Container') {
            steps {
                script {
                    // Build the Docker image for the Node.js application
                    sh 'docker build -t my-node-app:latest .'

                    // Run the Docker container for the Node.js application
                    sh 'docker run -d -p 3000:3000 my-node-app:latest'

                    // Wait for the application to be ready (using wait-for-it.sh)
                    sh './wait-for-it.sh localhost:3000 -- timeout 60s'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    // Change the working directory to the folder containing package.json
					dir('tests') {
						// Run your tests (npm test or other commands)
						sh 'npm test'
					}
                }
            }
        }
    }
}