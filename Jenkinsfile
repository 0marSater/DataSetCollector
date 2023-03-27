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
          def script = load "script.groovy"
        }
      }
    }

    stage("build") {
      steps {
        script{
         script.build()
        }
      }
    }
  }
}
