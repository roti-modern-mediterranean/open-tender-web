const AWS = require('aws-sdk')
const rimraf = require('rimraf')
require('dotenv').config()

AWS.config.update({
  'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
  'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY
})

const invalidate = (listOfFiles) => {
  let cloudfront = new AWS.CloudFront()
  let quantity = 1
  if (!listOfFiles) {
    listOfFiles = ['/*']
  } else {
    quantity = listOfFiles.length
  }
	cloudfront.createInvalidation({
		'DistributionId': process.env.CLOUDFRONT_DISTRIBUTION_ID,
		'InvalidationBatch': {
			'CallerReference': `${Math.floor(Date.now() / 1000)}`,
			'Paths': {
				'Quantity': quantity,
				'Items': listOfFiles
			}
		}
	}, (err, res) => {
		if(err) {
		  console.log('Cloudfront error', err)
    } else {
      console.log('Cloudfront response', res)
    }
	})
}

rimraf('../build', () => { 
  invalidate(['/*'])
})