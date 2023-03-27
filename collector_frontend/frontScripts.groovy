def buildDockerImage(){
    echo "Building frontend image..."
   
    sh "docker build -t omarsater/private-repo:react-v2.0 ."
}
