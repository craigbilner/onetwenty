Full write up is here: http://bit.ly/2qfOORq

After witnessing a less than perfect website, I had a go at mirroring it, with the sole aim of teaching my housemate how I did it, and getting a score of 100/100 on [PageSpeed](https://developers.google.com/speed/pagespeed/insights/).

# Plan of attack

- [x]  Make site with [Hugo](https://gohugo.io/)
  - [x] Compress images, provide optimised versions and move logo to SVG
  - [x] Inline critical CSS
  - [x] Make site responsive
  - [x] Add a service worker
  - [x] Add resource hints
  - [x] Only use JS where absolutely necessary
- [x] Wire up to [AWS S3](https://aws.amazon.com/s3/) with [Codeship](https://codeship.com/)
  - [x] Cache for a year
- [x] Add [CloudFront](https://aws.amazon.com/cloudfront/)
  - [x] HTTPS, HTTP/2, GZIP
