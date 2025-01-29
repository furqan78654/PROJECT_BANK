pipeline {
    agent any
    
    environment {
        // Define Docker Hub and GitHub credentials
        DOCKER_HUB_CREDENTIALS = 'dockerhub' // Docker credentials ID
        GITHUB_CREDENTIALS = 'github' // GitHub credentials ID
        REPO_URL = 'https://github.com/furqan78654/PROJECT_BANK.git' // Your GitHub repo URL
        DOCKER_USER = credentials('dockerhub') // Docker credentials
        GITHUB_USER = credentials('github') // GitHub credentials
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    // Clone the PROJECT_BANK repo from GitHub
                    git credentialsId: 'github', url: "${REPO_URL}"
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    dir('LGU') {
                        // Build the frontend Docker image with tag
                        docker.build('syedfurqanjaved/frontend:latest')
                    }
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    dir('server') {
                        // Build the backend Docker image with tag
                        docker.build('syedfurqanjaved/backend:latest')
                    }
                }
            }
        }

        stage('Push Docker Images to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    }

                    // Push frontend and backend images to Docker Hub
                    sh 'syedfurqanjaved/frontend:latest'
                    sh 'syedfurqanjaved/backend:latest'
                }
            }
        }

        stage('Update Kubernetes Manifests') {
            steps {
                script {
                    // Go to the 'manifest' folder where deployment YAML files are stored
                    dir('manifest') {
                        // Update frontend and backend images in the Kubernetes manifests
                        sh """
                        sed -i 's|image: .*frontend.*|image: syedfurqanjaved/frontend:latest|' frontend-deployment.yaml
                        sed -i 's|image: .*backend.*|image: syedfurqanjaved/backend:latest|' backend-deployment.yaml
                        sed -i 's|image: .*mongo.*|image: mongo:latest|' mongo-deployment.yaml
                        """
                    }
                }
            }
        }

        stage('Deploy to Kubernetes via ArgoCD') {
            steps {
                script {
                    // Apply the updated ArgoCD manifest
                    sh 'kubectl apply -f manifest/argocd-deployment.yaml'
                }
            }
        }
    }

    post {
        success {
            echo "Deployment was successful!"
        }
        failure {
            echo "Something went wrong during the deployment."
        }
    }
}
