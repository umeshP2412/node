const fs = require('fs')

// const book = {
//     title: 'Ego is enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book)

// fs.writeFileSync('1-json.json',bookJSON);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.author);

const infoBuffer = fs.readFileSync('2-json.json')
const infoJSON = infoBuffer.toString();
console.log(infoJSON)

const info = JSON.parse(infoJSON);
name1 = info.name;
age1 = info.age;
const info2Data = infoJSON.replace(name1, 'Umesh')
const info3Data = info2Data.replace(age1, 23);
console.log(typeof(info3Data));
fs.writeFileSync('2-json.json',info3Data);
console.log(info3Data);

