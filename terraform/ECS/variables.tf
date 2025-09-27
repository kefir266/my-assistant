variable "container_name" {
  type        = string                     # The type of the variable, in this case a string
  default     = "assistant-container"                 # Default value for the variable
}

variable "log_group" {}
variable "region" {}
variable "secret_arn" {}