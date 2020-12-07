const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require("path");
const multer = require("multer");

const roomRouter = require('./routes/room');
const typeRouter = require('./routes/type');
const extrasRouter = require('./routes/extra');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// // Upload img

app.use(fileUpload( {limits: { fileSize: 50 * 1024 * 1024 }} ));

const storage = multer.diskStorage({
   destination: "./public/uploads/",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("images", 4);

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (req.fileValidationError) {
            return res.json(req.fileValidationError);
        }
        else if (!req.files) {
            return res.json('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.json(err);
        }
        else if (err) {
            return res.json(err);
        }

        let tabFiles = [];
        const files = req.files.file;
        
        if (files.length === undefined){
            const name = "image-" + Date.now() + "-" + files.name;
            files.mv(`${__dirname}/../front/public/uploads/${name}`, );
            console.log("single");
            return res.json([{ name: name, path: `/uploads/${name}` }]);
        }
        else{
            files.map(item => {
                const name = "image-" + Date.now() + "-" + item.name;
                item.mv(`../front/public/uploads/${name}`);
                tabFiles.splice(0, 0, { name: name, path: `/uploads/${name}`});
            });
            return res.json(tabFiles);
        }
     });
});

// app.post('/upload', (req, res) => {
//     if (req.files === null){
//         return res.status(400).json({ msg: 'No file uploaded !' });
//     }

//     const files = req.files.file;
//     const tabFiles = [];

//     console.log(files)
    
//     console.log("coucou")
// });

const url = process.env.ATLAS_URL;
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongoDB database connecting established successfully")
});

app.use('/room', roomRouter);
app.use('/type', typeRouter);
app.use('/extra', extrasRouter);

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})