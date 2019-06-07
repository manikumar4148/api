var express=require('express');
var path=require("path")
var app=express();

app.use(express.static("public"))

app.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname,"public/newsite/1.html"))
})

app.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname,"public/newsite1/index.html"))
})



app.listen(8000,function(){
	console.log("server is started")
})