#expose instance object to be used by output.tf root module.
output "instance-ip" {
    value = aws_eip.myapp-elasticIP
}
