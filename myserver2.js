var express=require('express');
var app=express();
var student=require("./router/student");
var books=require("./router/books");
var path=require('path');

var bodyParser=require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



app.use(express.static("public"))

app.all('/api/*', function (req, res, next) {
    const auth = { login: "akrivia", password: "pass1234" } // change this

    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if (!login || !password ||
        login !== auth.login ||
        password !== auth.password) {
        res.set('WWW-Authenticate', 'Basic realm="nope"') // change this
        res.status(401).send('Request is not authorized. You must pass credentials')
        return
    }
    else {
        next();
    }
});


app.get("/",function(req,res){
    res.send("Hello World")


})
//Get all student detais

// app.get("/api/students",(req,res)=>{
//     res.send(students)
// })

// app.post("/api/students",(req,res)=>{
//     var newStudent=req.body;
//     students.push(newStudent);
//     res.send(students);
// })

// app.put("/api/students:id",(req,res)=>{
//     var id=req.params.id;
//     var studentToBeupdated=students.filter((s)=>{
//         return s.id==id
//     })
//     studentToBeupdated[0].name="sai"
//     res.send(studentToBeupdated)
// })

// app.delete("/api/students/:id",(req,res)=>{
//     var id=req.params.id;

//     var latestStudent=students.filter((s)=>{
//         return s.id!=id
//     })

//     res.send(latestStudent)
// })
app.use("/api/student",student)
app.use("/api/books",books)

app.listen(9000,function(){
    console.log("Server is started")
})