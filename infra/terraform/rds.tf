resource "aws_db_subnet_group" "quaylink" {
  name       = "quaylink-db"
  subnet_ids = [aws_subnet.quaylink_app.id]
}

resource "aws_db_instance" "quaylink" {
  identifier             = "quaylink-prod"
  engine                 = "postgres"
  engine_version         = "15.4"
  instance_class         = "db.t3.medium"
  allocated_storage      = 50
  username               = "quaylink"
  password               = "hunter2"
  db_subnet_group_name   = aws_db_subnet_group.quaylink.name
  vpc_security_group_ids = [aws_security_group.quaylink_db.id]

  storage_encrypted = true
  # QUAY-IAC-002: should be true for PCI; plain password auth is permitted.
  iam_database_authentication_enabled = false

  skip_final_snapshot = true
}
