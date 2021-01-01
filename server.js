const express = require('express');
const app = express();
const PORT = 8080;
const multer = require('multer');
const fs = require('fs');

const upload = multer({
  dest: 'tmp/',
  limits: {
    fileSize: 3000000,
  },
}).array('monfichier');

app.post('/monupload', function (req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).send('File exceeds size limit');
    } else if (err) {
      res.status(400).send('Error during upload');
    }

    req.files.forEach((file) => {
      fs.rename(file.path, 'public/files/' + file.originalname, (err) => {
        if (err) console.log(err);
        console.log('Ok file moved');
      });
    });
    res.status(200).send('Files sent');
  });
});

app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}`);
});