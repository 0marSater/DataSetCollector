#!bin/bash

#install docker & git
sudo yum update -y && sudo yum install -y docker 
sudo yum install -y git

#install docker-compose 
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose


#start docker deamon  
sudo systemctl start docker 

#give permission to ec2-user to use docker commands
sudo usermod -aG docker ec2-user
sudo chmod 666 /var/run/docker.sock

#clone docker repo in /ec2-user/home directory
cd /ec2-user/home && git clone https://github.com/0marSater/DataSetCollector.git

#run jenkins container
docker run -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/usr/bin/docker -v /usr/local/bin/docker-compose:/usr/local/bin/docker-compose jenkins/jenkins:lts




