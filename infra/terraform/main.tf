terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

provider "aws" {
  region = "eu-west-2"
}

resource "aws_vpc" "quaylink" {
  cidr_block = "10.20.0.0/16"
  tags       = { Name = "quaylink-vpc" }
}

resource "aws_subnet" "quaylink_app" {
  vpc_id            = aws_vpc.quaylink.id
  cidr_block        = "10.20.1.0/24"
  availability_zone = "eu-west-2a"
}

# QUAY-IAC-005: SG ingress 0.0.0.0/0 on Postgres.
resource "aws_security_group" "quaylink_db" {
  name   = "quaylink-db-sg"
  vpc_id = aws_vpc.quaylink.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
