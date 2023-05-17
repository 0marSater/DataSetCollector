variable "vpc_cidr_block" {
  description = "CIDR block for VPC"
}

variable "subnet_cidr_block" {
  description = "CIDR block for subnet"
}

variable "avail_zone" {
  description = "Availability zone"
}

variable "env_prefix" {
  description = "Environment prefix"
}


variable "instance_type" {
    type = string
    default = "t2.micro" 
}


