def pushImage(){

    echo "Login to docker private repo ..."
    withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
        sh 'echo $PASS | docker login -u $USER --password-stdin'
    }

    echo "Start pushing frontend image $FRONTEND_IMAGE_TAG ..."
    sh "cd ${WORKSPACE}/collector_frontend && docker tag $FRONTEND_IMAGE_TAG $DOCKER_REPO:$FRONTEND_IMAGE_TAG"
    // sh "docker push $DOCKER_REPO:$FRONTEND_IMAGE_TAG"
    
    echo "Start pushing frontend image $BACKEND_IMAGE_TAG ..."
    sh "cd ${WORKSPACE}/collector_backend && docker tag $BACKEND_IMAGE_TAG $DOCKER_REPO:$BACKEND_IMAGE_TAG"
    // sh "docker push $DOCKER_REPO:$BACKEND_IMAGE_TAG"

}

return this