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



//----------------------------------------
//---------- Base Controller -------------
//----------------------------------------

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('base.db')

db.serialize( () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS inventory
            (id integer primary key, name TEXT)
    `
    db.run(sql)
} )

class baseController {
    static all () { return new Promise( (resolve, reject)=>{
            db.all('SELECT * FROM inventory', (error, result)=>{
            if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }) })
    }

    static create (data, callback) {
        const sql = `INSERT INTO inventory(name) VALUES(?)`
        db.run(sql, data.name, callback)
        console.log("CREATE NEW ITEM...")
    }
}

module.exports = db;
module.exports.baseController = baseController;