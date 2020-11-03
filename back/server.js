const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const roomRouter = require('./routes/room');
const typeRouter = require('./routes/type');
const extrasRouter = require('./routes/extra');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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