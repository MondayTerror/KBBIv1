/*

Project dibuat murni oleh WilliamNS
Bahasa pemrograman NodeJS

Required package :
- Inquirer v8.2.4 (npm install inquirer@8.2.4)
- Node-Fetch v2.6.7 (npm install node-fetch@2.6.7)

Contoh penggunaan APi :
https://new-kbbi-api.herokuapp.com/cari/demokrasi

Kata "demokrasi" yang terdapat pada URL diatas merupakan query
atau kata yang ingin kalian cari di kbbi

Itu nantinya akan kita ganti dengan fungsi inquirer

*/

// Module
const inquirer = require('inquirer');
const fetch = require('node-fetch');

// Block 1
inquirer.prompt([
  {
    type: 'input',
    message: 'Search : ',
    name: 'kbbi_query'
  }
]).then(a => {
  console.clear();
  if (!a.kbbi_query) {
    console.clear();
    console.log(`ERROR : Kamu tidak input satu pun kata!`);
    process.exit();
  }
  else {
    try {
      fetch(`https://new-kbbi-api.herokuapp.com/cari/${a.kbbi_query}`).then(response => {
        return response.json();
      }).then(data => {
        if (data.status == 'false') {
          console.clear();
          console.log('ERROR : Server tidak memberikan response balik!');
          process.exit();
        }
        else {
          try{
            for(var i = 0; i < data.data[0].arti.length; i++) {
              console.log(`[${i}] > Kelas kata : ${data.data[0].arti[i].kelas_kata}\n[${i}] > Deskripsi : ${data.data[0].arti[i].deskripsi}\n\n`);
            }
          }
        catch(error) {
          console.clear();
          console.log('ERROR : Terjadi kesalahan fatal, silahkan memulai ulang program!');
          process.exit();
        }
      }
      })
    }
    catch(error) {
      console.clear();
      console.log('ERROR : Terjadi kesalahan fatal, silahkan memulai ulang program!');
      process.exit();
    }
  }
})
