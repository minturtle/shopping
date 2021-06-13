const express =require('express');
const router = express.Router();
const bannerModel = require('../models').Banner; 
const { uploadBanner, getBanner }  = require('../middleware/aws.js');


router.get('/get-banner', getBanner, (req,res)=>{
	if(!req.data) return res.status(200).json({success : false, message : "배너를 불러오는데 실패했습니다."});
	res.status(200).json({success : true, message: null, banner : req.data});
	
	
})


//Banner는 이미지 파일만 저장
router.post('/banner-upload', uploadBanner.single('Banner') ,(req,res)=>{
	var file = req.file;
	if(file){
		res.status(200).send({success :true , data : file.location, message : "이미지 업로드에 성공하셨습니다."});
	}
	else{
		res.status(200).send({success : false, data : null, message : "이미지 업로드에 실패하셨습니다."})
	}
})



module.exports = router;