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
    stage("build docker image for the backend") {
      steps {
        script{
          def backendScript = load "backEndScript.groovy"
          backendScript.buildBackEndImage()
        }
      }
    }
      stage("build docker image for the frontend") {
      steps {
        script{
          sh"/var/jenkins_home/workspace/Collector-pipeline/"
          def frontendScript = load "frontEndScript.groovy"
          frontendScript.buildFrontEndImage()
        }
      }
    }
  }
}
