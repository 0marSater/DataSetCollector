output "server_ip" {
    value = module.server.instance-ip.public_ip
}


#output on cli the 4 servers name, which used for connecting to DNS mother's host servers (in my case hostinger)
output "name_servers" {
  value = module.network.ns_record_info
}
