/** @format */

const fs = require('fs');
const multer = require('multer');
const host = 'http://localhost:3000'; // change in production
const uploadedFilesFolderName = 'uploads';
if (!fs.existsSync(uploadedFilesFolderName)) {
  fs.mkdirSync(uploadedFilesFolderName);
}
//
const upload = multer({ dest: 'uploads/' });

app.use('/' + uploadedFilesFolderName, express.static(uploadedFilesFolderName));
//enable uploading file.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './' + uploadedFilesFolderName);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });
