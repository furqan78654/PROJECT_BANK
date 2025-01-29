FROM jenkins/jenkins:lts

USER root

# Install Docker and dependencies
RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" && \
    apt-get update && \
    apt-get install -y docker.io  # Use docker.io instead of docker-ce-cli

# Install AWS CLI
RUN apt-get install -y unzip && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install

# Copy deployment YAML files into the container
# Assuming your deployment.yaml files are in the same directory as the Dockerfile
COPY frontend-deployment.yaml /home/jenkins/frontend-deployment.yaml
COPY backend-deployment.yaml /home/jenkins/backend-deployment.yaml 
COPY mongo-deployment.yaml /home/jenkins/mongo-deployment.yaml

# Copy the .env file into the container
COPY /server/.env /home/jenkins/.env

# Set Jenkins user password
RUN echo "jenkins:1100aa@@" | chpasswd

# Set permissions for Jenkins user
RUN chown -R jenkins:jenkins /home/jenkins/*.yaml /home/jenkins/.env

USER jenkins
