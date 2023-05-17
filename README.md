# DataSetCollector
 
__DataSetCollector__ is a part of our graduation project which helps us to gather dataset for training our `AI model`, which interprets specific meaning form non-verbal gestures that a person makes. 

This project contain `collector_backend` folder, inside it the source code and `Dokcerfile` for building its image, as long as the backend and other component.

#Terraform folder
-----------------
`Terraform` folder contain some terraform files such as the root `main.tf`, `varaibles.tf`, `output.tf` and two `modules`.


Docker-compose file
--------------------
- we used `docker-compose.yaml` to put our instruction to run both images with hardcoded tags from our `dockerhub` private repo, although mount it with presist volume to save any data sent to us, exposing necessary ports to connect to both container.

Jenkins pipeline
----------------
`Jenkinsfile` contain four stages:
- ___Clone repository__: this stages ensure changes that pushed are cloned to keep up to date the pipeline.
- ___Build both image__: this tage contain 2 external groovy files, one for building frontend image commands, another for backend.
- ___Push to dockerhub__: here we pushing images to private dockerhub to manage our images. Make sure u added ur credentails to Jnekins. 
- ___Deploy on EC2__: after provisioning AWS infrastructure, we deploy the two images on EC2 instance t2.medium type.


