output "secret_arn" {
  value = aws_secretsmanager_secret.assistant_secrets.arn
}
