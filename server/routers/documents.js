const express = require('express');
const docModel = require('../models').product; 
const pw = require('../secret/passwords.js');

var _ = require('lodash');

const router = express.Router();


//글 작성
router.post('/',(req, res)=>{
	var product = {
		name:req.body.name,
		image: req.body.image||null,
	}
	
	docModel.create({
		name : product.name,
		image : product.image
	}).then(
		res.status(200).send("글 작성 완료")
	).catch((err)=>{
		res.status(500).send("글 저장 에러")	
	})
	
})

//글 목록보기
router.get('/lists',(req,res)=>{
	var temp = req.query.page||1;
	var page = (parseInt(temp)-1)*5;
	
	docModel.findAll({
		offset : page,
		limit: 5
	}).then((rows)=>{
			res.status(200).json(rows);
		}
	).catch((err)=>{
		res.status(500).json({err: err, message: null});	
	}
	)

})


//글 삭제
router.delete('/deletedoc', (req,res)=>{
	var docId = req.body.docID;
	docModel.destroy({
		where : {
			id : docId
		}
	}).then((result)=>res.status(200).json({err : null, message : "삭제 성공"}))
	.catch((err)=>res.status(404).json({err: err, message: null}));
	
})

//글 수정(나중에 회원이 맞을때만 글 수정 가능하게 구현)
router.patch('/revicedoc', (req,res)=>{
	var updateJson = _.cloneDeep(req.body);
	delete updateJson.docID;
	docModel.update(updateJson, {
		where : {
			id : req.body.docID
		}
	}).then(result=>res.status(200).json({err : null, message : "수정 성공"})
	).catch(err=>res.status(500).json({err: err, message: null}));
})

module.exports = router;