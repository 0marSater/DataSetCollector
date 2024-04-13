# DataSetCollector
 
 ___DataSetCollector___ is a part of our graduation project which helps us to gather dataset for training our `AI model`, which interprets specific meaning form non-verbal gestures that a person makes. 

This project contain `collector_backend` folder, inside it the source code and `Dokcerfile` for building its image, as long as the backend and other component.

Terraform folder
-----------------
`Terraform` folder contain some terraform files such as the root `main.tf`, `varaibles.tf`, `output.tf` and two `modules`.


Docker-compose file
--------------------
- We used `docker-compose.yaml` to put our instruction to run both images with hardcoded tags from our `dockerhub` private repo, although mount it with presist volume to save any data sent to us, exposing necessary ports to connect to both container.

Jenkins pipeline
----------------
`Jenkinsfile` contain four stages:
- ___Clone repository___: this stages ensure changes that pushed are cloned to keep up to date the pipeline.
- ___Build both image___: this tage contain 2 external groovy files, one for building frontend image commands, another for backend.
- ___Push to dockerhub___: here we pushing images to private dockerhub to manage our images. Make sure you added ur credentails on Jenkins. 
- ___Deploy on EC2___: after provisioning AWS infrastructure, we deploy the two images on EC2 instance t2.medium type.
---
Demo
----


https://github.com/0marSater/DataSetCollector/assets/111258496/7daaf9dd-219c-43ac-a5ef-4bc1c6e61bca


___Finally, you can access it using www.dataset-collector.online___ 


