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
    console.log(`id:                ${data.id}`)
    console.log(`Наименование:      ${data.name}`)
    console.log(`Серийный номер:    ${data.serial_number}`)
    console.log(`Инвентарный номер: ${data.inventory_number}`)
    console.log(`Кабинет:           ${data.office}`)
    console.log(`Коментарий:        ${data.comment}`)
    console.log("----------------------")
    /*---------------------------------------*/
    bufferJson = fs.readFileSync('data.json')
    saveFile(data, bufferJson)
}

module.exports.getData = function () { return fs.readFileSync( 'data.json' ) }