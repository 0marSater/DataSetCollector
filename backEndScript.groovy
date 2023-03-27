def buildBackEndImage(){
    echo "Building backend image..."
    sh "cd /var/jenkins_home/workspace/Collector-pipeline/collector_backend && docker build -t omarsater/private-repo:flask-v2.0 ."

}
return this 