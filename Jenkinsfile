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

                    // Retrieve the container's IP address
                    def containerIp = sh(script: "docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_id>", returnStdout: true).trim()

                    // Set the container's IP as an environment variable
                    withEnv(["CONTAINER_IP=${containerIp}"]) {
                        // Inside this block, CONTAINER_IP is set as an environment variable
                        // You can access it in this stage or job
                    }

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
