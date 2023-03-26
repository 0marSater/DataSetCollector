def buildDockerImage(){
    echo "Building backend image..."
    sh"cd collector-backend"
    sh "docker build -t omarsater/private-repo:flask-v2.0 ."
}
