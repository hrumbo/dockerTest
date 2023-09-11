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
                    // sh './wait-for-it.sh localhost:3000 -- timeout 60s'

                    sleep time: 5, unit: 'SECONDS'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    echo '*** RUNNING TEST CASES ***'
                   
                    // Change the working directory to the folder containing package.json   
                    //sh 'apt-get install -y nodejs' 
                                   
                    dir('tests') {
                        sh 'npm install'
                        try {
                            // Run your tests (npm test or other commands)
                            sh 'npm test'
                        } catch (Exception e) {
                            // Set the stage result to FAILURE and continue to the next stage
                            currentBuild.result = 'FAILURE'
                            error("Tests failed: ${e.message}")
                        }
                    }
                }
            }
        }

        stage('Delete Docker Container') {
 //            when {
 //               expression {
 //                   def currentResult = currentBuild.result
 //                   return currentResult == 'SUCCESS' || currentResult == 'FAILURE'
//              }
 //           }
            steps {
                script {
                    echo '*** DELETING CONTAINER ***'
                    
                    sh 'docker rm -f node_app'
                }
            }
        }
    }
}
