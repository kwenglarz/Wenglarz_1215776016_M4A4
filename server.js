const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//new code
const mongoose = require('mongoose');

//Connect to database
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DATABASE}`,{
  useNewUrlParser: true})
    .then(con=>{
  console.log(con.connection);// log connection properties
  console.log(`The Database connection was successful with ${process.env.DATABASE}`)// log connection properties
}).catch((err) => console.log('Error in DB connection: ' + err));  
 

console.log(`The Database connection was successful with ${process.env.DATABASE} 
mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DATABASE}`);