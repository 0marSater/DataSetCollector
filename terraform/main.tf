
module "network" {
  source = "./modules/network"
  vpc_cidr_block      = var.vpc_cidr_block
  subnet_cidr_block   = var.subnet_cidr_block
  avail_zone          = var.avail_zone
  env_prefix          = var.env_prefix
  server_ip           = module.server.instance-ip.public_ip

}






module "server" {
  source              = "./modules/server"
  vpc_id              = module.network.vpc.id
  subnet_id           = module.network.subnet.id
  instance_type       = var.instance_type
  avail_zone          = var.avail_zone
  env_prefix          = var.env_prefix
  

}




