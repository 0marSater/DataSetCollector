pipeline {
  agent any
   environment{
    FRONTEND_IMAGE_TAG = "react-v1.1.1"
    BACKEND_IMAGE_TAG = "flask-v1.1.1"
    DOCKER_REPO = "omarsater/private-repo"

   }
    stages {
        stage('Clone repository') {
            steps {
                script{
                    checkout scm
                }
            }
        }
        // stage("Build both image") {
        //     steps{
        //         script{
        //             // loading external build.groovy script
        //             def file= load "build.groovy"
        //             file.buildFrontImage()
        //             file.buildBackImage()
        //         }
        //     }
        //  }

        stage("Push to Dockerhub") {
            steps{
                script{
                    // loading external push.groovy script
                    def file = load "push.groovy"
                    file.pushImage()
                }
       
            }
        }
        stage("Deploy to EC2") {
            steps{
                script{
                    // deploying the app on ec2 instance using docker-compose 
                    sh "cd ${WORKSPACE} && docker-compose -f docker-compose.yaml up"
                }
            }
        }
    }
}
