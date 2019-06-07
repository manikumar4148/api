var express=require('express')
var router=express.Router();

var students=[
    {
        id:1,
        name:"satyanarayana",
        branch:"cse"
    },
    {
        id:2,
        name:"siva",
        branch:"ece"
    },
    {
        id:3,
        name:"ganesh",
        branch:"it"
    },
    {
    	id:4,
    	name:"mani",
    	branch:"cse"
    }
]
router.route("/")
.get((req,res)=>{
    res.send("data")

    //res.send(students)
    // var connection=mysql.createConnection({
    //     host:"localhost",
    //     user:"root",
    //     database:"mani",
    //     password:""
    // });
    // connection.connect();
    // connection.query(`select *from student`, function(error,student,fields){
    //     if(error) throw error;
    //     res.send(student)
    // });
    // connection.end();
    //  ;
})

.post((req,res)=>{
    var newStudent=req.body;
    // students.push(newStudent);
    var connection=mysql.createConnection({
        connection:"localhost",
        user:"root",
        password:"",
        database:"mani"
    });
    connection.connect();
    connection.query(`insert into student(name,branch) values('${newStudent.name}','${newStudent.branch}')`,function(error,student,fields){
        if(error) throw error;
            res.send(student);
    });
    connection.end();

})
router.route("/:id")
.put((req,res)=>{
    var id=req.params.id;
    var studentToBeupdated=students.filter((s)=>{
        return s.id==id
    })
    studentToBeupdated[0].name="sai"
    res.send(studentToBeupdated)
})

.delete((req,res)=>{
    var id=req.params.id;

    var latestStudent=students.filter((s)=>{
        return s.id!=id
    })

    res.send(latestStudent)
})



module.exports=router;