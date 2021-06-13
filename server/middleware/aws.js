const multer  = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/../secret/s3.json');

const s3 = new aws.S3();
const uploadBanner = multer({
	storage : multerS3({
		s3: s3,
		bucket : "minshopping/banner",
	 	acl: 'public-read',
		key: function(req, file, cb){
            cb(null, Date.now() + '.' + file.originalname.split('.').pop());
		}
		
	})
})

var getBanner = function(req, res, next){
	const params = {
		Bucket : "minshopping",
		Prefix : "banner/"
	};
	
	
	s3.listObjectsV2(params, (err, data)=>{
		if(err) return console.log(err);
		req.data = data.Contents;
		
		return next();
		
	})
}
module.exports = {
	uploadBanner : uploadBanner,
	getBanner  : getBanner
};