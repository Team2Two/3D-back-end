const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const server = express();
server.use(cors());
server.use(express.json());
const {handleGetData,handleAddingData,handleGetCollection, handleGetUserCollection,handleDeletingData, handleDeletingCollections} = require('./modules/helper.js');


mongoose.connect("mongodb://localhost:27017/threemodels", {useNewUrlParser: true, useUnifiedTopology: true});

server.get('/test',testHandler);
//localhost:3001/models?title=
server.get('/models',handleGetData);
server.post('/addmodels',handleAddingData);
server.get('/getcollection',handleGetCollection);
server.get('/usercollection',handleGetUserCollection);
server.delete('/deletemodels/:modelID2',handleDeletingData);
server.delete('/deletecollections/:collection',handleDeletingCollections);





function testHandler(req, res) {
    res.send('all good')
}




server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
});