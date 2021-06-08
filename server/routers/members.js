const express = require('express');
const userModel = require('../models').User; 
const pw = require('../secret/passwords.js');

var _ = require('lodash');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();

//register
router.post('/register', (req,res)=>{
	var newUser = {
		email : req.body.email,
		user_name : req.body.username,
		password : req.body.password,
		isAdmin : req.body.isAdmin||0,
		image : req.body.image||null
	}
	bcrypt.genSalt(saltRounds, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
        	if(err)console.log(err);
			newUser.password = hash;
			userModel.create(newUser)
				.then(()=>res.status(200).json(
				{success: true ,
				 message : "회원가입 성공"}))
				.catch((err)=>res.status(500).json(
				{success: false ,
				 message : "회원가입 에러"}));
	
    	});
	});
})

//정보 조회 url query에서 id를 받아옴
router.get('/see', (req,res)=>{
	var email = req.query.email;
	userModel.findOne({
		where : {
			email : email
		}
	}).then((user)=>{
		if(!user) return res.status(404).json({
			success : false ,
			user : null
		});
		
		var userJson = {
			id: user.id,
			email : user.email,
			username : user.username
		}
		
		res.status(200).json( {success : true, user : userJson});
	}).catch((err)=>{
		res.status(500).send("err");
	})
})

//정보 일부 수정(비밀번호는 따로)
router.patch('/revice', (req,res)=>{
	var updateJson = _.cloneDeep(req.body);
	if(updateJson.password)delete updateJson.password;
	
	delete updateJson.id;
	
	userModel.update(updateJson, {
		where : {
			id: req.body.id
		}
	}).then(()=>res.status(200).json(
				{success: true ,
				 message : "정보수정 성공"})).catch(()=>res.status(500).json(
				{success: false ,
				 message : "정보수정 실패"}))
})

//유저 삭제
router.delete('/deluser', (req,res)=>{
	userModel.destroy({
		where :{
			id : req.body.id
		}
	}).then(()=>res.status(200).json(
				{success: true ,
				 message : "회원삭제 성공"})).catch(()=>{
		res.status(500).json(
				{success: false ,
				 message : "회원삭제 실패"})
	})
})
module.exports = router;