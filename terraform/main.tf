provider "aws" {
  region = var.region
}


data "terraform_remote_state" "domain_external_data" {
  backend = "local"
  config = {
    path = var.external_terraform
  }
}

locals {
  zone_id        = var.zone_id != "" ? var.zone_id : data.terraform_remote_state.domain_external_data.outputs.zone_id
  certificate_arn = var.certificate_arn != "" ? var.certificate_arn : data.terraform_remote_state.domain_external_data.outputs.certificate_arn
}

module "ALB" {
  source = "./ALB"
  certificate_arn = local.certificate_arn
}

module "Route53" {
  source = "./Route53"
  assistant_api_domain  = var.assistant_api_domain
  zone_id = local.zone_id
  alb_dns_name = module.ALB.alb_dns_name
  alb_zone_id  = module.ALB.alb_zone_id
}

module "log_groups" {
  source = "./LogGroups"
}

module "secrets_manager" {
  source = "./SecretManager"
}

module "ECS" {
  source = "./ECS"
  log_group = module.log_groups.ecs_app_log_group
  region = var.region
  secret_arn = module.secrets_manager.secret_arn
}

module "Repository" {
  source = "./Repository"
}
