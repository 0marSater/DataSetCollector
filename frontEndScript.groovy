def buildFrontEndImage(){
    echo "Building frontend image..."
    sh "cd /var/jenkins_home/workspace/Collector-pipeline/collector_frontend && docker build -t omarsater/private-repo:react-v2.0 ."
}
return this 