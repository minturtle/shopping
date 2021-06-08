const express = require('express');
const pw = require('../secret/passwords.js');
const bcrypt = require('bcrypt');
const router = express.Router();
const userModel = require('../models').User; 
const jwt = require('jsonwebtoken'); 
const { auth } = require('../middleware/auth.js');

const privateKey = pw.TOKEN_KEY;


//local-login 시도
router.post('/locallogin', function(req,res){
	
	userModel.findOne({
		where : {
			email : req.body.email
		}
	}).then((user)=>{
		if(!user) return res.status(200).json({success : false, message :"존재하지 않은 이메일입니다.", user : null});
		
				bcrypt.compare(req.body.password,user.password, function(err, result) {
    		if(!result) return res.status(200).json({success : false, message : "비밀번호가 틀렸습니다.", user : null});
			
			jwt.sign(String(user.email), privateKey, function(err, token){
				userModel.update({token : token}, {where : {
					id : user.id
				}}).then(()=>{
					res.cookie('x_auth', token, {httpOnly : true}).status(200).json({
						success:true,
						user : {
							userName : user.user_name,
							isAdmin : user.isAdmin,
							image : user.image
						},
						message : null
					});
				}).catch(()=>{
					res.json({err : err});
				})
			});
			
			
		});
		
	})
	
	
})


//middlware 을 통해 req.user은 인증이 완료된 유저
router.get('/logout', auth , function(req, res){
	if(!req.user||!req.token)return res.status(200).json({success: false});
	console.log(req.user);
	//userModel update를 통해 token을 만료 시키고 cookie를 제거함
	userModel.update({token : null},{
		where : {
			email : req.user.email
		}
	}).then(()=>{
		res.clearCookie('x_auth');
		res.status(200).json({
			success : true
		});
	})
});

router.get('/auth', auth, function(req,res){
	if((!req.user||!req.token))return res.status(200).json({success : false ,user : null});
	
	var userJson = {
		username : req.user.user_name,
		isAdmin : req.user.isAdmin,
		image : req.user.image
	}
	
	res.status(200).json({success :true, user :userJson, message : null});
})




module.exports = router;