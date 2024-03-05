const fs = require('fs');
const path = require('path');

const bufferData = { dataArray: [] }
let bufferDataArray = []

// let data = JSON.stringify(man);  // Преобразовываем строку в JSON
  //Записываем в файл

function saveFile (data, localData) {
  let dataObj = JSON.parse(localData)
  dataObj.dataArray.push(data)
  bufferData.dataArray.push(data)
  fs.writeFileSync( 'data.json', JSON.stringify(dataObj), {encoding: 'utf-8', flag: 'w'} )
}

module.exports.writeData = function (data) {
    console.log("----------------------")
    console.log(data.id)
    console.log(data.name)
    console.log("----------------------")
    /*---------------------------------------*/
    bufferJson = fs.readFileSync('data.json')
    saveFile(data, bufferJson)
}