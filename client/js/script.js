/* JavaScript */

const btnGet = document.querySelector('.btnGet');
const btnPost = document.querySelector('.btnPost');
const btnGetLocal = document.querySelector('.btnGetLocal');
const btnPostLocal = document.querySelector('.btnPostLocal');
const btnPostForm = document.querySelector('#btnPostReqest');
const btnGetDatabase = document.querySelector('#btnGetDatabaseData');
let table = document.querySelector('.table_field');
const requestURLlocal = 'http://localhost:34587/pushdata';
const requestURL = 'http://jsonplaceholder.typicode.com/users';


// Получение данных формы
const formId = document.querySelector('#formId');
const formFullname = document.querySelector('#formFullname');
const formInventory = document.querySelector('#formInventory');
const formSerialNumber = document.querySelector('#formSerialNumber');
const formOfficeNumber = document.querySelector('#formOfficeNumber');
const formComment = document.querySelector('#formComment');
//------------------------


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
		
		if (reqMethod === 'GET') {xhr.send()}
		if (reqMethod === 'POST') {xhr.send(JSON.stringify(reqBody))}
		

		// console.log(reqBody)
	})	
}



// add event button
btnGet.addEventListener('click', async () => {
	// sendRequest('GET', requestURL)
	// 	.then(data => console.log(data))
	// 	.catch(err => console.error(err))
	const response = await fetch(requestURL)
	const data = await response.json();
	console.log(data)
});
btnPost.addEventListener('click', () => {
	sendRequest('POST', requestURL, requestBody)
		.then(data => console.log(data))
		.catch(err => console.log(err))
});
btnGetLocal.addEventListener('click', () => {
	sendRequest('GET', 'http://localhost:34587/getdata')
		.then(data => console.log(data))
		.catch(err => console.log(err))
});
btnPostLocal.addEventListener('click', () => {
	sendRequest('POST', requestURLlocal, requestBody)
		.then(data => console.log(data))
		.catch(err => console.log(err))
});
btnPostForm.addEventListener('click', () => {

	let reqBody = {
		id: formId.value,
		name: formFullname.value,
		serial_number: formSerialNumber.value,
		inventory_number: formInventory.value,
		office: formOfficeNumber.value,
		comment: formComment.value
	}

	if ( !checkFields(reqBody) ) {
		console.log('Не заполнены поля формы')
	} else {
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

function insertData (data) {
	console.log("insert")
	table.innerHTML = `<p>Всего элементов в массиве: ${data.length}</p>`
	table.innerHTML += `<p>------------------------------------------------</p>`
	return table.innerHTML += `
		<p>ID: ${data[0].id}</p>
		<p>Name: ${data[0].name}</p>
		`;
}


// Получение данных - канал Александра Лущенко

btnGetDatabase.addEventListener( 'click', async () => {
	const response = await fetch('http://localhost:34587/getdata')
		// .then(response => {return response.json})
		// .then(data => console.log(data))
	const data = await response.json();
	console.log(data)
	insertData(data.dataArray)
} )

function getDataFromDatabase () {
	fetch('http://localhost:34587/getdata').then(data => console.log(data))
}