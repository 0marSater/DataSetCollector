
#1 Create security group 
resource "aws_security_group" "myapp-security-group" {
    name                = "myapp-security-group"
    vpc_id              = var.vpc_id

    #ingress for inbound traffic
    ingress {
        from_port       = 22 
        to_port         = 22
        protocol        = "tcp"
        #define who allowed to access this port, u can define a specific one ip only or a range.
        cidr_blocks     = ["0.0.0.0/0"]
    }

    ingress {
        from_port       = 80 
        to_port         = 80
        protocol        = "tcp"
        #define who allowed to access this port, u can define a specific one ip only or a range.
        cidr_blocks     = ["0.0.0.0/0"]
    }

    ingress {
        from_port       = 5000 
        to_port         = 5000
        protocol        = "tcp"
        #define who allowed to access this port, u can define a specific one ip only or a range.
        cidr_blocks     = ["0.0.0.0/0"]
    }

      ingress {
        from_port       = 8080 
        to_port         = 8080
        protocol        = "tcp"
        #define who allowed to access this port, u can define a specific one ip only or a range.
        cidr_blocks     = ["0.0.0.0/0"]
    }


    #egress for outbound traffic
    egress {
        from_port       = 0 
        to_port         = 0
        protocol        = "-1"
        cidr_blocks     = ["0.0.0.0/0"]
        prefix_list_ids = []
    }
    
    tags = {
        Name:           "${var.env_prefix}-sg"
    }

}


#2 fetch ec2 ami data
data "aws_ami" "latest-amazon-linux-image" {
    
    #get most recent image
    most_recent     = true 
    owners          = ["amazon"]

    filter {
        name        = "name"
        #image name
        values      = ["amzn2-ami-hvm-*-x86_64-ebs"]
    }

    filter {
        name        = "virtualization-type"
        values      = ["hvm"]
    }
} 

#3 create EC2 instance
resource "aws_instance" "myapp-server" {
    ami                         = data.aws_ami.latest-amazon-linux-image.id
    instance_type               = var.instance_type

    subnet_id                   = var.subnet_id
    vpc_security_group_ids      = [aws_security_group.myapp-security-group.id]
    availability_zone           = var.avail_zone

    associate_public_ip_address = true
    key_name                    = "server-key"

    user_data                   = file("entry-script.sh")

    tags = {
        Name:                   "${var.env_prefix}-server"
    }
}



#4 create ElasticIP
resource "aws_eip" "myapp-elasticIP"{
    vpc         = true
    tags        = {
        Name:   "${var.env_prefix}-ElasticIP"
    }
}

#5 Associate ElasticIP to EC2 
resource "aws_eip_association" "associate-elasticIP" {
  instance_id   = aws_instance.myapp-server.id
  allocation_id = aws_eip.myapp-elasticIP.id
}



