output "ECS_TASK_DEFINITION" {
  value = aws_ecs_task_definition.assistant-task.arn
}

output "CONTAINER_NAME" {
  value = var.container_name
}

output "ECS_SERVICE" {
  value = aws_ecs_service.assistant-api.name
}

output "ECS_CLUSTER" {
  value = aws_ecs_cluster.main.name
}