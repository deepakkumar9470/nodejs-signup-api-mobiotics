import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 8000
import connectDB from './db/db.js'
import express from 'express'
import User from './models/User.js'
import bcrypt from 'bcrypt'
const app = express()



app.use(express.json())
app.use(express.urlencoded({extended : true}))


// Serving template engine
app.set('views', './views')
app.set('view engine', 'hbs')




// connection to database
connectDB()



// Register page (index)
app.get("/",(req,res)=>{
    res.render("index");
});



// Registering user
app.post('/register', async (req,res) =>{
    try {
              
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hashSync(req.body.password, salt)
            const user = await  new User({
               username : req.body.username,
               email : req.body.email,
               password : hashPassword,
            })

            await user.save()
            return res.redirect('/home') 
           
            
      } catch (error) {
         res.status(400).json({message : 'Oops error while regsitering..'})
      }


})


// Dashboard page (home)
app.get("/home", async (req,res) =>{
    try {
              
        const users = await User.find({})
        
        
        res.render("home" ,{
            message:  "Registered Successfully",
        });
     } catch (error) {
        res.status(400).json({message : 'Oops error while regsitering..'})
     }
    
})


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})