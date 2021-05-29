const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const portNum = process.env.PORT_NUMBER||5000;

const pw = require('./secret/passwords');

const membersRouter = require('./routers/members');
const loginRouter = require('./routers/auth');
const docuRouter = require('./routers/documents');

const app = express();


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/members', membersRouter);
app.use('/login', loginRouter);
app.use('/posting', docuRouter);

app.get('/', (req,res)=>{
	res.send('main_page');
})

app.listen(portNum, ()=>{
	console.log('server is running at port ' + portNum);
})