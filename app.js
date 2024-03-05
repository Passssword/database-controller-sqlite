const writeData = require('./source/dataController.js').writeData;
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');

app.use( bodyParser.json() )
app.use( cors() );

app.get( "/", (request, response)=>{
	response.json( {
		status: 200,
		comment: "hello world"
	} )
} )
app.post( "/", (request, response)=>{
	try{
		writeData(request.body)
		console.log(request.body)
		return response.json( {
			status: 200,
			comment: "data is sending"
		} )
	}catch(err){
		console.log(err)
		return response.json( {
			status: 400,
			comment: "something wrong",
			error: err
		} )
	}
} )
app.listen(34587)