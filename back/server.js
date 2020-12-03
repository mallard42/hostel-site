const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const roomRouter = require('./routes/room');
const typeRouter = require('./routes/type');
const extrasRouter = require('./routes/extra');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Upload img

app.use(fileUpload());

app.post('/upload', (req, res) => {
    if (req.files === null){
        return res.status(400).json({ msg: 'No file uploaded !' });
    }

    const files = req.files.files;
    const tabFiles = [];

    for (let i = 0; i < files.length; i++) {
        console.log(files[i])
        files[i].mv(`${__dirname}/../front/public/uploads/${files[i].name}`, err => {
            if (err){
                console.error(err);
                return res.status(500).send(err).end();
            }
    
            tabFiles.splice(tabFiles.length, 0, { fileName: files[i].name, filePath: `/uploads/${files[i].name}` })
        })

        if (tabFiles.lenght === files.lenght){
            res.json(tabFiles);
        }
    }
});

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