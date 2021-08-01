const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

async function run(fileName){
  const image = new FormData();  
  image.append("avatar", fs.createReadStream(`./${fileName}`), fileName);
  image.append("second", fs.createReadStream(`./${fileName}`), fileName);
  axios
    .post("http://localhost:8081/api/upload", image, { headers: image.getHeaders() })
    .then(res => console.log('Success', res.status, res.statusText))
    .catch(err => { console.log(err.message, err.response.data) });
}

run('upload-image.png')
