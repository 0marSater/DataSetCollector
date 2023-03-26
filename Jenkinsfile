pipeline {
  agent any 
  parameters{
    choice(name: 'VERSION', choices:[ '1.1.0','1.1.1'], description:'version of app')
    booleanParam(name:'excuteTests', defaultValue: true, description:'')
  }
  stages {
    
    stage("build") {
      
      steps {
        echo 'building the app.'
      }
    }
    
    stage("test") {
      when{
        expression{
          params.excuteTests // == true
        }
      }
      steps {
        echo 'testing the app.'
      }

    }
    
    stage("deploy") {      
      steps {
        echo "deploying the app"
        echo "deploying version ${params.VERSION}"
      }
    }
  }
}
