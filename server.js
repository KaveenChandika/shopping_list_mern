const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const config = require('./config/keys');

app.use(cors());
app.use(express.json());

// DB config
const DB = config.MONGO_URL;

//Connect to mongo
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true
})  .then(()=> console.log('MongoDB connected'))
    .catch(err=> console.log(err));

app.get('/',(req,res) =>  res.send("Hello world"));
app.use('/api/items',  require('./routes/api/items'));
app.use('/api/users',  require('./routes/api/users'));
app.use('/api/auth',  require('./routes/api/auth'));

//Server static assests if in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build' ,'index.html'))
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));



