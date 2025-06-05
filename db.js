const mongoose = require('mongoose');


//define the mangodb connection url
//const mongoURL='mongodb://localhost:27017/yashdb'  //Replace 'mydatabase' with your database name 
const mongoURL='mongodb+srv://yashsaxena:kishusandhya1+@cluster0.ivae0ca.mongodb.net/'
//set up the mongoDB connection
console.log('Connecting to MongoDB...');


// Modern connection
mongoose.connect(mongoURL)
.then(() => {
    console.log('✅ MongoDB connected successfully');
})
.catch((err) => {
    console.error('❌ MongoDB connection error:', err);
});

const db = mongoose.connection;
//check if the connection is successful
db.on('connected',()=>{
    console.log('MongoDB connected successfully');
})
db.on('error',(err)=>{
    console.log('MongoDB connection error:',err);
})
db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})
//EXport the connection
module.exports=db;
