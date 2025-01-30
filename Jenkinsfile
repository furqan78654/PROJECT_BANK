pipeline {
    agent any

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs() // Ensure the workspace is clean before cloning
            }
        }

        stage('Clone Repository') {
            steps {
                script {
                    git credentialsId: 'github', url: 'https://github.com/furqan78654/PROJECT_BANK.git', branch: 'features'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    dir('LGU') {
                        docker.build('syedfurqanjaved/frontend:latest')
                    }
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    dir('server') {
                        docker.build('syedfurqanjaved/backend:latest')
                    }
                }
            }
        }

        stage('Push Docker Images to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh 'docker push syedfurqanjaved/frontend:latest'
                        sh 'docker push syedfurqanjaved/backend:latest'
                    }
                }
            }
        }

        stage('Update Kubernetes Manifests') {
            steps {
                script {
                    dir('manifest') {
                        sh """
                        sed -i 's|image: .*frontend.*|image: syedfurqanjaved/frontend:latest|' frontend-deployment.yaml
                        sed -i 's|image: .*backend.*|image: syedfurqanjaved/backend:latest|' backend-deployment.yaml
                        sed -i 's|image: .*mongo.*|image: mongo:latest|' mongo-deployment.yaml
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline was successful!"
        }
        failure {
            echo "Something went wrong during the deployment."
        }
    }
}