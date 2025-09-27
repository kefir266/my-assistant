resource "aws_route53_record" "this" {
  name = var.assistant_api_domain
  type = "CNAME"
  allow_overwrite = false
  zone_id = var.zone_id

  ttl  = 300
  records = [var.alb_dns_name]
}
