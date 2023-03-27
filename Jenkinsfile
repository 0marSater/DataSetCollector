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
        script{
          sh "cd /var/jenkins_home/workspace/my-frist-pipline/collector_frontend"
          gv = load "frontScripts.groovy"
          sh "cd /var/jenkins_home/workspace/my-frist-pipline/collector_backend"
          gv = load "backScripts.groovy"
          sh "cd /var/jenkins_home/workspace/my-frist-pipline/"
        }
      }
    }

    stage("build react-frontend docker image") {
      steps {
        script{
          gv.buildDockerImage()
        }
      }
    }
    
    stage("build flask-backend docker image") {  
      steps {
        script{
          gv.buildDockerImage()
        }
      }
    }
  }
}
