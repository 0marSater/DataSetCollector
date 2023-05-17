// def buildFrontImage() {
//     echo "Start building frontend image ... "
//     sh "cd ${WORKSPACE}/collector_frontend && docker build -t $FRONTEND_IMAGE_TAG ."
// }

def buildBackImage() {
    echo "Start building backend image ... "
    sh "cd ${WORKSPACE}/collector_backend && docker build -t $BACKEND_IMAGE_TAG ."
}

return this