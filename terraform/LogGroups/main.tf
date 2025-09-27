resource "aws_cloudwatch_log_group" "ecs_app_log_group" {
  name              = "/ecs/my-assistant-logs"
  retention_in_days = 7
}

