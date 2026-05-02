# QUAY-IAC-001: customer-managed KMS key with overly permissive policy.
resource "aws_kms_key" "quaylink_pii" {
  description             = "Quaylink PII encryption key"
  deletion_window_in_days = 7

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = "*",
        Action    = "kms:*",
        Resource  = "*"
      }
    ]
  })
}
