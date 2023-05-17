#expose vpc object
output "vpc" {
    value = aws_vpc.myapp-vpc
}

#expose subnet object
output "subnet" {
    value = aws_subnet.myapp-subnet-1
}

#expose name server data 
output "ns_record_info" {
  value = data.aws_route53_zone.domain_zone.name_servers
}
