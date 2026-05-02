# QUAY-IAC-004: role with full wildcard, attached to app instance profile.
resource "aws_iam_role" "quaylink_app" {
  name = "quaylink-app-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Principal = { Service = "ec2.amazonaws.com" },
      Action    = "sts:AssumeRole"
    }]
  })
  inline_policy {
    name   = "all-access"
    policy = jsonencode({
      Version   = "2012-10-17",
      Statement = [{ Effect = "Allow", Action = "*", Resource = "*" }]
    })
  }
}
