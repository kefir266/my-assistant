output "ecs_app_log_group" {
  value = aws_cloudwatch_log_group.ecs_app_log_group.name
}