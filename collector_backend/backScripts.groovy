def buildDockerImage(){
    echo "Building backend image..."
    sh"cd collector_backend"
    sh "docker build -t omarsater/private-repo:flask-v2.0 ."
}
