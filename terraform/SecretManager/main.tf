resource "aws_secretsmanager_secret" "assistant_secrets" {
    name        = "assistant-secrets"
    description = "Secrets for the Assistant application"
}