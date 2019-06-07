var express=require('express');
var app=express();
var path=require('path')

var books=require("./routes/books")
var students=require("./routes/students")

var bodyParser=require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
})

app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/about.html"))
})

app.get("/books",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/books.html"))
})

app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/contact.html"))
})

app.use("/api/books",books)
app.use("/api/students",students)

app.listen(8000,function(){
    console.log("Server is started")
})