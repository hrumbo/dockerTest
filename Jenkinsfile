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
                    def containerIp = sh(script: "docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' node_app", returnStdout: true).trim()

                    // Log the container IP address
                    echo "Container IP address: ${containerIp}"

                    // Log Env Variable
                    echo "CONTAINER_IP: ${env.CONTAINER_IP}"

                    // Set the container's IP as an environment variable
                    withEnv(["CONTAINER_IP=${containerIp}"]) {
                        //Setting Environment Variable
                    }

                    //sleep time: 5, unit: 'SECONDS'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    echo '*** RUNNING TEST CASES ***'
                   
                    // Change the working directory to the folder containing package.json           
                    dir('tests') {
                        sh 'npm install'
                        
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Delete Docker Container') {
            steps {
                script {
                    echo '*** DELETING CONTAINER ***'
                    
                    sh 'docker rm -f node_app'
                }
            }
        }
    }
}
