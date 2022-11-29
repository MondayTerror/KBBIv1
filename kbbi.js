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

// Start from here
inquirer.prompt([
  {
    type: 'input',
    message: 'Cari afach? : ',
    name: 'data_pencarian'
  }
]).then(a => {
  // Clear console nya biar gak risih!
  console.clear();
  // Lanjut ke code
  if (!a.data_pencarian) {
    console.clear();
    console.log('ERROR : Terjadi kesalahan, silahkan coba lagi..');
    process.exit();
  }
  else {
    fetch(`https://new-kbbi-api.herokuapp.com/cari/${a.data_pencarian}`).then(response => {
      return response.json(); // akan kembali menjadi json data
    }).then(data => {
      if (data.status == 'false') {
        console.clear();
        console.log('ERROR : Terjadi kesalahan, silahkan coba lagi..');
        process.exit();
      }
      else {
        try {
          for (var jancok = 0; jancok < data.data[0].arti.length; jancok++) {
            console.log(`[${jancok}] Kelas kata : ${data.data[0].arti[jancok].kelas_kata}\n[${jancok}] Deskripsi : ${data.data[0].arti[jancok].deskripsi}\n\n`)
          }
        } catch (error) {
          console.clear();
          console.log('ERROR : Terjadi kesalahan, silahkan coba lagi..');
          process.exit();
        }
      }
    })
  }
})

// Ok.. terimakasih udh mau lihat code yang useless ini
