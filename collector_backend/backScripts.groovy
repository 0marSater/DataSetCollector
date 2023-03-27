def buildDockerImage(){
    echo "Building backend image..."
    
    sh "docker build -t omarsater/private-repo:flask-v2.0 ."
}
