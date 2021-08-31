const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const server = express();
server.use(cors());
server.use(express.json());
const {handleGetData,handleAddingData,handleGetCollection, handleGetUserCollection,handleDeletingData} = require('./modules/helper.js');


mongoose.connect(`${process.env.DB_LINK}`, {useNewUrlParser: true, useUnifiedTopology: true});

server.get('/test',testHandler);
//localhost:3001/models?title=
server.get('/models',handleGetData);
server.post('/addmodels',handleAddingData);
server.get('/getcollection',handleGetCollection);
server.get('/usercollection',handleGetUserCollection);
server.delete('/deletemodels/:modelID2',handleDeletingData)





function testHandler(req, res) {
    res.send('all good')
}




server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
});