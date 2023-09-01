// require the library
const mongoose = require('mongoose');

// connect to databse
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');

// acquire the connection 
const db = mongoose.connection;

db.on('error',console.error.bind(console, 'error connecting to db'));
db.once('open', function(){
    console.log('successfully connected to databse');
})

