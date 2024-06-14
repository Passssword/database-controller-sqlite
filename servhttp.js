const writeData = require('./source/dataController.js').writeData;
const getData = require('./source/dataController.js').getData;
const http = require('http')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors');

const baseController = require('./source/dataController.js').baseController;


http.createServer( function(req, res) {

	const url = req.url;
	console.log(url)
	console.log( req.method )

	switch (url) {
		case '/':
			let data = fs.readFileSync( './client/index.html', { encoding: 'utf-8', flag: 'r'} )
			res.write(data)
			res.end()
			break;
		case '/getdata':
			// let temp_data = getData();
			let baseData = baseController.all()
			res.write( baseData )
			res.statusCode = 200;
			res.end()
			break;
		case '/pushdata':
			if ( req.method == 'POST' ) {
				let body = '';
				req.on( 'data', chunk => {
					body += chunk.toString()
				} )
				req.on( 'end', () => {
					try{
						let dataObj = JSON.parse(body)
						// writeData(dataObj)
						baseController.create(dataObj, (error) => {
							if(error) {return console.log(error)}
						})
						res.write('OK')
						return res.end()
					}catch(err){
						console.log(err)
						res.write('something wrong')
						return res.end()
					}
				} )
				
			}
			break;
		default:
			if ( url.includes('/images') ) {
				let data = fs.readFileSync('./client'+url)
				res.write(data)
				res.end()
			} else if ( url.includes('/styles') ) {
				let data = fs.readFileSync('./client'+url)
				res.write(data)
				res.end()
			} else if ( url.includes('/js') ) {
				let data = fs.readFileSync('./client'+url)
				res.write(data)
				res.end()
			} else {
				res.statusCode = 404;
				res.write('<h1>404</h1>')
				res.end()
			}
	}
} ).listen(34587)