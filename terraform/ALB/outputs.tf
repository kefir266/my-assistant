output "alb_dns_name" {
  value = aws_lb.assistant-alb.dns_name
}

output "alb_zone_id" {
  value = aws_lb.assistant-alb.zone_id
}