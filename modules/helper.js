const axios = require('axios');
const mongoose = require('mongoose');
module.exports = { handleGetData, handleAddingData, handleGetCollection, handleGetUserCollection ,handleDeletingData};

let arrayofcollection=[];
const threeDSchema = new mongoose.Schema({
    title: String,
    modelCollection: String,
    email: String,
    thumbnail: String,
    collectionOfModels: String
});

    const threeDModel = mongoose.model('alldata', threeDSchema);

let arr = [];

//localhost:3001/models?title=
async function handleGetData(req, res) {


    let nameOfModel = req.query.title
    let url = `https://api.sketchfab.com/v3/search?type=models&q=${nameOfModel}%20&animated=false`
    console.log('the name of the model is', nameOfModel);


    try {
        let data = await axios.get(url)
        // console.log('the data console',data);
        data.data.results.map((item, index) => {
            // console.log(item);

            let modelData = new modelClass(item.name, item.embedUrl, 'cars', item.thumbnails.images[0].url, 'tasneem.alabsi@gmail.com', index);
            arr.push(modelData);
        }

        )


        res.send(arr);
        arr = [];
    }


    catch (error) {
        console.log('THE ERROR IS HHHHHHHHH :', error);
        res.send(error);
    }

    // seedModelData()
}


function seedModelData(collectionType) {
    // let collectionType = nameOfModel
    const threeDModel = mongoose.model(collectionType, threeDSchema);
    let saveModel = arr.map(item => {
        const models = new threeDModel({
            title: item.modelName,
            modelCollection: item.modelUrl,
            email: 'tasneem.alabsi@gmail.com',
            collectionOfModels: collectionType,
            thumbnail: item.thumbnails.images[0].url
        })
        models.save();
    })
    console.log('threeeeeeeeeeeeeee', threeDModel);


}
// async function handleAddingCollection(req, res) {
//     console.log("mmmmmmmmmmmmmmmmmmmmm", req.body);
//     let {   email, collectionName } = req.body;
//     let collectionType = collectionName;
//     const threeDModel = mongoose.model(`${collectionType}`, threeDSchema);
//     await threeDModel.create({  email, collectionType });
//     threeDModel.find({ email: email }, function (err, collection) {
//         if (err) {
//           console.log("error in getting the data");
//         } else {
//           console.log(collection);
//           res.status(201).send(collection);
//         }
//       });
//     // seedModelData(collectionType);
//   }

async function handleAddingData(req, res) {
    
    console.log('mmmmmmmmmmmmmmmmmmmmm', req.body)
    let { title, modelUrl, email, collectionName, thumbnail } = req.body;
   console.log(req.body);

    // let collectionType = collectionName
    // const threeDModel = mongoose.model(`${collectionType}`, threeDSchema);

    arrayofcollection.push(threeDModel)

console.log('after model',modelUrl,collectionName)

    await threeDModel.create({ title:title, modelCollection:modelUrl, email:email, collectionOfModels:collectionName, thumbnail:thumbnail })


    threeDModel.find({ email }, function (err, ownerData) {
        if (err) {
            console.log('error in getting the data')
        } else {
            console.log(ownerData);
            res.send(ownerData)
        }
        
    })
    // seedModelData(collectionType)
}

// function handleGetCollection(req, res) {
//     console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
//     //   let m=  myFirstData.getCollection()
//     //   console.log(  collections   )
    
    
// let arrayforresp=[]
//             let email = req.query.email;
//             // let collection = req.query.collection;
//             console.log(email);
//             console.log(arrayofcollection)
//             for(let i=0;i<arrayofcollection.length;i++){
//                 let collectionType = arrayofcollection[i]
//             const threeDModel = mongoose.model(`${collectionType}`, threeDSchema);
// // console.log(arrayofcollection)
          
//             threeDModel.find({ email }, function (error, threeDInfo) {
//                 if (error) {
//                     console.log('error in getting the data')
//                 } else {
//                     // res.send(threeDInfo)
//                     arrayforresp.push(threeDInfo)
//                     console.log('hhhhhhhhhhh', threeDInfo);
//                     console.log(typeof (threeDInfo._id));
//                 }
//             })}
//              res.send(arrayforresp)


//         }



        function handleGetUserCollection(req, res) {

            let email = req.query.email;
            let collection = req.query.collection;
            console.log(collection);
            // console.log(collection);
            // let collectionType = collection
            // const threeDModel = mongoose.model(`${collectionType}`, threeDSchema);


            threeDModel.find({ email:email,collectionOfModels :collection }, function (error, threeDInfo) {
                if (error) {
                    console.log('error in getting the data')
                } else {
                    res.send(threeDInfo)
                    console.log('hhhhhhhhhhh', threeDInfo);
                    console.log(typeof (threeDInfo._id));
                }
            })

        }




           function handleGetCollection(req, res) {

            let email = req.query.email;
            // let collection = req.query.collection;
            // console.log(collection);
            // let collectionType = collection
            // const threeDModel = mongoose.model(`${collectionType}`, threeDSchema);


            threeDModel.find({ email }, function (error, threeDInfo) {
                if (error) {
                    console.log('error in getting the data')
                } else {
                    res.send(threeDInfo)
                    console.log('hhhhhhhhhhh', threeDInfo);
                    console.log(typeof (threeDInfo._id));
                }
            })

        }


function handleDeletingData(req, res) {

            let email = req.query.email;
            let modelID = req.params.modelID2;
            // let collection = req.query.collection;

            // const threeDModel = mongoose.model(collectionType, threeDSchema);
            // console.log(req.params);
            // console.log(modelID);


            threeDModel.remove({ _id: modelID }, (error, modelData1) => {
                if (error) {
                    console.log('error in deleteing the data', error)
                    // console.log();
                } else {
                    console.log('data deleted', modelData1)
                    modelsModel.find({ email }, function (error, modelData) {
                        if (error) {
                            console.log('error in getting the data')
                        } else {
                            res.send(modelData)
                        }
                    })
                }
            })
        }





class modelClass {
            constructor(modelName, modelUrl, modelCollection, thumbnail, email, key) {
                this.modelName = modelName;
                this.modelUrl = modelUrl;
                this.thumbnail = thumbnail;
                this.modelCollection = modelCollection;
                this.email = email;
                this.key = key

            }
        }