const express = require('express');
const path = require('path');
const port = 8000;


const db = require('./config/mongoose.js');
const Contact = require('./models/contact.js');

// The line of code below will initialize a server
const app = express();

// setting view engine to ejs
app.set('view engine', 'ejs');

// setting the path to the views folder
app.set('views', path.join(__dirname, 'views'));

// urlencoded is a middleware that will help to get the request data as an object
app.use(express.urlencoded());

// seting the static folder path static files like css, js, images etc
app.use(express.static(path.join(__dirname, 'assets')));



// // function to create a middleware
// app.use(function(req,res,next){
//     // logic here
//     next(); //to call next middleware in chain
// })



// var contactList = [
//     {
//         name: "aaa",
//         phone: "1111111111"
//     },
//     {
//         name: "bbb",
//         phone: "2222222222"
//     },
//     {
//         name: "ccc",
//         phone: "3333333333"
//     },
//     {
//         name: "ddd",
//         phone: "4444444444"
//     },
// ]


app.get("/", async function(req, res){
    // res.send("<h1>Cool ,it's running</h1>");
    const contacts = await Contact.find({});
    console.log(contacts);
    return res.render('home',{
        title: "My Contacts List",
        contact_list: contacts,
    });
   
})


app.get("/practice", function(req, res){
    return res.render('practice',{
        title: "Playground"
    });
})


// function to delete a contact from list
app.get("/delete-contact",async function(req,res){
    // const queryObj = req.query;
    // let index;
    // for(let contact in contactList){
    //     if(contactList[contact].phone === queryObj.phone){
    //         index = contact;
    //     }
    // }

    // if(index){
    //     contactList.splice(index,1);
    // }

    // res.redirect("back");

    let id = req.query.id;
    await Contact.findByIdAndDelete(id);
    res.redirect("back");
})



app.post("/create-contact", async function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body); can be used to directly add body object
    // return res.redirect('/');
    // return res.redirect('back'); can be used as a better alternative
    // if you want to redirect to the same page
    const user = await  Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })

    await user.save();
    res.redirect("back");
})


// server will listen to port 8000
app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    console.log("Express server is up and running on port " + port)
});