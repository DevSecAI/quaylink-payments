resource "aws_lb" "quaylink" {
  name               = "quaylink-alb"
  load_balancer_type = "application"
  subnets            = [aws_subnet.quaylink_app.id]
}

# QUAY-IAC-003: HTTP listener serves traffic directly; should redirect to HTTPS/443.
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.quaylink.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "forward"
    target_group_arn = "arn:aws:elasticloadbalancing:eu-west-2:000000000000:targetgroup/quaylink/0000"
  }
}
