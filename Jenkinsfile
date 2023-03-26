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
          gv = load "frontScripts.groovy"
          gv = load "backScripts.groovy"
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
