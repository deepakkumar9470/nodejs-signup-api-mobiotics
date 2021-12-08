import mongoose from  'mongoose'

const ConnectToDb = async () => {

  try {
    
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDb Connected..')
  } catch (error) {
    console.log(error)
  }
   
   
    

}


export default ConnectToDb;