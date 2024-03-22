const writeData = require('./source/dataController.js').writeData;
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');

app.use( bodyParser.json() )
app.use( cors() );
app.use(express.static('client'));

app.get( "/", (request, response)=>{
	// response.json( {
	// 	status: 200,
	// 	comment: "hello world"
	// } )

	console.log(request)
	
	response.type('.html')
	response.sendFile(path.resolve(__dirname, 'client/index.html'))
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