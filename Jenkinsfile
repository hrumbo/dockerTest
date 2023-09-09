pipeline {
    agent any

    stages {
        stage('Build and Run Container') {
            steps {
                script {
                   echo '*** BUILDING AND RUNNING CONTAINER ***'
                    // Build the Docker image for the Node.js application
                    sh 'docker build -t my-node-app:latest .'

                    // Run the Docker container for the Node.js application
                    sh 'docker run -d --name node_app -p 3000:3000 my-node-app:latest'

                    // Wait for the application to be ready (using wait-for-it.sh)
                    //sh './wait-for-it.sh localhost:3000 -- timeout 60s'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    echo '*** RUNNING TEST CASES ***'
                   
                    catchError(buildResult: 'SUCCESS', unstableResult: 'SUCCESS') {
                    // Your test steps here
                    // Even if this stage fails, the 'Deploy' stage will run
                     // Change the working directory to the folder containing package.json                    
                    dir('tests') {
                        sh 'apt-get install -y nodejs'
						// Run your tests (npm test or other commands)
						sh 'npm test'
					}
                }
                }
            }
        }

        stage('Delete Docker Container') {
             when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                script {
                    echo '*** DELETING CONTAINER ***'
                    
                    sh 'docker rm -f my-node-app'
                    
                }
            }
        }
    }
}