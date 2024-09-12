pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub_login')
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
                    bat "docker build -t ${DOCKERHUB_REPO}:frontend ."
                }
                dir ('./springboot-backend') {
                    bat "docker build -t ${DOCKERHUB_REPO}:backend ."
                }
            }
        }

        stage ('Push images to Docker Hub') {
            steps {
                bat """
                    docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}
                    docker push ${DOCKERHUB_REPO}:frontend
                    docker push ${DOCKERHUB_REPO}:backend
                """
            }
        }

        // stage ('Deploy to K8s') {
        //     scripts {
        //         kubernetesDeploy (configs: 'deploymentservice.yaml', kubeconfigId: 'k8s_kubeconfig')
        //     }
        // }
    }
}