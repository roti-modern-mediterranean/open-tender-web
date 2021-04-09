const path = require('path')
const Uploader = require('s3-uploading').default
require('dotenv').config()

const options = {
  s3: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: '',
    ACL: 'public-read',
    sslEnabled: false
  },
  upload: {
    directory: path.resolve(__dirname, '../build'),
    bucket: process.env.AWS_BUCKET_NAME
  }
}
const uploading = new Uploader(options)
uploading.upload()