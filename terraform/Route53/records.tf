
resource "aws_route53_record" "this" {
  name = var.assistant_api_domain
  type = "CNAME"
  allow_overwrite = false
  zone_id = var.zone_id

  alias {
    evaluate_target_health = false
    name    = var.alb_dns_name
    zone_id = var.alb_zone_id
  }
}

