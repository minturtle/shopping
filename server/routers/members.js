const express = require('express');
const userModel = require('../models').user_info; 
const pw = require('../secret/passwords.js');

var _ = require('lodash');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();


//register form
router.get('/', (req,res)=>{
	res.send('test');
})

//register
router.post('/register', (req,res)=>{
	var newUser = {
		email : req.body.email,
		username : req.body.username,
		password : req.body.password
	}
	bcrypt.genSalt(saltRounds, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
        	if(err)console.log(err);
			newUser.password = hash;
			userModel.create(newUser).then(()=>res.status(200).send("회원가입 성공")).catch((err)=>res.status(500).send("err"));
	
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
		if(!user) return res.status(404).send("회원이 존재하지 않습니다.");
		
		var userJson = {
			id: user.id,
			email : user.email,
			username : user.username,
			createdAt : user.createdAt,
		}
		
		res.status(200).json(userJson);
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
	}).then(()=>res.status(200).send("정보 수정완료")).catch(()=>res.status(500).send("err"))
})

//유저 삭제
router.delete('/deluser', (req,res)=>{
	userModel.destroy({
		where :{
			id : req.body.id
		}
	}).then(()=>res.status(200).send("삭제 성공")).catch(()=>{
		res.status(500).send("에러");
	})
})
module.exports = router;