def buildDockerImage(){
    echo "Building frontend image..."
    sh "cd collector_frontend"
    sh "docker build -t omarsater/private-repo:react-v2.0 ."
}
