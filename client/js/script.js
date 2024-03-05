/* JavaScript */

const btnGet = document.querySelector('.btnGet');
const btnPost = document.querySelector('.btnPost');
const btnGetLocal = document.querySelector('.btnGetLocal');
const btnPostLocal = document.querySelector('.btnPostLocal');
const formId = document.querySelector('#formId');
const formFullname = document.querySelector('#formFullname');
const btnPostForm = document.querySelector('#btnPostReqest');
const requestURLlocal = 'http://localhost:34587/pushdata';
const requestURL = 'http://jsonplaceholder.typicode.com/users';

let requestBody = {
	id: 212145,
	name: 'Vasya'
}


function sendRequest(reqMethod, reqURL, reqBody = null) {
	return new Promise( (resolve, reject) => {
		const xhr = new XMLHttpRequest;
	
		xhr.open(reqMethod, reqURL);

		xhr.responseType = 'json';
		xhr.setRequestHeader('Content-Type', 'application/json')

		xhr.onload = () => {
			if (xhr.status >= 400) {
				resolve(xhr.response)
			}else{
				reject(xhr.response)
			}
		}
		xhr.onerror = () => {
			resolve(xhr.response)
		}
		
		if (reqMethod == 'GET') {xhr.send()}
		if (reqMethod == 'POST') {xhr.send(JSON.stringify(reqBody))}
		

		console.log(reqBody)
	})	
}


// add event button
btnGet.addEventListener('click', () => {
	sendRequest('GET', requestURL)
		.then(data => console.log(data))
		.catch(err => console.log(err))
});
btnPost.addEventListener('click', () => {
	sendRequest('POST', requestURL, requestBody)
		.then(data => console.log(data))
		.catch(err => console.log(err))
});
btnGetLocal.addEventListener('click', () => {sendRequest('GET', 'http://localhost:34587/getdata')});
btnPostLocal.addEventListener('click', () => {
	sendRequest('POST', requestURLlocal, requestBody)
		.then(data => console.log(data))
		.catch(err => console.log(err))
});
btnPostForm.addEventListener('click', () => {
	let idField = formId.value;
	let nameField = formFullname.value;

	let reqBody = {
		id: idField,
		name: nameField
	}

	if ( !checkFields(reqBody) ) {
		console.log('Не заполнены поля формы')
	} else {
		console.log("get data from field's")
		console.log(idField)
		console.log(nameField)

		sendRequest('POST', requestURLlocal, reqBody)
			.then(data => console.log(data))
			.catch(err => console.log(err))
	}
	
});

// проверка заполнения полей формы
function checkFields ( body ) {
	if (body.id == '' || body.name == '') { return false }
		else return true
}
//---------------------------------