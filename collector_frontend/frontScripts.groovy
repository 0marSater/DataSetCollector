def buildDockerImage(){
    echo "Building frontend image..."
    sh "cd collector-frontend"
    sh "docker build -t omarsater/private-repo:react-v2.0 ."
}
