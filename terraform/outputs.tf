output "ECS_TASK_DEFINITION" {
  value = module.ECS
}

output "CONTAINER_NAME" {
  value = module.ECS.CONTAINER_NAME
}

output "ECS_SERVICE" {
  value = module.ECS.ECS_SERVICE
}

output "ECS_CLUSTER" {
  value = module.ECS.ECS_CLUSTER
}