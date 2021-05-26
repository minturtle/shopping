const express = require('express');
const docModel = require('../models').doc_info; 
const pw = require('../secret/passwords.js');

var _ = require('lodash');

const router = express.Router();


//글 작성
router.post('/',(req, res)=>{
	var doc = {
		title:req.body.title,
		writer: req.body.id,
		image: req.body.image||null,
		desc : req.body.desc
	}
	
	docModel.create({
		title: doc.title,
		writerID : doc.writer,
		image: doc.image,
		desc : doc.desc
	}).then(
		res.status(200).send("글 작성 완료")
	).catch((err)=>{
		res.status(500).send("글 저장 에러")	
	})
	
})

//글 목록보기(query에서 page를 받아서 한페이지당 5개씩 글을 보여줌)
router.get('/lists',(req,res)=>{
	var temp = req.query.page||1;
	var page = (parseInt(temp)-1)*5;
	
	docModel.findAll({
		offset : page,
		limit: 5
	}).then((rows)=>{
			res.status(200).send(JSON.stringify(rows));
		}
	).catch((err)=>{
		res.status(500).send('error');	
	}
	)

})


//글 삭제(나중에 회원이 맞을때만 글 삭제 요청하는거 구현)
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
	}).then(result=>res.status(200).send({message : "수정 완료"})
	).catch(err=>res.status(500).send({message: 'err'}));
})

module.exports = router;