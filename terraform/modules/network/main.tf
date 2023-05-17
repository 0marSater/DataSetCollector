#1 Create vpc
resource "aws_vpc" "myapp-vpc" {
    cidr_block = var.vpc_cidr_block
    tags       = {
        Name   = "${var.env_prefix}-vpc"
    }
}

#2 Create subnet
resource "aws_subnet" "myapp-subnet-1" {
    vpc_id               = aws_vpc.myapp-vpc.id
    cidr_block           = var.subnet_cidr_block
    availability_zone    = var.avail_zone
    tags = {
        Name             = "${var.env_prefix}-subnet-1"
    }
}

#3 Create igw
resource "aws_internet_gateway" "myapp-igw" {
    vpc_id      = aws_vpc.myapp-vpc.id
        tags    = {
        Name:   "${var.env_prefix}-igw"
    }
}

#4 Create rt
resource "aws_route_table" "myapp-route-table" {
    vpc_id          = aws_vpc.myapp-vpc.id
    
    #internal route configure automatically
    route {
        cidr_block  = "0.0.0.0/0"
        gateway_id  = aws_internet_gateway.myapp-igw.id
    }
    tags = {
        Name:       "${var.env_prefix}-rtb"
    }
}

#5 Link route table to subnet-1
resource "aws_route_table_association" "assocaition-route-table-subent" {
    subnet_id       = aws_subnet.myapp-subnet-1.id
    route_table_id  = aws_route_table.myapp-route-table.id

}



#6 Create hosted zone
resource "aws_route53_zone" "domain_zone" {
  name    = "dataset-collector.online"
}

#7 create first record for the DNS
resource "aws_route53_record" "domain_record_1" {
  zone_id   = aws_route53_zone.domain_zone.zone_id
  name      = "dataset-collector.online"
  type      = "A"
  ttl       = "300"
  records   = [var.server_ip]  # Replace with your EC2 instance IP address

  allow_overwrite = true
}

#8 Create second record for the DNS
resource "aws_route53_record" "domain_record_2" {
  zone_id   = aws_route53_zone.domain_zone.zone_id
  name      = "www"
  type      = "CNAME"
  ttl       = "300"
  records   = ["dataset-collector.online"]  # Replace with your EC2 instance IP address

  allow_overwrite = true
}


#9 Return hosted zone data
data "aws_route53_zone" "domain_zone" {
  name          = "dataset-collector.online"
  depends_on    = [aws_route53_zone.domain_zone]
}
