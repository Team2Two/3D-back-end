const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const server = express();
server.use(cors());
server.use(express.json());
const {handleGetData,handleAddingData,handleGetCollection, handleGetUserCollection,handleDeletingData} = require('./modules/helper.js');


mongoose.connect(`mongodb://maiadadb:0000@cluster0-shard-00-00.ii9w9.mongodb.net:27017,cluster0-shard-00-01.ii9w9.mongodb.net:27017,cluster0-shard-00-02.ii9w9.mongodb.net:27017/myFirstData?ssl=true&replicaSet=atlas-114hrc-shard-0&authSource=admin&retryWrites=true&w=majority}`, {useNewUrlParser: true, useUnifiedTopology: true});

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