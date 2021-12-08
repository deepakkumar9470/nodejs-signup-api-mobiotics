import mongoose from  'mongoose'


const UserSchema = new mongoose.Schema({
    username  : {
        type: String,
        required: true
    },
    email  : {
        type: String,
        required: [true, 'Please enter email'],
        unique :true,
        lowercase : true,
        
    },
    password  : {
        type: String,
        required: [true, 'Please enter a valid password'],
        
    }
},{timestamps : true})

const User = mongoose.model('User', UserSchema)

export default User