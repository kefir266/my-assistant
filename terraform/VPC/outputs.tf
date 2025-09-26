
output "vpc_id" {
  value = aws_vpc.main.id
}

output "subnet_ids" {
  value = [aws_subnet.assistant-subnet1.id, aws_subnet.assistant-subnet2.id]
}
