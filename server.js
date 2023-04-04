require('dotenv/config')
const app =require('./app')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true) // getting error 🤦‍♀️

// mongoose.connect(process.env.MONGODB_URL_LOCAL, {})
//     .then(() => console.log("connected to mongodb"))
//     .catch(err => console.error('Mongodb Connection Failed'))


const DB=process.env.MONGODB_SERVER;
mongoose.connect(DB)
    .then(() => console.log("connected to mongodb"))
    .catch(err => console.error('Mongodb Connection Failed'))

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`app running on port ${port}`);
})