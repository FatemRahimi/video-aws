# ------------------------- Creating bucket -------------------------
resource "aws_s3_bucket" "video_bucket" {
  bucket = "video-hub-terraform" //Should be unique name
}


# ------------------------- Making it public -------------------------
resource "aws_s3_bucket_public_access_block" "video_bucket" {
  bucket = aws_s3_bucket.video_bucket.id

  block_public_acls       = true
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}


# ------------------------- Adding policy to bucket -------------------------
resource "aws_s3_bucket_policy" "video_bucket" {
  bucket = aws_s3_bucket.video_bucket.id

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "PublicReadGetObject",
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : "s3:GetObject",
        "Resource" : "${aws_s3_bucket.video_bucket.arn}/*"
      }
    ]
  })
}


# ------------------------- Making it as a static website hosting -------------------------
resource "aws_s3_bucket_website_configuration" "video_bucket" {
  bucket = aws_s3_bucket.video_bucket.id

  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "error.html"
  }
}
