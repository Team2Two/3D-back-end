const  axios  = require('axios');
const mongoose = require('mongoose');
module.exports = {handleGetData,handleAddingData,handleGetCollection};

const threeDSchema = new mongoose.Schema({
    title: String,
    modelCollection:String,
    email:String,
    thumbnail:String,
    collection:String
  });


  let arr = [];

//localhost:3001/models?title=
  async function handleGetData(req,res){

  let nameOfModel= req.query.title
  let url = `https://api.sketchfab.com/v3/search?type=models&q=${nameOfModel}%20&animated=false`
  
  

  
    try{
        let data = await axios.get(url)
        console.log('the data console',data);
   data.data.results.map(item=>{
       let modelData=new modelClass (item.name, item.embedUrl,'cars', item.thumbnails.images[0].url,'tasneem.alabsi@gmail.com');
       arr.push(modelData);   }
       
)


res.send(arr)
    }

    
catch(error) {
    console.log('THE ERROR IS HHHHHHHHH :',error);
    res.send(error);
}

// seedModelData()
}

// function handleUserData(req,res) {
//     let userEmail = req.query.email;
//     threeDModel.find({email:userEmail},function(error,threeDInfo){
//         if(error) {
//             console.log('error in getting the data')
//         } else {
//             res.send(threeDInfo)
//         }
//     })
//   }








    //   console.log('hhhhhhhhhhhhhhhhhhhh',arr);


  function seedModelData() {
    // let collectionType = nameOfModel
    const threeDModel = mongoose.model('cars', threeDSchema);
    let saveModel = arr.map(item => {
        const models = new threeDModel({
            title : item.modelName ,
            modelCollection:item.modelUrl,
            email:'tasneem.alabsi@gmail.com',
            collection:'cars',
            thumbnail:item.thumbnails.images[0].url
        })
        models.save();
    })
    
}

// function dealingWithData (request,response){

    // if() 


async function handleAddingData(req,res) {
   let { title, modelUrl, email, collectionName } = req.body;
    


    let collectionType = collectionName
    const threeDModel = mongoose.model(`${collectionType}`, threeDSchema);
  
   
         
  
    await threeDModel.create({title, modelUrl, email})
  
    //   threeDModel.find({email},function(error,threeDnfo){
    //     if(error) {
    //         console.log('error in getting the data')
    //     } else {
    //         res.send(threeDnfo)
    //         console.log('hhhhhhhhhhh',threeDnfo);
    //         console.log(typeof(threeDnfo._id));
    //     }
    // })
    seedModelData()

}

async function handleAddingData(req,res) {
    let { title, modelUrl, email, collectionName } = req.body;
     
 
 
     let collectionType = collectionName
     const threeDModel = mongoose.model(`${collectionType}`, threeDSchema);
   
    
          
   
     await threeDModel.create({title, modelUrl, email,collectionName})
   
     //   threeDModel.find({email},function(error,threeDnfo){
     //     if(error) {
     //         console.log('error in getting the data')
     //     } else {
     //         res.send(threeDnfo)
     //         console.log('hhhhhhhhhhh',threeDnfo);
     //         console.log(typeof(threeDnfo._id));
     //     }
     // })
     // seedModelData()

}
function handleGetCollection (req, res) {
    
   
    let email = req.query.email;
    let collection = req.query.collection;
    console.log(collection);
    let collectionType = collection
     const threeDModel = mongoose.model(`${collectionType}`, threeDSchema);
     


    threeDModel.find({email, collection},function(error,threeDnfo){
            if(error) {
                console.log('error in getting the data')
            } else {
                res.send(threeDnfo)
                console.log('hhhhhhhhhhh',threeDnfo);
                console.log(typeof(threeDnfo._id));
            }
        })



}





class modelClass {
    constructor(modelName, modelUrl, modelCollection, thumbnail, email){
           this.modelName = modelName;
           this.modelUrl=modelUrl;
           this.thumbnail=thumbnail;
           this.modelCollection=modelCollection;
           this.email=email;
            
       }
    }