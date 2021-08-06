const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

async function run(fileName, troubleMaker){
  const files = [fileName, fileName, troubleMaker];
  const formData = new FormData();  
  files.forEach((fName, i) => {
    formData.append(`${fName}-${i}`, fs.createReadStream(`./${fName}`), fName);
  })
  axios
    .post("http://localhost:8081/api/upload", formData, { headers: formData.getHeaders() })
    .then(res => {
      console.log('Success', res.status, res.statusText, res.data)
      const difference = files.filter(x => !res.data.files.includes(x));
      console.log('Lost', difference)
    })
    .catch(err => { console.log(err.message, err.response.data) });
}

run('upload-image.png', 'upload-wrong.js')
