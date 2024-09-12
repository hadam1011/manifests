pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub_login')
        GITHUB_CREDENTIALS = credentials('github_login')
        GITHUB_TOKEN = credentials('github_token')
        DOCKERHUB_REPO = 'mad1011/query-exporter-app'
    }

    stages {
        stage ("Clone project") {
          steps {
            git branch: 'main', url: 'https://github.com/hadam1011/Query-exporter-app.git'
          }
        }


        stage ('Build images') {
            steps {
                dir ('./react-frontend') {
                    bat "docker build -t ${DOCKERHUB_REPO}:frontend-${BUILD_NUMBER} ."
                }
                dir ('./springboot-backend') {
                    bat "docker build -t ${DOCKERHUB_REPO}:backend-${BUILD_NUMBER} ."
                }
            }
        }

        stage ('Push images to Docker Hub') {
            steps {
                bat """
                    docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}
                    docker push ${DOCKERHUB_REPO}:frontend-${BUILD_NUMBER}
                    docker push ${DOCKERHUB_REPO}:backend-${BUILD_NUMBER}
                """
            }
        }

        stage ('Update deployment files') {
            steps {
                bat """
                    git config user.email "hadam8910@gmail.com"
                    git config user.name "hadam1011"
                    (Get-Content manifests/backend-deployment.yaml) -replace 'imageVersion', ${BUILD_NUMBER} | Out-File -encoding ASCII manifests/backend-deployment.yaml
                    (Get-Content manifests/frontend-deployment.yaml) -replace 'imageVersion', ${BUILD_NUMBER} | Out-File -encoding ASCII manifests/frontend-deployment.yaml
                    git add .
                    git commit -m "Update deployment image to version ${BUILD_NUMBER}"
                    git push https://${GITHUB_TOKEN}@github.com/hadam1011/Query-exporter-app HEAD:main
                """
            }
        }
    }
}