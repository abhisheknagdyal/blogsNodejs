const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");

// const { result } = require('lodash');
const  blogRoutes = require('./routes/blogRoutes');

const app = express();

// connect to mongo db 
const dbURI = "mongodb+srv://Abhishek_Choudhary:Abhi2226@blogpractice.qks2tt4.mongodb.net/blogspractice?retryWrites=true&w=majority";
mongoose.connect(
    dbURI
).then((result)=>{
    // console.log('mongodb connected');
    app.listen(3000);
}).catch((err)=>{
    console.log(err);
});

// register view engine
app.set('view engine', 'ejs');

// app.set('views', "myviews") // to set different view folder

// middleware 
app.use(express.static('public')); //to use static files
app.use(express.urlencoded({extended: true})); // for url 
app.use(morgan('dev'));


app.get('/', (req,res)=>{
    res.redirect('/blogs');
});

// about routes
app.get('/about', (req,res)=>{
    res.render('about', {title: "about"});
});

// Blog Routes
app.use("/blogs",blogRoutes);

// 404 page
app.use((req, res)=>{
    res.status(404).render('404', {title: "404 Error"})
})