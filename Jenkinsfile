pipeline {
    agent any
    stages {
        stage('Checkout Main Repo') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/BitCamp-SemiProject3/PinterSemi.git']]
                ])
            }
        }
        stage('Checkout Submodule') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/BitCamp-SemiProject3/spring.git']],
                    credentialsId: 'git_token'
                ])
            }
        }
        stage('Update Submodules') {
            steps {
                sh 'git submodule update --init --recursive'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
    }
}
