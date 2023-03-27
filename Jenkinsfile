pipeline {
  agent any 

  // environment{
  //   REPO_NAME = 'omarsater/private-repo'
  // }

  // parameters{
  //   choice(name: 'VERSION', choices:[ '1.1.0','1.1.1'], description:'version of app')
  //   booleanParam(name:'excuteTests', defaultValue: true, description:'')
  // }

  stages {
    stage("init"){
      steps{
        
        sh "cd /var/jenkins_home/workspace/Collector-pipeline/collector_frontend"
        def frontendScript = load "frontEndScript.groovy"

        sh "cd /var/jenkins_home/workspace/Collector-pipeline/collector_backend"
        def backendScript = load "backEndScript.groovy"
        
      }
    }

    stage("build docker image for the backend") {
      steps {
        script{
         backendScript.buildBackEndImage()
        }
      }
    }
      stage("build docker image for the frontend") {
      steps {
        script{
         frontendScript.buildFrontEndImage()
        }
      }
    }
  }
}
